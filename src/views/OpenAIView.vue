<script setup lang="ts">
import { reactive } from "vue";
import { useSettingsStore } from "@/stores/settings";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';

const settings = useSettingsStore();
var inputsentence = "";
var selected = "";
const modeloptions = reactive([]);
var model = "";

function deployments() {
  axios({
    method: 'get',
    url: settings.openaiendpoint + 'openai/deployments?api-version=2022-12-01',
    headers: {
      'Content-Type': 'application/json',
      'api-key': settings.openaikey
    }
  }).then(function (response) {
    modeloptions.length = 0;
    for (let i = 0; i < response.data.data.length; i++) {
      model = (JSON.stringify(response.data.data[i].id)).slice(1, -1);
      axios({
        method: 'get',
        url: settings.openaiendpoint + 'openai/models/' + model + '?api-version=2022-12-01',
        headers: {
          'api-key': settings.openaikey
        }
      }).then(function (responses) {
        if (responses.data.capabilities.embeddings == false) {
          modeloptions.push((JSON.stringify(response.data.data[i].id)).slice(1, -1))
        }
      })
    }
  }).catch(function (error) {
    if (error.response.status === 404) {
      (document.getElementById("result")! as HTMLInputElement).value = "An error has occurred. You might need to enter the API key and endpoint of your service under Settings.";
    } else {
      (document.getElementById("result")! as HTMLInputElement).value = "An unknown error has occurred. If you are interested in the details have a look at the developer console of your browser.";
    }
  });
  
}



function apply() {
  inputsentence = (document.getElementById("inputtext")! as HTMLInputElement).value;
  analyze()
}

function analyze() {
  axios({
    method: 'post',
    url: settings.openaiendpoint + 'openai/deployments/' + selected + '/completions?api-version=2022-12-01',
    maxBodyLength: Infinity,
    headers: {
      'Content-Type': 'application/json',
      'api-key': settings.openaikey
    },
    data: JSON.stringify({
      "prompt": inputsentence,
      "max_tokens": 100,
      "temperature": 0.7,
      "frequency_penalty": 0,
      "presence_penalty": 0,
      "top_p": 1,
      "best_of": 1,
      "stop": null
    }),
  }).then(function (response) {
    console.log(JSON.stringify(response.data));
    (document.getElementById("result")! as HTMLInputElement).value = response.data.choices[0].text;
  }).catch(function (error) {
    if (error.response.status === 404) {
      (document.getElementById("result")! as HTMLInputElement).value = "An error has occurred. You might need to chose a model.";
    } else {
      (document.getElementById("result")! as HTMLInputElement).value = "An unknown error has occurred. If you are interested in the details have a look at the developer console of your browser.";
    }
  });
}

</script>

<template>
  <div>
    <textarea class="textarea textarea-bordered w-1/2 h-24 max-h-48"
      placeholder="Enter something here that can be summarized, given as an SQL query ..." id="inputtext"></textarea>
  </div>
  <div class="form-control space-y-2">
    <div class="input-group">
      <select class="select select-bordered" v-model="selected" id="deployments">
        <option disabled selected>Choose a model</option>
        <option v-for="modeloption in modeloptions" :key="modeloption">
          {{ modeloption }}
        </option>
      </select>
      <button class="btn btn-active" @click="apply">apply</button>
      <button class="btn btn-info" @click="deployments">get models</button>
    </div>
    <div>
      <textarea placeholder="Result" class="textarea textarea-bordered w-1/2 h-24" id="result" rows="8"></textarea>
    </div>
  </div>
</template>
