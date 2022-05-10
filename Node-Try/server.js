const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const writeStream = fs.createWriteStream('./docs/urls.txt', {encoding: 'utf8'});

const server = http.createServer((req, res) => {
    //lodash
    const num = _.random(0, 20);
    console.log(num);

    const great = _.once(() => {
        console.log('hello');
    });

    great();
    

    // set header content type
    res.setHeader('Content-Type', 'text/html');

    //Switch case for the title path for website.
    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            writeStream.write('Visited Index Page. <BR/>');
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            writeStream.write('Visited About Page. <BR/>');
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        case '/support':
            path += 'support.html';
            res.statusCode = 200;
            writeStream.write('Visited support Page. <BR/>');
            break;
        case '/support-me':
            res.statusCode = 301;
            res.setHeader('Location', '/support');
            res.end();
            break;
        case '/history':
            path += '../docs/urls.txt';
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            writeStream.write('Visited 404 page. <br />');
            break;
    }

    // res.write('<head><link rel="stylesheet" href="#"></head>');
    // res.write('<h2>Hello, Don this is a response write.</h2>');
    // res.write('<h2>I`m trying out this node.js response.</h2>');
    // res.end();

    //send an html file
    fs.readFile(path, (err, data) =>{
        if (err) {
            console.log(err);
        } else {
            // res.write(data);
            res.end(data); //use once use this.
        }
    });

    //Writefile for the Urls in text.
    // fs.writeFile('./docs/urls.txt', req.url, (err) => {
    //     if (err) {
    //         console.log(err);s
    //     } else {
    //         console.log('The file has been created');
    //     }
    // });

});

server.listen(1333, 'localhost', () => {
    console.log('Now Type Localhost:1333 in the browser. ');
});