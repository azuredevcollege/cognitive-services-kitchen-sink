<script setup lang="ts">
import { reactive } from "vue";

function startRecording() {
  console.log("Video recording started...");
  navigator.mediaDevices
    .getUserMedia({ audio: false, video: true })
    .then(onStream);
}

const state = reactive({
  stream: new MediaStream(),
  playing: false,
});

function stopRecording() {
  state.stream.getTracks().forEach((track) => track.stop());
  state.playing = false;
}

const faceApiKey = "064ebbbbf4c54aeeb8f3758b7c8c3404";
const region = "westeurope";

function onStream(stream: MediaStream) {
  state.stream = stream;
  state.playing = true;
}
</script>

<template>
  <button class="btn gap-2" @click="stopRecording" v-if="state.playing">
    <font-awesome-icon icon="camera" />
    Stop Video Recording
  </button>
  <button v-else class="btn gap-2" @click="startRecording">
    <font-awesome-icon icon="camera" />
    Start Video Recording
  </button>
  <video autoplay :srcObject="state.stream" type="video/mp4"></video>
</template>
