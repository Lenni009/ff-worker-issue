(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const imageTypes = {
  PNG: "image/png",
  JPEG: "image/jpeg",
  GIF: "image/gif"
};
function WorkerWrapper(options) {
  return new Worker(
    "/ff-worker-issue/assets/worker-BeW_jYeL.js",
    {
      name: options == null ? void 0 : options.name
    }
  );
}
async function handleWorkerProcess(workerMessage) {
  return new Promise((resolve, reject) => {
    const worker = new WorkerWrapper();
    worker.postMessage(workerMessage);
    worker.onmessage = ({ data }) => {
      if (data.status === "error") {
        console.error("Something went wrong!");
        reject(data.data);
      } else {
        const blob = data.data;
        resolve(blob);
      }
    };
  });
}
async function compressImage(file, config = {}) {
  config.type ?? (config.type = imageTypes.JPEG);
  config.quality ?? (config.quality = 0.92);
  const workerConfig = {
    originalType: file.type,
    ...config
  };
  const workerMessage = {
    blob: file,
    config: workerConfig
  };
  const compressedBlob = await handleWorkerProcess(workerMessage);
  return compressedBlob;
}
const fileInput = document.getElementById("file-upload");
const delayInput = document.getElementById("delay-input");
fileInput == null ? void 0 : fileInput.addEventListener("change", () => compressFiles());
let runs = 0;
async function compress(file) {
  const compressedImage = await compressImage(file);
  const compressedFile = new File([compressedImage], "compressed", {
    type: "image/jpeg"
  });
  runs++;
  console.log(runs);
  return compressedFile;
}
async function compressFiles() {
  if (!(fileInput instanceof HTMLInputElement && delayInput instanceof HTMLInputElement)) {
    console.error("input not found!");
    return;
  }
  console.log("Starting compression...");
  const delay = parseInt(delayInput.value || "0");
  console.log("delay:", delay);
  const fileArray = Array.from(fileInput.files ?? []);
  console.log(`The counter should reach ${runs + fileArray.length}`);
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  const compressedFileArrayPromise = [];
  for (const file of fileArray) {
    compressedFileArrayPromise.push(compress(file));
    if (!delay)
      continue;
    await timer(delay);
  }
  const compressedFileArray = await Promise.all(compressedFileArrayPromise);
  console.log("finished!", compressedFileArray);
}
