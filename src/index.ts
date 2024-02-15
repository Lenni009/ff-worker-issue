import { compressImage } from './lib/main';

const fileInput = document.getElementById('file-upload');

fileInput?.addEventListener('change', async () => {
    if (!(fileInput instanceof HTMLInputElement)) {
        console.error("input is null");
        return;
    }
    console.log("starting...")
    const files = Array.from(fileInput.files ?? []);
    const compressedBlobsPromise = files.map((file) => compressImage(file));

    const compressedBlobs = await Promise.all(compressedBlobsPromise);

    const compressedFiles = compressedBlobs.map(blob => new File([blob], 'fileName', { type: 'image/jpeg' }))

    console.log('done', compressedFiles);
})
