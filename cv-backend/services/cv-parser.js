import fs from 'fs';
import path from 'path';
import {spawn} from 'child_process';

const STORAGE_PATH = './storage';

// Parse CV
const parseCV = async () => {
    console.log('Parsing CV file');
    try {
        console.debug('Running python scripts');

        const parsedSkillsResult = await parseSkills();

        if (!parsedSkillsResult.success) {
            console.error('Failed to parse CV file for skills');
            return {success: false}
        }

        const parsedEducationResult = await parseEducation();

        if (!parsedEducationResult.success) {
            console.error('Failed to parse CV file for education');
            return {success: false}
        }

        console.debug('Finished running python scripts');
        return {success: true}
    } catch (error) {
        console.error('Failed to parse CV file', error);
        return {success: false}
    }
}

// Parse Skills
const parseSkills = async () => {
    console.log('Parsing CV file for skills');
    try {
        console.debug('Running python script');

        const __dirname = path.resolve();
        const scriptPath = path.join(__dirname, '..', 'cv-parser', 'skills-parser.py');
        const cvParser = spawn('python3', [scriptPath]);

        return new Promise((resolve) => {
            cvParser.on('close', (code) => {
                console.log('Exiting parse CV for skills python script');
                resolve({success: true})
            });

            cvParser.stderr.on('data', (data) => {
                console.error('Parse CV for skills: Error event', data.toString());
                resolve({success: false})
            });

            cvParser.stdout.on('data', function(data) {
                console.log('Parse CV for skills: Data event', data.toString());
            });
        })
    } catch (error) {
        console.error('Failed to parse CV file for skills', error);
        return {success: false}
    }
}

// Parse Education
const parseEducation = async () => {
    console.log('Parsing CV file for education');
    try {
        console.debug('Running python script');

        const __dirname = path.resolve();
        const scriptPath = path.join(__dirname, '..', 'cv-parser', 'education-parser.py');
        const cvParser = spawn('python3', [scriptPath]);

        return new Promise((resolve) => {
            cvParser.on('close', (code) => {
                console.log('Exiting parse CV for education python script');
                resolve({success: true})
            });

            cvParser.stderr.on('data', (data) => {
                console.error('Parse CV for education: Error event', data.toString());
                resolve({success: false})
            });

            cvParser.stdout.on('data', function(data) {
                console.log('Parse CV for education: Data event', data.toString());
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
        const parsedSkillsResult = await readParsedSkillsResults();

        if (!parsedSkillsResult.success) {
            console.error('Failed to read CV parsed skills results');
            return {success: false}
        }

        const parsedEducationResult = await readParsedEducationResults();

        if (!parsedEducationResult.success) {
            console.error('Failed to read CV parsed education results');
            return {success: false}
        }

        console.log("Read CV parsed results");
        return {
            success: true,
            data: {
                skills: parsedSkillsResult.data,
                education: parsedEducationResult.data
            }
        }
    } catch (error) {
        console.error('Failed to read CV parsed results', error);
        return {success: false}
    }
}

const readParsedSkillsResults = async () => {
    console.log('Reading CV parsed skills results');
    try {

        const __dirname = path.resolve();
        const filePath = path.join(__dirname, STORAGE_PATH, 'skills-results.json');
        let rawFile = fs.readFileSync(filePath);
        let skills = JSON.parse(rawFile);
        console.log("Read CV parsed skills results");
        return {
            success: true,
            data: skills
        }
    } catch (error) {
        console.error('Failed to read CV parsed skills results', error);
        return {success: false}
    }
}

const readParsedEducationResults = async () => {
    console.log('Reading CV parsed education results');
    try {
        const __dirname = path.resolve();
        const filePath = path.join(__dirname, STORAGE_PATH, 'education-results.json');
        let rawFile = fs.readFileSync(filePath);
        let education = JSON.parse(rawFile);

        console.log("Read CV parsed education results");
        return {
            success: true,
            data: education
        }
    } catch (error) {
        console.error('Failed to read CV parsed education results', error);
        return {success: false}
    }
}

export {
    parseCV,
    readParsedResults
}