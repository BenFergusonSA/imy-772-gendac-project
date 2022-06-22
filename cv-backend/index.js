import 'dotenv/config'
import express from "express";
import axios from "axios";
import {downloadFile} from './services/s3.js'
import {parseCV, readParsedResults} from './services/cv-parser.js'
import {deleteTempFiles} from './services/file-helper.js'
import cors from 'cors';

const port = process.env.PORT || 3200;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Hello from Gendac Cv Parser" })
})

app.post('/process-cv', async (req, res) => {
    const {applicantCVUUID} = req.body;
    const uploadedCVFilename = 'public/' + applicantCVUUID + '.pdf';
    console.log('Uploaded CV file to download', uploadedCVFilename);

    const s3FileResponse = await downloadFile(uploadedCVFilename);
    console.debug('S3 download response', s3FileResponse);

    if (!s3FileResponse.success) {
        res.status(500).json({ success: false, message: 'Failed to download file'});
        return;
    }

    res.status(200).send({ success: true });

    const parseResponse = await parseCV();
    console.debug('Parser response', parseResponse);

    if (!parseResponse.success) {
        console.error('Failed to parse file');
        // res.status(500).json({ success: false, message: 'Failed to parse file'});
        return;
    }

    const parsedResults = await readParsedResults();
    console.debug('Parsed results', parsedResults);

    if (!parsedResults.success) {
        console.error('Failed to read parsed file');
        // res.status(500).json({ success: false, message: 'Failed to read parsed file'});
        return;
    }

    const deletedFilesResponse = await deleteTempFiles();
    console.debug('Deleted files results', deletedFilesResponse);
    if (!parsedResults.success) {
        console.error('Failed to delete temp files');
        // res.status(500).json({ success: false, message: 'Failed to delete temp files'});
    }

    //Make request to lambda function with results
    await axios.post('https://sfdonpysy8.execute-api.eu-west-1.amazonaws.com/staging/upload-parsed-skills', {
        "applicantUUID": applicantCVUUID,
        "skills": parsedResults.data.skills,
    });

    console.log('Made request to lambda');
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
