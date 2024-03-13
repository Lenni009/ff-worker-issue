import { compressImage } from "./lib/main";

const fileInput = document.getElementById("file-upload");

const delayInput = document.getElementById("delay-input");

fileInput?.addEventListener("change", () => compressFiles());

// logging
let runs = 0;

async function compress(file: File) {
  const compressedImage = await compressImage(file); // error happens in worker

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
async function compressFiles() {
  //   console.time("tracking");
  // reassuring TS that the element exists
  if (
    !(
      fileInput instanceof HTMLInputElement &&
      delayInput instanceof HTMLInputElement
    )
  ) {
    console.error("input not found!");
    return;
  }
  console.log("Starting compression...");
  const delay = parseInt(delayInput.value || "0");
  console.log("delay:", delay);
  // creating the array of files to compress
  const fileArray = Array.from(fileInput.files ?? []);

  console.log(`The counter should reach ${runs + fileArray.length}`);

  const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

  // compressing all files simultaneously
  const compressedFileArrayPromise: Promise<File>[] = [];

  for (const file of fileArray) {
    compressedFileArrayPromise.push(compress(file));
    if (!delay) continue;
    await timer(delay);
  }
  const compressedFileArray = await Promise.all(compressedFileArrayPromise);
  console.log("finished!", compressedFileArray);
  //   console.timeEnd("tracking");
}
