import path from 'path';
import rimraf from "rimraf";

const STORAGE_PATH = './storage';

// Download File from S3
const deleteTempFiles = async () => {
    console.log('Deleting temp files');
    try {
        const __dirname = path.resolve();
        const cvFilePath = path.join(__dirname, STORAGE_PATH, 'temp.pdf');
        const resultsFilePath = path.join(__dirname, STORAGE_PATH, 'results.json');

        console.log('Deleting files');
        await rimraf.sync(cvFilePath);
        await rimraf.sync(resultsFilePath);

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