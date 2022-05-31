import 'dotenv/config'
import express from "express";
import {downloadFile} from './services/s3'

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

    if (!s3FileResponse.success) {
        res.status(500).json({ success: false, message: 'Failed to download file'});
        return;
    }

    return res.json({ success: true, message: 'Downloaded file' })
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})