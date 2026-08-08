import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function generateIcons() {
  const svgPath = path.resolve('public/favicon.svg');
  const publicDir = path.resolve('public');

  if (!fs.existsSync(svgPath)) {
    console.error(`Error: SVG file not found at ${svgPath}`);
    process.exit(1);
  }

  console.log(`Generating icons from ${svgPath}...`);

  // 1. Generate PNG sizes
  const sizes = {
    'apple-touch-icon.png': 180,
    'favicon-32x32.png': 32,
    'favicon-16x16.png': 16,
    'favicon-48x48-temp.png': 48, // temporary for ico packaging
  };

  const buffers = {};

  for (const [filename, size] of Object.entries(sizes)) {
    const outputPath = path.join(publicDir, filename);
    const buffer = await sharp(svgPath)
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toBuffer();

    buffers[size] = buffer;

    // Save public files (excluding the temporary 48px file)
    if (filename !== 'favicon-48x48-temp.png') {
      await fs.promises.writeFile(outputPath, buffer);
      console.log(`Created public/${filename} (${size}x${size}px)`);
    }
  }

  // 2. Package favicon.ico with 16px, 32px, and 48px PNG buffers
  const icoSizes = [16, 32, 48];
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type (1 = ICO)
  header.writeUInt16LE(icoSizes.length, 4); // Number of images

  const directoryEntries = [];
  let currentOffset = 6 + icoSizes.length * 16;

  for (const size of icoSizes) {
    const pngBuffer = buffers[size];
    const entry = Buffer.alloc(16);

    entry.writeUInt8(size, 0); // Width
    entry.writeUInt8(size, 1); // Height
    entry.writeUInt8(0, 2);    // Color palette (0 = no palette)
    entry.writeUInt8(0, 3);    // Reserved
    entry.writeUInt16LE(1, 4);  // Color planes (1)
    entry.writeUInt16LE(32, 6); // Bits per pixel (32)
    entry.writeUInt32LE(pngBuffer.length, 8); // Size of image data
    entry.writeUInt32LE(currentOffset, 12);   // Offset of image data

    directoryEntries.push(entry);
    currentOffset += pngBuffer.length;
  }

  const icoBuffer = Buffer.concat([
    header,
    ...directoryEntries,
    ...icoSizes.map(size => buffers[size])
  ]);

  const icoPath = path.join(publicDir, 'favicon.ico');
  await fs.promises.writeFile(icoPath, icoBuffer);
  console.log(`Created public/favicon.ico (Multi-size: 16px, 32px, 48px)`);
}

generateIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
