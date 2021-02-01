const express = require('express');
const fs = require('fs');
// const upload = require('express-fileupload');
const app = express();
const PORT = 80;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
// app.use(upload());
if (!fs.existsSync('./public/uploads')) {
    fs.mkdirSync('./public/uploads');
}

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/fetch', (req, res) => {
    fs.readdir(__dirname + '/public/uploads', (err, contents) => {
        if (err) {
            console.log(err)
        } else {
            // contents.forEach((file) => console.log(file));
            res.render('fetch', { contents: contents });
        }
    });
});

app.get('/uploaded', (req, res) => {
    res.render('index');
});

app.get('/logs', (req, res) => {
    res.sendFile(__dirname + '/logs/names.txt');
});

app.get('/error', (req, res) => {
    res.render('index');
});

app.post('/', async (req, res) => {
    try {
        const files = await req.body.file;
        if (files == null) return
        const cover = JSON.parse(files)
        if (files != null) {
            const image = new Buffer.from(cover.data, 'base64');
            const upath = __dirname + '/logs/';
            const ipath = __dirname + '/public/uploads/';
            const deets = {
                id: cover.id,
                name: cover.name,
                type: cover.type,
                size: (cover.size / 1024).toFixed(2)
            }
            const fileName = cover.id + '.' + cover.type.split('/')[1];
            fs.writeFileSync(upath + 'names.txt', JSON.stringify(deets) + '\n', { flag: 'a+' });
            fs.writeFileSync(ipath + fileName, image, { flag: 'a+' });
        }
        res.redirect('/uploaded');
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});
// configure settings for file and mobile view css and size limit
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})