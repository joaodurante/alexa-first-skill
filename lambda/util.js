const AWS = require('aws-sdk');
const { config } = require('./common/config')

const s3 = new AWS.S3({
    region: 'sa-east-1',
    accessKeyId: config.ACCESS_KEY,
    secretAccessKey: config.SECRET_KEY,
    Bucket: config.BUCKET,
    signatureVersion: 'v4',
    apiVersion: '2012-10-17'
});

module.exports.getS3PreSignedUrl = async (key) => {
    const s3PreSignedUrl = await s3.getSignedUrl('getObject', {
        Bucket: config.BUCKET,
        Key: `${config.FOLDER}${key}`
    })
    console.log(`*URL* ${s3PreSignedUrl}`);
    return s3PreSignedUrl;
}
