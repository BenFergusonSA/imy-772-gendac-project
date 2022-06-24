import path from 'path';
import rimraf from "rimraf";

const STORAGE_PATH = './storage';

// Download File from S3
const deleteTempFiles = async () => {
    console.log('Deleting temp files');
    try {
        const __dirname = path.resolve();
        const cvFilePath = path.join(__dirname, STORAGE_PATH, 'temp.pdf');
        const skillsResultsFilePath = path.join(__dirname, STORAGE_PATH, 'skills-results.json');
        const educationResultsFilePath = path.join(__dirname, STORAGE_PATH, 'education-results.json');

        console.log('Deleting files');
        await rimraf.sync(cvFilePath);
        await rimraf.sync(skillsResultsFilePath);
        await rimraf.sync(educationResultsFilePath);

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