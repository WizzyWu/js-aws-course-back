import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommandInput, PutObjectCommand, S3 } from '@aws-sdk/client-s3'
import env from '../../env';

export async function s3_getSignedUrl (fileName = 'export') {
    const signedUrlParams: PutObjectCommandInput = {
        Bucket: env.S3_BUCKET,
        Key: `${env.S3_BUCKET_UPLOADED_CATALOG_PATH}${fileName}.csv`,
        ContentType: 'text/csv',
    };
    try {
        const s3 = new S3Client({ region: env.S3_BUCKET_REGION });
        const putCommand = new PutObjectCommand(signedUrlParams);
        const signedUrl = await getSignedUrl(s3, putCommand, { expiresIn: 3600 })
        return signedUrl;
    } catch (e) {
        console.log (`An error occured during interaction with S3. Params: ${JSON.stringify(signedUrlParams)} Error: ${e.message}`, e.message);
        throw e;
    }
};

export async function s3_getObject (key) {
    const requestParams = {
        Bucket: env.S3_BUCKET,
        Key: key,
    }

    try {
        const s3 = new S3({ region: env.S3_BUCKET_REGION });
        const response = await s3.getObject(requestParams);
        return response;
    } catch (e) {
        console.log (`An error occured during interaction with S3. Params: ${JSON.stringify(requestParams)} Error: ${e.message}`, e.message);
        throw e;
    }
};

export async function s3_copyObject (key) {
    const requestParams = {
        Bucket: env.S3_BUCKET,
        CopySource: `${env.S3_BUCKET}/${key}`,
        Key: `${key.replace(env.S3_BUCKET_UPLOADED_CATALOG_PATH, env.S3_BUCKET_PROCESSED_CATALOG_PATH)}`,
    }
    try {
        const s3 = new S3({ region: env.S3_BUCKET_REGION });
        const response = await s3.copyObject(requestParams);
        return response;
    } catch (e) {
        console.log (`An error occured during interaction with S3. Params: ${JSON.stringify(requestParams)} Error: ${e.message}`, e.message);
        throw e;
    }
}

export async function s3_deleteObject (key) {
    const requestParams = {
        Bucket: env.S3_BUCKET,
        Key: key,
    }
    try {
        const s3 = new S3({ region: env.S3_BUCKET_REGION });
        const response = await s3.deleteObject(requestParams);
        return response;
    } catch (e) {
        console.log (`An error occured during interaction with S3. Params: ${JSON.stringify(requestParams)} Error: ${e.message}`, e.message);
        throw e;
    }
}