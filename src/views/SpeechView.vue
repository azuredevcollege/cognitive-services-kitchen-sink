<script setup lang="ts">
import { reactive } from "vue";
import { useSettingsStore } from "@/stores/settings";

import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
  SpeechRecognitionEventArgs,
} from "microsoft-cognitiveservices-speech-sdk";

const settings = useSettingsStore();

function startRecording() {
  console.log("Recording started...");
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then(onStream);
}

function stopRecording() {
  state.stream.getTracks().forEach((track) => track.stop());
  state.playing = false;
}

const state = reactive({ text: "", stream: new MediaStream(), playing: false });
var recognizer: SpeechRecognizer;
var selectedLanguage = "de-DE";

function onStream(stream: MediaStream) {
  const speechConfig = SpeechConfig.fromSubscription(
    settings.apikey,
    settings.azureregion
  );
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
  <button class="btn gap-2" @click="startRecording" v-if="state.playing">
    <font-awesome-icon icon="microphone" />
    Start Recording
  </button>
  {{ state.text }}
  <button v-else class="btn gap-2" @click="stopRecording">
    <font-awesome-icon icon="camera" />
    Stop Video Recording
  </button>
  To dos: Add button where language is selected - translate speech to serveral
  languages (choose from dropdown) - sentiment analysis
</template>
