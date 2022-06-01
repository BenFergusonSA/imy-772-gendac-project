import AWS from 'aws-sdk'
import fs from 'fs';
import path from 'path';

AWS.config.update({
    region: "eu-west-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.AWS_S3_BUCKET;
const STORAGE_PATH = './storage';

// Download File from S3
const downloadFile = async (filename) => {
    console.log('Downloading S3 file');
    try {
        const params = {
            Bucket: BUCKET_NAME,
            Key: filename
        };

        const s3File = await s3.getObject(params).promise();

        if (!s3File) {
            return {success: false}
        }
        console.debug('Got S3 file, writing file');
        const __dirname = path.resolve();
        const filePath = path.join(__dirname, STORAGE_PATH, 'temp-file.pdf');
        console.log('Saving file to', filePath);
        const file = Buffer.from(s3File.Body);
        await fs.writeFileSync(filePath, file);

        console.log('Downloaded S3 file')
        return {success: true}
    } catch (error) {
        console.error('Failed to download S3 file', error);
        return {success: false}
    }
}

export {
    downloadFile,
}