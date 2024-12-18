const http = require('http');
const fs = require('fs');
const path = require('path');

// Путь к вашей папке с файлами
const publicDirectory = __dirname;

// Создаем сервер
const server = http.createServer((req, res) => {
    // Определяем путь к запрашиваемому файлу
    const filePath = path.join(publicDirectory, req.url === '/' ? 'index.html' : req.url);

    // Определяем тип содержимого
    const ext = path.extname(filePath);
    const contentType = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
    }[ext] || 'application/octet-stream';

    // Читаем и отдаем файл
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Если файл не найден, возвращаем 404
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                // Возвращаем 500 при любой другой ошибке
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
            }
        } else {
            // Отдаем содержимое файла
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Устанавливаем сервер на порт 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
