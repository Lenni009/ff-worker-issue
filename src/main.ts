import { compressImage } from "./lib/main";

const fileInput = document.getElementById("file-upload");

fileInput?.addEventListener("change", compressFiles);

// logging
let runs = 0;

async function compress(file: File) {
  const compressedImage = await compressImage(file); // error happens in worker

  // compressImage returns a blob, so we need to convert that to a file
  const compressedFile = new File([compressedImage], "compressed", {
    type: "image/jpeg",
  });
  runs++;
  console.log(runs); // should reach 16
  return compressedFile;
}

// compress image and adjust metadata accordingly
async function compressFiles() {
  // reassuring TS that the element exists
  if (!(fileInput instanceof HTMLInputElement)) {
    console.error("input not found!");
    return;
  }
  console.log("Starting compression...");
  console.log("The counter should reach 16");

  // creating the array of files to compress
  const fileArray = Array.from(fileInput.files ?? []);

  // compressing all files simultaneously
  const compressedFileArrayPromise = fileArray.map(compress);
  const compressedFileArray = await Promise.all(compressedFileArrayPromise);
  console.log("finished!", compressedFileArray);
}
