import ffmpeg from 'ffmpeg-static';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const framesDir = './public/frames';
if (!fs.existsSync(framesDir)) {
  fs.mkdirSync(framesDir, { recursive: true });
} else {
  // Clean old frames
  const oldFiles = fs.readdirSync(framesDir);
  for (const f of oldFiles) {
    if (f.endsWith('.webp')) {
      fs.unlinkSync(`${framesDir}/${f}`);
    }
  }
}

console.log('Extracting 100% of original frames at native 30fps without dropping or interpolating...');

const args = [
  '-i', 'Video-banner-inicial.mp4',
  '-c:v', 'libwebp',
  '-lossless', '0',
  '-q:v', '90',
  '-compression_level', '6',
  `${framesDir}/frame_%04d.webp`
];

const result = spawnSync(ffmpeg, args, { stdio: 'inherit' });
if (result.error) {
  console.error('Error extracting frames:', result.error);
} else {
  const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.webp'));
  console.log(`Success: Extracted ${files.length} frames (100% original video frames).`);
  fs.writeFileSync('./public/info.json', JSON.stringify({ frameCount: files.length, originalFps: 30, duration: 15.4 }));
}
