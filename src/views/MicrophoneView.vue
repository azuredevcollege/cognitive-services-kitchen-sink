<script setup lang="ts">
import { reactive } from "vue";

import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
  SpeechRecognitionEventArgs,
} from "microsoft-cognitiveservices-speech-sdk";

function startRecording(){
  console.log("Recording started...")
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then(onStream);
}

const state = reactive({ text: "" });
var recognizer: SpeechRecognizer;
var selectedLanguage = "de-DE";
const speechApiKey = "483d23fec02d4040baeb586f03f0e1c5";
const region = "westeurope";

function onStream(stream: MediaStream) {
  const speechConfig = SpeechConfig.fromSubscription(speechApiKey, region);
  speechConfig.speechRecognitionLanguage = selectedLanguage;
  const audioConfig = AudioConfig.fromStreamInput(stream);
  recognizer = new SpeechRecognizer(speechConfig, audioConfig);
  recognizer.recognizing = onRegonitionResult;
  recognizer.recognized = onRegonitionResult;
  recognizer.startContinuousRecognitionAsync();
}

function onRegonitionResult(
  sender: any,
  event: SpeechRecognitionEventArgs
): void {
  state.text = event.result.text;
}
function onResult(): void {
  recognizer.stopContinuousRecognitionAsync();
}
function onChange(e: any) {
  selectedLanguage = e.target.value;
  console.log(e.target.value);
}
</script>

<template>
  <button class="btn gap-2" @click="startRecording">
  <font-awesome-icon icon="microphone" />
    Start Recording
  </button>
  {{ state.text }}
</template>
