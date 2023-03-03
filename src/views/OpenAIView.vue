
<script setup lang="ts">
import { reactive } from "vue";
import { useSettingsStore } from "@/stores/settings";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const settings = useSettingsStore();
var api = "";
var inputsentence = "";

function apply() {
  inputsentence = (document.getElementById("inputtext")! as HTMLInputElement).value;
  summarize()
  // if (api=="Summarize Text"){
  //   summarize()
  // } else if (api=="Classify Text"){
  //   classify()
  // } else if (api=="Generate SQL query"){
  //   sql()
  // } else if (api=="Generate product name"){
  //   product()
  // }
}

function summarize(){
  axios({
    method: 'post',
    baseURL: settings.openaiendpoint,
    url: 'openai-demo-sophia.openai.azure.com/openai/deployments/davinci-002/completions?api-version=2022-12-01',
    headers: {
      'Content-type': 'application/json',
      'api-key': settings.openaikey
    },
    data: {
      'promt': inputsentence,
      'max_tokens': 60,
      'temperature': 0.7,
      'frequency_penalty': 0,
      'presence_penalty': 0,
      'top_p': 1,
      'best_of': 1,
      'stop': null

    },
    responseType: '',
  }). then(function (response) {
    (document.getElementById("result")! as HTMLInputElement).value = (JSON.stringify(response.data[0]));
  })
}

function classify(){
  axios({
    method: 'post',
    baseURL: settings.openaiendpoint,
    url: settings.openaiendpoint + '/openai/deployments/davinci-002/completions?api-version=2022-12-01',
    headers: {
      'Content-type': 'application/json',
      'api-key': settings.openaikey
    },
    data: {
      'promt': inputsentence,
      'max_tokens': 60,
      'temperature': 0,
      'frequency_penalty': 0,
      'presence_penalty': 0,
      'top_p': 1,
      'best_of': 1,
      'stop': null

    },
    responseType: '',
  }). then()
}

function sql(){

}

function product(){

}

function translateText() {
  axios({
    baseURL: settings.openaiendpoint,
    url: settings.openaiendpoint + '/openai/deployments/' + settings.openainame,
    method: 'post',
    headers: {
      'Ocp-Apim-Subscription-Key': settings.openaikey,
      'Ocp-Apim-Subscription-Region': settings.azureregion,
      'Content-type': 'application/json',
      // 'X-ClientTraceId': uuidv4().toString()
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
      <select class="select select-bordered" v-model="api">
        <option disabled selected>Pick what you want to do with the text</option>
        <option>Summarize Text</option>
        <option>Classify Text</option>
        <option>Generate SQL query</option>
        <option>Generate product name</option>
      </select>
      <button class="btn" @click="apply">apply</button>
    </div>
    <div>
      <input type="text" placeholder="Result" class="textarea textarea-bordered w-1/2 h-24" id="result" />
    </div>
  </div>
</template>