const AWS = require('aws-sdk');
const { config } = require('./common/config')
const { s3Config } = require('./common/s3Config')

const s3 = new AWS.S3(s3Config);

// Return trailer url
module.exports.getS3PreSignedUrl = async (categoryFolder, key) => {
    const s3PreSignedUrl = await s3.getSignedUrl('getObject', {
        Bucket: config.BUCKET,
        Key: config.FOLDER + categoryFolder + key
    })
    return s3PreSignedUrl;
}

// Return number of trailers in s3 folder 
module.exports.getTrailersNumber = async (folder) => {
    const list = await s3.listObjectsV2({
        Bucket: config.BUCKET,
        Prefix: config.FOLDER + folder,
        Delimiter: '/'
    }).promise()
        
    return (list.KeyCount-1)
}