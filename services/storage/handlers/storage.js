const strings = require('../../../pkg/strings');

const upload = async (req, res) => {
    let fileTypes = ['image/png', 'image/jpg', 'image/pjpeg', 'image/jpeg', 'image/gif'];
    if (!fileTypes.includes(req.files.picture.mimetype)) {
        return res.status(400).send('Bad request!');
    }
    // if (maxFileSize < req.files.picture.size) {
    //     return res.status(400).send('Bad request!');
    // }
    let newFileName = `${strings.random(10)}__${req.files.picture.name}`;
    await req.files.picture.mv(`${__dirname}/../../../web/src/uploads/${newFileName}`);
    res.status(201).send({ filename: newFileName });
};

const download = async (req, res) => {
    let filePath = `${__dirname}/../../../web/src/uploads/${req.params.file}`;
    res.download(filePath, req.params.file.split('__')[1]);
};

module.exports = {
    upload,
    download
};