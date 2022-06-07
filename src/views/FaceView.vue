<script setup lang="ts">
import { reactive, computed } from "vue";
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
  attributes: undefined as FaceAttributes | undefined,
});
const isAngry = computed(() => {
  let anger = state.attributes?.emotion?.anger;
  return anger && anger > 0.1;
});
const isHappy = computed(() => {
  let happy = state.attributes?.emotion?.happiness;
  return happy && happy > 0.1;
});
const isSurprised = computed(() => {
  let surprised = state.attributes?.emotion?.surprise;
  return surprised && surprised > 0.1;
});
const isSad = computed(() => {
  let sad = state.attributes?.emotion?.sadness;
  return sad && sad > 0.1;
});
const isDisgust = computed(() => {
  let disgust = state.attributes?.emotion?.disgust;
  return disgust && disgust > 0.1;
});
const isFear = computed(() => {
  let fear = state.attributes?.emotion?.fear;
  return fear && fear > 0.1;
});
const isNeutral = computed(() => {
  let neutral = state.attributes?.emotion?.neutral;
  return neutral && neutral > 0.1;
});
const isContempt = computed(() => {
  let contempt = state.attributes?.emotion?.contempt;
  return contempt && contempt > 0.1;
});

const emotionPercentage = computed(() => {
  let emotions = state.attributes?.emotion;
  // for (const emotion in emotions) {
  //   if (emotions.hasOwnProperty(emotion)) {
  //     emotions[emotion] = emotions[emotion] * 100;
  //   }
  // }
  // return emotions;
  return {
    anger: emotions?.anger ? (emotions.anger * 100).toFixed(2) : 0,
    disgust: emotions?.disgust ? (emotions.disgust * 100).toFixed(2) : 0,
    neutral: emotions?.neutral ? (emotions.neutral * 100).toFixed(2) : 0,
    sad: emotions?.sadness ? (emotions.sadness * 100).toFixed(2) : 0,
    contempt: emotions?.contempt ? (emotions.contempt * 100).toFixed(2) : 0,
    happy: emotions?.happiness ? (emotions.happiness * 100).toFixed(2) : 0,
    fear: emotions?.fear ? (emotions.fear * 100).toFixed(2) : 0,
    surprised: emotions?.surprise ? (emotions.surprise * 100).toFixed(2) : 0,
  };
  // if (emotions?.anger) {return emotions.anger * 100;) else {return 0;}
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
  <div v-if="state.attributes">
    This is the result: Age: {{ state.attributes?.age }}
    Gender:
    {{ state.attributes?.gender }}
    Emotion:
    <div v-if="isAngry" class="badge badge-error gap-2">
      anger: {{ emotionPercentage.anger }}%
    </div>
    <div v-if="isContempt" class="badge badge-success gap-2">
      contempt: {{ emotionPercentage.contempt }}%
    </div>
    <div v-if="isDisgust" class="badge badge-error gap-2">
      disgust: {{ emotionPercentage.disgust }}%
    </div>
    <div v-if="isHappy" class="badge badge-success gap-2">
      happy: {{ emotionPercentage.happy }}%
    </div>
    <div v-if="isNeutral" class="badge badge-info gap-2">
      neutral: {{ emotionPercentage.neutral }}%
    </div>
    <div v-if="isFear" class="badge badge-error gap-2">
      fear: {{ emotionPercentage.fear }}%
    </div>
    <div v-if="isSad" class="badge badge-error gap-2">
      sad: {{ emotionPercentage.sad }}%
    </div>
    <div v-if="isSurprised" class="badge badge-error gap-2">
      surprised: {{ emotionPercentage.surprised }}%
    </div>
    {{ state.attributes?.emotion }}
    Glasses:
    {{ state.attributes?.glasses }}
    Facial hair:
    {{ state.attributes?.facialHair }}
  </div>
</template>
