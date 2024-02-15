<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { compressImage } from "./lib/main";

interface FileObj {
  id: number;
  isCompressed: boolean;
  file: File;
}

const files = ref<FileObj[]>([]); // main file array
const fileInput = ref<HTMLInputElement | null>(null);

// array containing all uncompressed images, so we can track them
const uncompressedImages = computed(() =>
  files.value.filter((item) => !item.isCompressed)
);

// unique identifier for each file object
let id = 0;

// add files to main file array when they are added to the input
async function addFiles() {
  const fileList = Array.from(fileInput.value?.files ?? []);

  // construct wrapper object around files to add some metadata
  const fileObjects = fileList.map((file) => ({
    id: id++,
    isCompressed: false,
    file,
  }));

  files.value.push(...fileObjects);
}

// when the main file array length changes, compress all uncompressed images
watch(
  () => files.value.length,
  () => {
    uncompressedImages.value.forEach(editFileObj);
  }
);

// compress image and adjust metadata accordingly
async function editFileObj(fileObj: FileObj) {
  const compressedImage = await compressImage(fileObj.file);

  // compressImage returns a blob, so we need to convert that to a file
  const compressedFile = new File([compressedImage], "compressed", {
    type: "image/jpeg",
  });
  fileObj.isCompressed = true;
  fileObj.file = compressedFile;
}

// log how many files are left uncompressed (should reach 0)
watch(
  () => uncompressedImages.value.length,
  (newVal) => console.log(newVal)
);
</script>

<template>
  <p>
    To reproduce:<br />
    Drop all 16 files from public/testImages here.<br />
    Look at your console.<br />
    It will log out how many files are uncompressed.<br />
    In Chrome, this counter reaches 0.<br />
    In Firefox, it throws errors along the way, and the files with an error do
    not get compressed.<br />
    The error happens in the lib/worker.ts file (marked by comment)
  </p>
  <input
    id="file-upload"
    ref="fileInput"
    type="file"
    multiple
    @change="addFiles"
  />
</template>
