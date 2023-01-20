const strings = require('../../../pkg/strings');

const upload = async (req, res) => {
    try {
        let fileTypes = ['image/png', 'image/jpg', 'image/tif', 'image/jpeg', 'image/gif', 'image/webp'];
        let maxFileSize = 1024 * 1024;
        if (!fileTypes.includes(req.files.picture.mimetype)) {
            return res.status(400).send('Bad request!');
        }

        if (maxFileSize < req.files.picture.size) {
            return res.status(400).send('Bad request!');
        }

        let newFileName = `${strings.random(10)}__${req.files.picture.name}`;
        let uploadedPath = `${__dirname}/../../../uploads/${newFileName}`;
        await req.files.picture.mv(uploadedPath);
        return res.status(201).send({ fileName: newFileName });
    } catch (error) {
        console.log(error);
        return res.status(500).send('ISE');
    }
};

const download = async (req, res) => {
    try {
        let filePath = `${__dirname}/../../../uploads/${newFileName}`;

        return res.download(filePath, req.params.file.split('__')[1]);
    } catch (error) {
        console.log(error);
        return res.status(500).send('ISE');
    }
};

module.exports = {
    upload,
    download
};