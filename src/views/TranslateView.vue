<script setup lang="ts">
import { reactive } from "vue";
import { useSettingsStore } from "@/stores/settings";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const settings = useSettingsStore();
var language = "";
var inputsentence = "";

function send() {
  inputsentence = (document.getElementById("inputtext")! as HTMLInputElement).value;
  translateText();
}

function translateText() {
  axios({
    baseURL: 'https://api.cognitive.microsofttranslator.com',
    url: '/translate',
    method: 'post',
    headers: {
      'Ocp-Apim-Subscription-Key': settings.apikey,
      'Ocp-Apim-Subscription-Region': settings.azureregion,
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
    },
    params: {
      'api-version': '3.0',
      'to': [language]
    },
    data: [{
      'text': inputsentence
    }],
    responseType: 'json'
  }).then(function (response) {
    (document.getElementById("translation")! as HTMLInputElement).value = (JSON.stringify(response.data[0].translations[0]["text"]));
  })
};

</script>

<template>

  <div>
    <textarea class="textarea textarea-bordered w-1/2 h-24 max-h-48"
      placeholder="I am really interested in AI and happy to try it" id="inputtext" />
  </div>
  <div class="form-control space-y-2">
    <div class="input-group">
      <select class="select select-bordered" v-model="language">
        <option disabled selected>Pick a language you want to translate into</option>
        <option>de</option>
        <option>en</option>
        <option>es</option>
        <option>fr</option>
        <option>hi</option>
      </select>
      <button class="btn" @click="send">translate</button>
    </div>
    <div>
      <input type="text" placeholder="Translation" class="textarea textarea-bordered w-1/2 h-24" id="translation" />
    </div>
  </div>
</template>