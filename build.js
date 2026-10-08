const fs = require('fs');
const path = require('path');

const output = path.join(__dirname, 'dist');
fs.mkdirSync(path.join(output, 'assets'), { recursive: true });
fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(output, 'index.html'));
fs.cpSync(path.join(__dirname, 'assets'), path.join(output, 'assets'), { recursive: true });
