const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const imagesDir = path.join(__dirname, '../public/images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to download an image with proper headers
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': 'https://www.mrd-eg.com/',
      }
    };
    
    const file = fs.createWriteStream(filepath);
    
    const req = protocol.get(options, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded: ${path.basename(filepath)}`);
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      } else {
        file.close();
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        reject(new Error(`Status: ${response.statusCode}`));
      }
    });
    
    req.on('error', (err) => {
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
  });
}

async function extractAndDownload() {
  console.log('Extracting images from mrd-eg.com...\n');
  
  try {
    // Fetch the main page with proper headers
    const response = await axios.get('https://www.mrd-eg.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    });
    
    const $ = cheerio.load(response.data);
    const imageUrls = new Set();
    
    // Extract image URLs from img tags (keep full URLs with query params)
    $('img').each((i, elem) => {
      let src = $(elem).attr('src') || $(elem).attr('data-src') || $(elem).attr('data-image');
      if (src) {
        // Convert relative URLs to absolute
        if (src.startsWith('//')) {
          src = 'https:' + src;
        } else if (src.startsWith('/')) {
          src = 'https://www.mrd-eg.com' + src;
        }
        
        if (src.includes('static.wixstatic.com') || src.includes('wixstatic') || src.includes('.jpg') || src.includes('.png')) {
          imageUrls.add(src);
        }
      }
    });
    
    // Extract from data attributes and scripts
    $('[data-image-src], [data-bg], [data-src]').each((i, elem) => {
      const src = $(elem).attr('data-image-src') || $(elem).attr('data-bg') || $(elem).attr('data-src');
      if (src && (src.includes('wixstatic') || src.includes('.jpg') || src.includes('.png'))) {
        let fullUrl = src;
        if (src.startsWith('//')) {
          fullUrl = 'https:' + src;
        } else if (src.startsWith('/')) {
          fullUrl = 'https://www.mrd-eg.com' + src;
        }
        imageUrls.add(fullUrl);
      }
    });
    
    // Extract from script tags (Wix stores image data in JSON)
    $('script').each((i, elem) => {
      const scriptContent = $(elem).html();
      if (scriptContent) {
        // Look for image URLs in the script
        const urlMatches = scriptContent.match(/https?:\/\/[^"'\s]+\.(jpg|jpeg|png|webp)/gi);
        if (urlMatches) {
          urlMatches.forEach(url => {
            if (url.includes('wixstatic') || url.includes('static.wixstatic')) {
              imageUrls.add(url);
            }
          });
        }
      }
    });
    
    console.log(`Found ${imageUrls.size} image URLs\n`);
    
    // Download images
    let index = 1;
    const imageArray = Array.from(imageUrls);
    
    for (const url of imageArray) {
      try {
        // Skip very small images (likely icons)
        if (url.includes('w_49') || url.includes('w_25') || url.includes('h_25')) {
          continue;
        }
        
        const extension = url.match(/\.(jpg|jpeg|png|webp)/i)?.[0] || '.jpg';
        const filename = `portfolio-${index}${extension}`;
        const filepath = path.join(imagesDir, filename);
        
        await downloadImage(url, filepath);
        index++;
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        // Silently skip failed downloads
      }
    }
    
    console.log(`\n✓ Downloaded ${index - 1} images to ${imagesDir}`);
    console.log('\nNote: Some images may require manual extraction from the gallery.');
    console.log('If you need specific portfolio images, inspect the website gallery');
    console.log('and copy the image URLs from the Network tab in browser DevTools.');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

extractAndDownload();
