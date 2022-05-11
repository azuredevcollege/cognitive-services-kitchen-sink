<script setup lang="ts">
import { reactive } from "vue";

var src: MediaStream;
const video = document.querySelector("video");

function startRecording() {
  console.log("Video recording started...");
  navigator.mediaDevices
    .getUserMedia({ audio: false, video: true })
    .then(onStream);
}

const state = reactive({ text: "" });
const faceApiKey = "064ebbbbf4c54aeeb8f3758b7c8c3404";
const region = "westeurope";

function onStream(stream: MediaStream) {
  video.play();
  video.srcObject = stream;
}
</script>

<template>
  <button class="btn gap-2" @click="startRecording">
    <font-awesome-icon icon="camera" />
    Start Video Recording
  </button>
  <video
    autoplay
    id="player"
    :srcObject="src"
    controls
    type="video/mp4"
  ></video>
</template>
