<script setup lang="ts">
import { reactive } from "vue";

var src: MediaStream;

function startRecording() {
  console.log("Video recording started...");
  navigator.mediaDevices
    .getUserMedia({ audio: false, video: true })
    .then(onStream);
}

function stopRecording() {
  stream.getTracks().forEach(function (track) {
    track.stop();
  });
}

const state = reactive({ text: "" });
// const faceApiKey = "";
// const region = "";

function onStream(stream: MediaStream) {
  const video = document.querySelector("video");
  if (video) {
    video.play();
    video.srcObject = stream;
  }
}
</script>

<template>
  <button class="btn gap-2" @click="startRecording">
    <font-awesome-icon icon="camera" />
    Start Video Recording
  </button>
  <button class="btn gap-2" @click="stopRecording">
    <font-awesome-icon icon="camera" />
    Stop Video Recording
  </button>
  <video autoplay id="player" type="video/mp4"></video>
</template>
