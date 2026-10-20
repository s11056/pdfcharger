{ config, lib, pkgs, ... }:

let
  cfg = config.services.pdfcharger;
in
{
  options.services.pdfcharger = {
    enable = lib.mkEnableOption "PDFCharger - Professional PDF Tools";

    package = lib.mkOption {
      type = lib.types.package;
      default = pkgs.pdfcharger;
      defaultText = lib.literalExpression "pkgs.pdfcharger";
      description = "The PDFCharger package to use.";
    };

    port = lib.mkOption {
      type = lib.types.port;
      default = 3000;
      description = "Port to listen on.";
    };
  };

  config = lib.mkIf cfg.enable {
    nixpkgs.overlays = [
      (final: prev: {
        pdfcharger = final.callPackage ./package.nix { };
      })
    ];

    systemd.user.services.pdfcharger = {
      Unit = {
        Description = "PDFCharger PDF Tools";
        After = [ "network.target" ];
      };

      Service = {
        ExecStart = "${cfg.package}/bin/pdfcharger";
        Restart = "on-failure";
        Environment = [
          "PDFCHARGER_PORT=${toString cfg.port}"
        ];
      };

      Install = {
        WantedBy = [ "default.target" ];
      };
    };
  };
}
