const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    url: 'https://static.wixstatic.com/media/ee14d0_409d02b3321745ba9c8eb80751a6cc81~mv2.png',
    filename: 'logo.png'
  },
  {
    url: 'https://static.wixstatic.com/media/ee14d0_3733459eda554402a7969ef7450bb9c9~mv2.jpg',
    filename: 'hero-image.jpg'
  }
];

const imagesDir = path.join(__dirname, '../public/images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filepath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadAll() {
  for (const image of images) {
    const filepath = path.join(imagesDir, image.filename);
    try {
      await downloadImage(image.url, filepath);
    } catch (error) {
      console.error(`Error downloading ${image.filename}:`, error.message);
    }
  }
}

downloadAll();

