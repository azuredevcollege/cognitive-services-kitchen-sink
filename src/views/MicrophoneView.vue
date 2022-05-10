<script setup lang="ts">
import { onMounted, reactive } from "vue";

import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
  SpeechRecognitionEventArgs,
} from "microsoft-cognitiveservices-speech-sdk";

onMounted(() => {
  console.log(`the component is now mounted.`);

  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then(onStream);
});

const state = reactive({ text: "" });
var recognizer: SpeechRecognizer;
var selectedLanguage = "de-DE";
const speechApiKey = "6a7021f06ec949d7a650ea641f06b258";
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
  {{ state.text }}
</template>
