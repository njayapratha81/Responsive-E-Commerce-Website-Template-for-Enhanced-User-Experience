// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const PORT = 4000;

// http.createServer((req, res) => {
//     console.log(`${req.method} request for ${req.url}`);

//     // Handle root URL
//     if (req.url === '/') {
//         fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf8', (err, html) => {
//             if (err) {
//                 res.writeHead(500, { 'Content-Type': 'text/plain' });
//                 res.write('500 Internal Server Error\n');
//                 res.end();
//             } else {
//                 res.writeHead(200, { 'Content-Type': 'text/html' });
//                 res.end(html);
//             }
//         });
//     }
//     // Handle CSS files
//     else if (req.url.endsWith('.css')) {
//         const cssPath = path.join(__dirname, 'public', req.url);
//         fs.readFile(cssPath, 'utf8', (err, css) => {
//             if (err) {
//                 res.writeHead(404, { 'Content-Type': 'text/plain' });
//                 res.write('404 Not Found\n');
//                 res.end();
//             } else {
//                 res.writeHead(200, { 'Content-Type': 'text/css' });
//                 res.end(css);
//             }
//         });
//     }
//     // Handle JavaScript files
//     else if (req.url.endsWith('.js')) {
//         const jsPath = path.join(__dirname, 'public', req.url);
//         fs.readFile(jsPath, 'utf8', (err, js) => {
//             if (err) {
//                 res.writeHead(404, { 'Content-Type': 'text/plain' });
//                 res.write('404 Not Found\n');
//                 res.end();
//             } else {
//                 res.writeHead(200, { 'Content-Type': 'application/javascript' });
//                 res.end(js);
//             }
//         });
//     }
//     // Handle all other URLs
//     else {
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.write('404 Not Found\n');
//         res.end();
//     }
// }).listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

// Helper function to get the content type based on file extension
const getContentType = (ext) => {
    switch (ext) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'application/javascript';
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        case '.svg':
            return 'image/svg+xml';
        default:
            return 'text/plain';
    }
};

http.createServer((req, res) => {
    console.log(`${req.method} request for ${req.url}`);

    // Normalize the URL path to avoid directory traversal attacks
    const requestedPath = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');
    const fullPath = path.join(__dirname, 'public', requestedPath);

    console.log(`Serving file: ${fullPath}`);  // Add this line for debugging

    // Serve files
    fs.stat(fullPath, (err, stats) => {
        if (err || !stats.isFile()) {
            console.log('File not found:', fullPath);  // Add this line for debugging
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Not Found\n');
            res.end();
            return;
        }

        // Determine content type based on file extension
        const ext = path.extname(fullPath);
        const contentType = getContentType(ext);

        // Read and serve the file
        fs.readFile(fullPath, (err, content) => {
            if (err) {
                console.log('Error reading file:', fullPath);  // Add this line for debugging
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('500 Internal Server Error\n');
                res.end();
                return;
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        });
    });
}).listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const PORT = 3000;

// // Helper function to get the content type based on file extension
// const getContentType = (ext) => {
//     switch (ext) {
//         case '.html':
//             return 'text/html';
//         case '.css':
//             return 'text/css';
//         case '.js':
//             return 'application/javascript';
//         case '.png':
//             return 'image/png';
//         case '.jpg':
//         case '.jpeg':
//             return 'image/jpeg';
//         case '.gif':
//             return 'image/gif';
//         case '.svg':
//             return 'image/svg+xml';
//         default:
//             return 'text/plain';
//     }
// };

// http.createServer((req, res) => {
//     console.log(`${req.method} request for ${req.url}`);

//     // Normalize the URL path to avoid directory traversal attacks
//     const requestedPath = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');
//     const fullPath = path.join(__dirname, 'public', requestedPath);

//     // Serve files
//     fs.stat(fullPath, (err, stats) => {
//         if (err || !stats.isFile()) {
//             res.writeHead(404, { 'Content-Type': 'text/plain' });
//             res.write('404 Not Found\n');
//             res.end();
//             return;
//         }

//         // Determine content type based on file extension
//         const ext = path.extname(fullPath);
//         const contentType = getContentType(ext);

//         // Read and serve the file
//         fs.readFile(fullPath, (err, content) => {
//             if (err) {
//                 res.writeHead(500, { 'Content-Type': 'text/plain' });
//                 res.write('500 Internal Server Error\n');
//                 res.end();
//                 return;
//             }

//             res.writeHead(200, { 'Content-Type': contentType });
//             res.end(content);
//         });
//     });
// }).listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

