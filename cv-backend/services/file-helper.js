import fs from 'fs';
import path from 'path';

const STORAGE_PATH = './storage';

// Download File from S3
const deleteTempFiles = async () => {
    console.log('Deleting temp files');
    try {
        const __dirname = path.resolve();
        const cvFilePath = path.join(__dirname, STORAGE_PATH, 'temp.pdf');
        const resultsFilePath = path.join(__dirname, STORAGE_PATH, 'temp.pdf');

        console.log('Deleting files');
        await fs.unlinkSync(cvFilePath);
        await fs.unlinkSync(resultsFilePath);

        console.log('Deleted temp files')
        return {success: true}
    } catch (error) {
        console.error('Failed to delete temp files', error);
        return {success: false}
    }
}

export {
    deleteTempFiles,
}