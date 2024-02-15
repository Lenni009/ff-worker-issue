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
        file
    }))

    const compressedBlobsPromise = fileObjects.map((fileObj) => compressLoop(fileObj.file));

    const compressedBlobs = await Promise.all(compressedBlobsPromise);

    const compressedFiles = compressedBlobs.map(blob => new File([blob], 'fileName', { type: 'image/jpeg' }))

    console.log('done', compressedFiles);
})

const maxSize = 500000; // 500KB

export async function compressLoop(file: File, quality: number = 1): Promise<File> {
    if (file.size < maxSize) return file; // if below maxSize, don't do anything
    console.log(quality)
    const res = await compressImage(file, {
      quality,
      type: imageTypes.JPEG,
    });
    const lowerQuality = quality - 0.01; // NoSonar reduce quality by 1%;
    if (res.size > maxSize) return await compressLoop(file, lowerQuality); // compress original file with lower quality setting to avoid double compression
    const fileName = file.name.split('.').slice(0, -1).join('.');
    const newFileName = fileName + '-min.jpg';
    return new File([res], newFileName, { type: imageTypes.JPEG });
  }