import fs from 'fs';
import path from 'path';
import {spawn} from 'child_process';

const STORAGE_PATH = './storage';

// Parse CV
const parseCV = async () => {
    console.log('Parsing CV file');
    try {
        console.debug('Running python script');

        const __dirname = path.resolve();
        const scriptPath = path.join(__dirname, '..', 'cv-parser', 'Final_Resume_Parser.py');
        const cvParser = spawn('python3', [scriptPath]);

        return new Promise((resolve) => {
            cvParser.on('close', (code) => {
                console.log('Parsed CV file')
                resolve({success: true})
            });
        })
    } catch (error) {
        console.error('Failed to CV file', error);
        return {success: false}
    }
}

const readParsedResults = async () => {
    console.log('Reading CV parsed results');
    try {
        console.debug('Running python script');

        const __dirname = path.resolve();
        const filePath = path.join(__dirname, STORAGE_PATH, 'results.json');
        let rawFile = fs.readFileSync(filePath);
        let skills = JSON.parse(rawFile);
        console.log("Read CV parsed results");
        return {
            success: true,
            data: skills
        }
    } catch (error) {
        console.error('Failed to read CV parsed results', error);
        return {success: false}
    }
}

export {
    parseCV,
    readParsedResults
}