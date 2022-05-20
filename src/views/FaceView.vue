<script setup lang="ts">
import { reactive } from "vue";
import { FaceClient } from "@azure/cognitiveservices-face";
import { ApiKeyCredentials } from "@azure/ms-rest-js";

function startRecording() {
  console.log("Video recording started...");
  navigator.mediaDevices
    .getUserMedia({ audio: false, video: true })
    .then(onStream);
}

const state = reactive({
  stream: new MediaStream(),
  playing: false,
  image: "",
});

function stopRecording() {
  state.stream.getTracks().forEach((track) => track.stop());
  state.playing = false;
}

function onStream(stream: MediaStream) {
  state.stream = stream;
  state.playing = true;
}

function takePicture() {
  console.log("Trying to take picture...");
  const track = state.stream.getVideoTracks()[0];
  let imageCapture = new ImageCapture(track);
  imageCapture.takePhoto().then(usePicture);
}

function usePicture(blob: Blob) {
  state.image = URL.createObjectURL(blob);
  const credentials = new ApiKeyCredentials({
    inHeader: { "Ocp-Apim-Subscription-Key": "faceApiKey" },
  });
  let faceClient = new FaceClient(credentials, "endpoint");
  faceClient.face.detectWithStream(blob).then((response) => {
    console.log("Response from Face API...");
    console.log(response);
  });
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
  <video
    autoplay
    :srcObject="state.stream"
    type="video/mp4"
    v-if="state.playing"
  ></video>
  <button class="btn gap-2" @click="takePicture" v-if="state.playing">
    <font-awesome-icon icon="camera" />
    Take picture
  </button>
  <img :src="state.image" />
  To dos: Add Face API - Features: age, face features, glasses
</template>
