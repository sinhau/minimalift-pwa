import fs from 'fs';
import path from 'path';

const basePath = '';

const manifest = {
  "name": "Minimalift",
  "short_name": "Minimalift", 
  "description": "Offline-first PWA for the Minimalift 3-Day strength program",
  "start_url": `${basePath}/`,
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#000000",
  "background_color": "#000000",
  "icons": [
    {
      "src": `${basePath}/icons/icon-192.png`,
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": `${basePath}/icons/icon-512.png`, 
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["health", "fitness", "sports"],
  "scope": `${basePath}/`
};

// Write to dist folder during build
const distPath = path.join(process.cwd(), 'dist', 'manifest.webmanifest');
const distDir = path.dirname(distPath);

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(distPath, JSON.stringify(manifest, null, 2));
console.log(`Generated manifest: ${distPath}`);