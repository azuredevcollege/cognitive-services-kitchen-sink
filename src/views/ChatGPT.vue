<script setup lang="ts">
import { reactive } from "vue";
import { useSettingsStore } from "@/stores/settings";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';
import { ChatGPTAPI } from 'chatgpt';

const settings = useSettingsStore();

function sendMessage(){
  var input = (document.getElementById("input")! as HTMLInputElement).value;
  (document.getElementById("question")! as HTMLDivElement).textContent = input;
  axios({
    method: 'post',
    url: settings.openaiendpoint + 'openai/deployments/gpt-35-turbo/chat/completions?api-version=2023-03-15-preview',
    maxBodyLength: Infinity,
    headers: {
      'Content-Type': 'application/json',
      'api-key': settings.openaikey
    },
    data: JSON.stringify({
      "messages": [
        {
          "role": "system",
          "content": "You are a simple assistant without knowledge of any previouly asked questions who can only display one answer at once. You also keep it short."
        },{
          "role": "user",
          "content": input
        }
      ]
    }),
  }).then(function (response) {
    console.log(JSON.stringify(response.data));
    (document.getElementById("answer")! as HTMLDivElement).textContent = response.data.choices[0].message.content;
  }).catch(function (error) {
    if (error.response.status === 404) {
      (document.getElementById("answer")! as HTMLDivElement).textContent = "An error has occurred. You might need to add a key and an endpoint under Settings.";
    } else {
      (document.getElementById("answer")! as HTMLDivElement).textContent = "An unknown error has occurred. If you are interested in the details have a look at the developer console of your browser.";
    }
  });
}


</script>

<template>
  <div class="chat chat-end">
    <div class="chat-bubble chat-bubble-warning w-3/3" id="question">...</div>
  </div>
  <div class="chat chat-start">
    <div class="chat-bubble chat-bubble-success" id="answer">...</div>
  </div>
  <div class="form-control">
    <div class="input-group">
      <input type="text" placeholder="Enter what you want from ChatGPT" class="input input-bordered w-3/3"
        id="input" />
      <button class="btn btn-error" @click="sendMessage">Send</button>
    </div>
  </div>
</template>
