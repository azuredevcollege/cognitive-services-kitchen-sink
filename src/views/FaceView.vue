<script setup lang="ts">
import { reactive } from "vue";
import { FaceClient } from "@azure/cognitiveservices-face";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import { useSettingsStore } from "@/stores/settings";
import type {
  FaceAttributes,
  FaceAttributeType,
  FaceDetectWithStreamResponse,
} from "@azure/cognitiveservices-face/esm/models";

const settings = useSettingsStore();

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
  attributes: {} as FaceAttributes | undefined,
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
  imageCapture
    .takePhoto()
    .catch((error: any) => console.log(error))
    .then(usePicture);
  console.log("Picture taken...");
}

function usePicture(blob: Blob | void) {
  if (!blob) return;
  console.log("Sending picture to face API...");
  state.image = URL.createObjectURL(blob);
  const credentials = new ApiKeyCredentials({
    inHeader: { "Ocp-Apim-Subscription-Key": settings.faceApiKey },
  });
  let faceClient = new FaceClient(credentials, settings.faceApiEndpoint);
  faceClient.face
    .detectWithStream(blob, {
      returnFaceAttributes: [
        "age",
        "emotion",
        "gender",
        "facialHair",
        "glasses",
      ],
    })
    .then(displayResult);
}

function displayResult(response: FaceDetectWithStreamResponse) {
  console.log("Response from Face API...");
  console.log(response);
  if (response.length < 1) return;
  var faceAttributes = response[0].faceAttributes;
  state.attributes = faceAttributes;
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
  This is the result: age: {{ state.attributes?.age }} gender:
  {{ state.attributes?.gender }} emotion:
  {{ state.attributes?.emotion }} glasses:
  {{ state.attributes?.glasses }} facial hair:
  {{ state.attributes?.facialHair }}
</template>
