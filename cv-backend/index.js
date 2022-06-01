import 'dotenv/config'
import express from "express";
import {downloadFile} from './services/s3'
import {parseCV, readParsedResults} from './services/cv-parser'

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Hello from Gendac Cv Parser" })
})

app.post('/process-cv', async (req, res) => {
    const uploadedCVFilename = req.body.uploadedCvFilename;
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

    //Make request to lambda function with results
    // return res.json({ success: true, message: 'Processed CV file' })
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})