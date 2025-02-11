const { createCanvas } = require("canvas");
const GIFEncoder = require("gif-encoder");
const fs = require("fs");

// GIF settings
const width = 200;
const height = 200;
const encoder = new GIFEncoder(width, height);

// Ensure public directory exists
const outputDir = "public";
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const outputPath = `${outputDir}/animated.gif`;
encoder.createReadStream().pipe(fs.createWriteStream(outputPath));

encoder.start();
encoder.setRepeat(0);
encoder.setDelay(500);
encoder.setQuality(10);

// Create a canvas
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

// Generate 10 frames
for (let i = 0; i < 10; i++) {
  ctx.fillStyle = `rgb(${i * 25}, ${255 - i * 25}, ${i * 10})`;
  ctx.fillRect(0, 0, width, height);

  ctx.beginPath();
  ctx.arc(50 + i * 15, 100, 20, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();

  encoder.addFrame(ctx);
}

encoder.finish();
console.log(`GIF generated at: ${outputPath}`);
