<script setup lang="ts">
import { reactive } from "vue";
import { useSettingsStore } from "@/stores/settings";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const settings = useSettingsStore();
var inputsentence = "";
var selected = "";
const modeloptions: string[] = [];

function deployments(){
  axios({
    method: 'get',
    //maxBodyLength: Infinity,
    url: settings.openaiendpoint + 'openai/deployments?api-version=2022-12-01',
    headers: {
      'Content-Type': 'application/json',
      'api-key': settings.openaikey
    }
  }).then(function(response){
    console.log(JSON.stringify(response.data.id));
    for (let i=0; i<response.data.data.length; i++){
      modeloptions.push((JSON.stringify(response.data.data[i].id)).slice(1,-1))
      console.log(i);
    }
    console.log(modeloptions);
    console.log(typeof modeloptions);
    return modeloptions
  })
}

function apply(){
  inputsentence = (document.getElementById("inputtext")! as HTMLInputElement).value;
  analyze()
}

function analyze(){
  axios({
    method: 'post',
    // baseURL: settings.openaiendpoint,
    url: settings.openaiendpoint + 'openai/deployments/' + selected + '/completions?api-version=2022-12-01',
    maxBodyLength: Infinity,
    headers: {
      'Content-Type': 'application/json',
      'api-key': settings.openaikey
    },
    data: JSON.stringify({
      // "prompt": "Summarize the following for me: You can attach files using form data. When you repeatedly make API calls that send the same files, Postman will persist your file paths for later use. This also helps you run collections that contain requests requiring file upload. Uploading multiple files each with their own content type is not supported.",
      "prompt": inputsentence,
      "max_tokens": 100,
      "temperature": 0.7,
      "frequency_penalty": 0,
      "presence_penalty": 0,
      "top_p": 1,
      "best_of": 1,
      "stop": null
    }),
  }).then(function(response){
    console.log(JSON.stringify(response.data));
    (document.getElementById("result")! as HTMLInputElement).value = response.data.choices[0].text;
  })
  .catch(function(error){
    console.log(error);
  });
}

</script>

<template>

  <div>
    <textarea class="textarea textarea-bordered w-1/2 h-24 max-h-48"
      placeholder="I am really interested in AI and happy to try it" id="inputtext" />
  </div>
  <div class="form-control space-y-2">
    <div class="input-group">
      <select class="select select-bordered" v-model="selected" id="deployments">
        <option selected>  </option>
        <!-- <option disabled selected>Chose a model</option>
        <option>davinci-002</option>
        <option>Classify Text</option>
        <option>Generate SQL query</option>
        <option>Generate product name</option> -->
        <option v-for="modeloptions in modeloptions" :key="modeloptions">{{ modeloptions }}</option>
         
      </select>
      <button class="btn" @click="apply">apply</button>
      <button class="btn" @click="deployments">get models</button>
    </div>
    <div>
      <textarea placeholder="Result" class="textarea textarea-bordered w-1/2 h-24" id="result" rows="8"></textarea>
    </div>
  </div>
</template>