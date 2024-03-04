import { compressImage } from "./lib/default/main";
import { compressImage as compressImageTransfer } from "./lib/transfer/main";

const fileInput = document.getElementById("file-upload");

const compressionBtn = document.getElementById("compression-btn");
const compressionTransferBtn = document.getElementById(
  "compression-transfer-btn"
);

compressionBtn?.addEventListener("click", () => compressFiles(false));
compressionTransferBtn?.addEventListener("click", () => compressFiles(true));

// logging
let runs = 0;

async function compress(file: File, transfer: boolean) {
  let compressedImage;

  if (transfer) {
    compressedImage = await compressImageTransfer(file); // error happens in worker
  } else {
    compressedImage = await compressImage(file); // error happens in worker
  }

  // compressImage returns a blob, so we need to convert that to a file
  const compressedFile = new File([compressedImage], "compressed", {
    type: "image/jpeg",
  });

  // logging
  runs++;
  console.log(runs); // should reach amount of files in the input

  return compressedFile;
}

// compress image and adjust metadata accordingly
async function compressFiles(transfer: boolean) {
  // reassuring TS that the element exists
  if (!(fileInput instanceof HTMLInputElement)) {
    console.error("input not found!");
    return;
  }
  console.log("Starting compression...");

  // creating the array of files to compress
  const fileArray = Array.from(fileInput.files ?? []);

  console.log(`The counter should reach ${runs + fileArray.length}`);

  // compressing all files simultaneously
  const compressedFileArrayPromise = fileArray.map((file) =>
    compress(file, transfer)
  );
  const compressedFileArray = await Promise.all(compressedFileArrayPromise);
  console.log("finished!", compressedFileArray);
}
