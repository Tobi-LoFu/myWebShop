import express from 'express';
import multer from 'multer';
import { isAdmin, isAuth } from '../utils.js';
import fs from 'fs';

const upload = multer();
const uploadRouter = express.Router();

uploadRouter.post(
    '/',
    isAuth,
    isAdmin,
    upload.single('file'),
    async (req, res) => {
        console.log('POST /api/upload');
        console.log('user', req.user, req.file);
        const file = req.file;
        console.log(
            'file',file
        );
        const fileName = file.originalname;
        const filePath = `./uploads/${fileName}`;
        console.log(fileName, filePath);
        fs.writeFile(filePath, file.buffer, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: 'Error writing file' });
            }
            return res.status(200).send({ message: 'File uploaded successfully', fileName, filePath });
        });
    }

);
export default uploadRouter;
