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

    openFirewall = lib.mkOption {
      type = lib.types.bool;
      default = false;
      description = "Whether to open the firewall port.";
    };
  };

  config = lib.mkIf cfg.enable {
    nixpkgs.overlays = [
      (final: prev: {
        pdfcharger = final.callPackage ./package.nix { };
      })
    ];

    systemd.services.pdfcharger = {
      description = "PDFCharger PDF Tools";
      after = [ "network.target" ];
      wantedBy = [ "multi-user.target" ];

      environment = {
        PDFCHARGER_PORT = toString cfg.port;
      };

      serviceConfig = {
        ExecStart = "${cfg.package}/bin/pdfcharger";
        Restart = "on-failure";
        DynamicUser = true;
        RuntimeDirectory = "pdfcharger";
        StateDirectory = "pdfcharger";

        # Hardening
        NoNewPrivileges = true;
        ProtectSystem = "strict";
        ProtectHome = true;
        PrivateTmp = true;
        PrivateDevices = true;
        ProtectKernelTunables = true;
        ProtectKernelModules = true;
        ProtectControlGroups = true;
        RestrictSUIDSGID = true;
        MemoryDenyWriteExecute = false;
      };
    };

    networking.firewall.allowedTCPPorts = lib.mkIf cfg.openFirewall [ cfg.port ];
  };
}
