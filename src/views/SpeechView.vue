<script setup lang="ts">
import { reactive } from "vue";
import { useSettingsStore } from "@/stores/settings";

import "microsoft-cognitiveservices-speech-sdk/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle";
import type * as SpeechSDKType from "microsoft-cognitiveservices-speech-sdk/distrib/lib/microsoft.cognitiveservices.speech.sdk";

declare global {
  interface Window {
    SpeechSDK: {
      AudioConfig: typeof SpeechSDKType.AudioConfig;
      OutputFormat: typeof SpeechSDKType.OutputFormat;
      Recognizer: typeof SpeechSDKType.Recognizer;
      SpeechConfig: typeof SpeechSDKType.SpeechConfig;
      SpeechRecognizer: typeof SpeechSDKType.SpeechRecognizer;
    };
  }
}
const {
  AudioConfig,
  OutputFormat,
  Recognizer,
  SpeechConfig,
  SpeechRecognizer,
} = window.SpeechSDK;

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
  state.stream = stream;
  state.playing = true;
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
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text"
        ><strong>Pick the language you want to transcribe</strong></span
      >
    </label>
    <select class="select select-bordered" v-model="selectedLanguage">
      <option>de-DE</option>
      <option>en-US</option>
      <option>es-ES</option>
      <option>fr-FR</option>
      <option>hi-IN</option>
    </select>
  </div>
  <button class="btn gap-2" @click="startRecording" v-if="state.playing">
    <font-awesome-icon icon="microphone" />
    Start Recording
  </button>
  <button class="btn gap-2" @click="startRecording" v-else>
    <font-awesome-icon icon="microphone" />
    Start Recording
  </button>
  {{ state.text }}
  <!-- To dos: Add button where language is selected - translate speech to serveral
  languages (choose from dropdown) - sentiment analysis -->
</template>
