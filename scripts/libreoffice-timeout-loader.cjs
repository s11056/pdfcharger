/**
 * Webpack loader for @matbee/libreoffice-converter/dist/browser.js.
 *
 * WorkerBrowserConverter gives its worker only 10 seconds to report "loaded",
 * but the worker starts right after ~250 MB of WASM assets are downloaded, so
 * slower devices fail with "Worker load timeout". Raise the limit to 2 minutes.
 *
 * Done at bundle time because the deploy build does not reliably run the
 * postinstall patch (scripts/patch-libreoffice-converter.mjs).
 */

const ORIGINAL = 'new Error("Worker load timeout")),1e4)';
const PATCHED = 'new Error("Worker load timeout")),12e4)';

module.exports = function libreofficeTimeoutLoader(source) {
  if (source.includes(ORIGINAL)) {
    return source.replace(ORIGINAL, PATCHED);
  }
  if (!source.includes(PATCHED)) {
    this.emitWarning(new Error('[libreoffice-timeout-loader] timeout pattern not found; library may have changed'));
  }
  return source;
};
