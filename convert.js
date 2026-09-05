import ffmpeg from 'ffmpeg-static';
import { spawnSync } from 'node:child_process';

const files = [
  'public/image/judson-henrique.png',
  'public/image/background-servicos.png'
];

for (const file of files) {
  const outFile = file.replace('.png', '.webp');
  const args = [
    '-i', file,
    '-c:v', 'libwebp',
    '-lossless', '0',
    '-q:v', '85',
    outFile
  ];
  console.log(`Converting ${file} to ${outFile}...`);
  const result = spawnSync(ffmpeg, args, { stdio: 'inherit' });
  if (result.error) {
    console.error(`Error converting ${file}:`, result.error);
  } else {
    console.log(`Successfully converted ${file}.`);
  }
}
