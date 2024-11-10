export class FileStringHelper {

    static customFileName(originalname) {
        const uniqueSuffix = Date.now();
        const extension = originalname.split('.').pop();
        const fileWithoutExt = originalname.split('.').slice(0, -1).join('.');
        const fileName = fileWithoutExt.replace(/[^a-zA-Z0-9]/g, '-');

        return `${fileName}_${uniqueSuffix}.${extension}`;
    }
}