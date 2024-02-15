const fileInput = document.getElementById('file-upload');

fileInput?.addEventListener('change', async () => {
    if (!(fileInput instanceof HTMLInputElement)) return;
    const files = Array.from(fileInput.files);
    const compressedFiles = files.map((file) => compressImage(file));
    
    await Promise.all(compressedFiles);
    console.log('done', compressedFiles);
})