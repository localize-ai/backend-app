require('dotenv').config();

import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { FileStringHelper } from 'src/common/helper/file-string.helper';
import { UploadDto as UploadStorageDto } from './dto/upload-storage.dto';

@Injectable()
export class StoragesService {

    private AWS_S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;
    private AWS_S3_REGION = process.env.AWS_S3_BUCKET_REGION;

    private s3 = new AWS.S3({
        signatureVersion: 'v4',
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
        region: this.AWS_S3_REGION,
    });

    private async presign({ folder, file_name }, putExpires: number = 180) {
        const fileName = `${folder}/${FileStringHelper.customFileName(file_name)}`;

        const presignedPutUrl = await this.s3.getSignedUrl('putObject', {
            Bucket: this.AWS_S3_BUCKET,
            Key: fileName,
            Expires: putExpires,
        });

        const downloadUrl = `https://${this.AWS_S3_BUCKET}.s3.${this.AWS_S3_REGION}.amazonaws.com/${fileName}`;

        return {
            'download_url': downloadUrl,
            'upload_url': presignedPutUrl,
        }
    }

    async getPresign(dto: UploadStorageDto) {
        return this.presign(dto);
    }
}