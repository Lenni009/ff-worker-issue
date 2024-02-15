import { compressImage, imageTypes } from './lib/main';

const fileInput = document.getElementById('file-upload');

fileInput?.addEventListener('change', async () => {
    if (!(fileInput instanceof HTMLInputElement)) {
        console.error("input is null");
        return;
    }
    console.log("starting...")
    const files = Array.from(fileInput.files ?? []);

    let id = 0;

    const fileObjects = files.map(file => ({
        id: id++,
        isCompressed: false,
        file
    }))

    const compressedBlobsPromise = fileObjects.map(editFileObj);

    const compressedFiles = await Promise.all(compressedBlobsPromise);

    console.log('done', compressedFiles);
})

async function editFileObj(fileObj:{id: number, file: File}) {
    const compressedFile = await compressLoop(fileObj.file);
    return {
        id: fileObj.id,
        isCompressed: true,
        file: compressedFile,
    }
}

const maxSize = 500000; // 500KB

export async function compressLoop(file: File, quality: number = 1): Promise<File> {
    if (file.size < maxSize) return file; // if below maxSize, don't do anything
    const res = await compressImage(file, {
        quality,
        type: imageTypes.JPEG,
    });
    console.log(res.size, quality)
    const lowerQuality = quality - 0.01; // NoSonar reduce quality by 1%;
    if (res.size > maxSize && quality > 0) return await compressLoop(file, lowerQuality); // compress original file with lower quality setting to avoid double compression
    const fileName = file.name.split('.').slice(0, -1).join('.');
    const newFileName = fileName + '-min.jpg';
    return new File([res], newFileName, { type: imageTypes.JPEG });
  }