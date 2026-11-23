/**
 * Post-install patch for @matbee/libreoffice-converter.
 *
 * WorkerBrowserConverter gives its worker script only 10 seconds to report
 * "loaded". The worker is started right after ~250 MB of WASM assets have been
 * downloaded into memory, so on slower or low-memory devices it often misses
 * that window and the tool fails with "Worker load timeout". Raise it to 2 minutes.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const FILE = join(process.cwd(), 'node_modules', '@matbee', 'libreoffice-converter', 'dist', 'browser.js');
const ORIGINAL = 'new Error("Worker load timeout")),1e4)';
const PATCHED = 'new Error("Worker load timeout")),12e4)';

if (!existsSync(FILE)) {
    console.warn('[patch-libreoffice] browser.js not found, skipping');
    process.exit(0);
}

const source = readFileSync(FILE, 'utf8');
if (source.includes(PATCHED)) {
    console.log('[patch-libreoffice] already patched');
} else if (source.includes(ORIGINAL)) {
    writeFileSync(FILE, source.replace(ORIGINAL, PATCHED));
    console.log('[patch-libreoffice] worker load timeout raised to 120s');
} else {
    console.warn('[patch-libreoffice] pattern not found; library may have changed, skipping');
}
