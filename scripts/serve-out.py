"""Serve the static export in out/ with the headers production hosting sends.

Usage: python scripts/serve-out.py [port]
The cross-origin isolation headers (COOP/COEP) are required by the
WebAssembly tools; without them coi-serviceworker.js has to inject them.
"""
import functools
import http.server
import mimetypes
import os
import sys

mimetypes.add_type("application/wasm", ".wasm")
mimetypes.add_type("text/javascript", ".mjs")


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        self.send_header("Cross-Origin-Resource-Policy", "same-origin")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4310
    root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "out")
    handler = functools.partial(Handler, directory=root)
    print(f"Serving {os.path.abspath(root)} on http://localhost:{port}")
    http.server.ThreadingHTTPServer(("127.0.0.1", port), handler).serve_forever()
