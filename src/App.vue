<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import {compressImage} from './lib/main';
interface FileObj {
    id: number;
    isCompressed: boolean;
    file: File;
}

const files = ref<FileObj[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);

let id = 0;

/* requirements:
 on upload, compress
 after compression, show files
*/


async function addFiles() {
    const fileList = Array.from(fileInput.value?.files ?? []);

    const fileObjects = fileList.map(file => ({id: id++, isCompressed: false, file}))

    files.value.push(...fileObjects);
}

const uncompressedImages = computed(() => files.value.filter(item => !item.isCompressed));

watch(() => files.value.length, () => {
    uncompressedImages.value.forEach(editFileObj);
})


async function editFileObj(fileObj: FileObj) {
    const compressedImage = await compressImage(fileObj.file);

    const compressedFile = new File([compressedImage], 'filename', {type: 'image/jpeg'});
    fileObj.isCompressed = true;
    fileObj.file = compressedFile;
}

const allCompressed = computed(() => !uncompressedImages.value.length);
</script>

<template>
    <input ref="fileInput" type="file" id="file-upload" multiple @change="addFiles">
    
    <p>Done? {{allCompressed}}</p>

    <h2>Input files:</h2>
    <ul>
        <li v-for="file in files" :key="file.id">{{ file.file.name }}, {{file.file.size}}</li>
    </ul>
</template>