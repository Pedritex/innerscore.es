#!/usr/bin/env node
// Generates public/favicon.ico — a 32x32 navy square with an orange "I".
// Hand-built PNG wrapped in an ICO container; no external dependencies.

import { writeFileSync, mkdirSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SIZE = 32;
const NAVY = [0x0f, 0x17, 0x2a, 0xff];
const ORANGE = [0xf9, 0x73, 0x16, 0xff];

// Bitmap of an elegant serif "I" within a 32x32 grid.
// Three rectangles: top serif, vertical stem, bottom serif.
function isOrange(x, y) {
  if (y >= 6 && y < 9 && x >= 9 && x < 23) return true;
  if (y >= 9 && y < 23 && x >= 14 && x < 18) return true;
  if (y >= 23 && y < 26 && x >= 9 && x < 23) return true;
  return false;
}

// ── PNG ─────────────────────────────────────────────────────────────────

const CRC_TABLE = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  CRC_TABLE[i] = c;
}
function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crcBuf]);
}

const raw = Buffer.alloc(SIZE * (1 + SIZE * 4));
for (let y = 0; y < SIZE; y++) {
  const rowStart = y * (1 + SIZE * 4);
  raw[rowStart] = 0; // filter = None
  for (let x = 0; x < SIZE; x++) {
    const px = isOrange(x, y) ? ORANGE : NAVY;
    const off = rowStart + 1 + x * 4;
    raw[off] = px[0];
    raw[off + 1] = px[1];
    raw[off + 2] = px[2];
    raw[off + 3] = px[3];
  }
}
const compressed = deflateSync(raw);

const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(SIZE, 0);
ihdr.writeUInt32BE(SIZE, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 6; // color type RGBA
ihdr[10] = 0;
ihdr[11] = 0;
ihdr[12] = 0;

const png = Buffer.concat([
  signature,
  chunk('IHDR', ihdr),
  chunk('IDAT', compressed),
  chunk('IEND', Buffer.alloc(0)),
]);

// ── ICO wrapper ─────────────────────────────────────────────────────────

const icoHeader = Buffer.alloc(6 + 16);
icoHeader.writeUInt16LE(0, 0); // reserved
icoHeader.writeUInt16LE(1, 2); // type = icon
icoHeader.writeUInt16LE(1, 4); // image count
icoHeader[6] = SIZE; // width (256 → 0; we use 32 directly)
icoHeader[7] = SIZE; // height
icoHeader[8] = 0; // palette size
icoHeader[9] = 0; // reserved
icoHeader.writeUInt16LE(1, 10); // planes
icoHeader.writeUInt16LE(32, 12); // bpp
icoHeader.writeUInt32LE(png.length, 14); // image size
icoHeader.writeUInt32LE(22, 18); // offset

const ico = Buffer.concat([icoHeader, png]);

const here = dirname(fileURLToPath(import.meta.url));
const dest = join(here, '..', 'public', 'favicon.ico');
mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, ico);
console.log(`Wrote ${dest} (${ico.length} bytes)`);
