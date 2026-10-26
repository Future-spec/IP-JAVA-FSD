const fs = require('node:fs');
const path = require('node:path');

const apiBaseUrl = (process.env.API_BASE_URL || '').replace(/\/+$/, '');

if (apiBaseUrl && !/^https?:\/\/.+/.test(apiBaseUrl)) {
    throw new Error('API_BASE_URL must be an absolute HTTP or HTTPS URL.');
}

const configPath = path.join(__dirname, 'frontend', 'config.js');
const config = `window.APP_CONFIG = Object.freeze({ apiBaseUrl: ${JSON.stringify(apiBaseUrl)} });\n`;

fs.writeFileSync(configPath, config);
