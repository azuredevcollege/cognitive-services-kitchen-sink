
<script setup lang="ts">
import { reactive } from "vue";
import { useSettingsStore } from "@/stores/settings";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const settings = useSettingsStore();
var inputsentence = "";
var model = "";
// var data = JSON.stringify({
//   "prompt": "Summarize the following for me: You can attach files using form data. When you repeatedly make API calls that send the same files, Postman will persist your file paths for later use. This also helps you run collections that contain requests requiring file upload. Uploading multiple files each with their own content type isn't supported.",
//   "max_tokens": 100,
//   "temperature": 0.7,
//   "frequency_penalty": 0,
//   "presence_penalty": 0,
//   "top_p": 1,
//   "best_of": 1,
//   "stop": null
// });

// var config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: settings.openaiendpoint + 'openai/deployments/' + model + '/completions?api-version=2022-12-01',
//   headers: { 
//     'Content-Type': 'application/json', 
//     'api-key': settings.openaikey
//   },
//   data : data
// };

function apply(){
  inputsentence = (document.getElementById("inputtext")! as HTMLInputElement).value;
  analyze()
}

function deploy(){

}

// function analyze(){
//   axios(config)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// }

function analyze(){
  axios({
    method: 'post',
    // baseURL: settings.openaiendpoint,
    url: settings.openaiendpoint + 'openai/deployments/' + model + '/completions?api-version=2022-12-01',
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
    (document.getElementById("result")! as HTMLInputElement).value = (JSON.stringify(response.data));
  })
  .catch(function(error){
    console.log(error);
  });
    // (document.getElementById("result")! as HTMLInputElement).value = (JSON.stringify(response.data[0]));
}

</script>

<template>

  <div>
    <textarea class="textarea textarea-bordered w-1/2 h-24 max-h-48"
      placeholder="I am really interested in AI and happy to try it" id="inputtext" />
  </div>
  <div class="form-control space-y-2">
    <div class="input-group">
      <select class="select select-bordered" v-model="model">
        <option disabled selected>Chose a model</option>
        <option>davinci-002</option>
        <option>Classify Text</option>
        <option>Generate SQL query</option>
        <option>Generate product name</option>
      </select>
      <button class="btn" @click="apply">apply</button>
      <button class="btn" @click="deploy">deploy</button>
    </div>
    <div>
      <input type="text" placeholder="Result" class="textarea textarea-bordered w-1/2 h-24" id="result" />
    </div>
  </div>
</template>