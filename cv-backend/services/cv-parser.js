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

        return new Promise((resolve) => {
            const cvParser = spawn('python3', [scriptPath]);

            cvParser.on('error', (error) => {
                console.error('Parse CV: Error event', error);
                // resolve({success: false})
            });

            cvParser.on('close', (code) => {
                console.log('Parse CV: Close event');
                // resolve({success: true})
            });

            cvParser.on('exit', (code) => {
                console.log('Parse CV: Exit event');
            });
        })
    } catch (error) {
        console.error('Failed to parse CV file', error);
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