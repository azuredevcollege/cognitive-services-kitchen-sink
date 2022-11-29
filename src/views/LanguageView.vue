<script setup lang="ts">
import { reactive } from "vue";
import { useSettingsStore } from "@/stores/settings";
import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";

const settings = useSettingsStore();
var language = "";
const endpoint = 'https://' + settings.azureregion + '.api.cognitive.microsoft.com';

function send(){
  var inputsentence = (document.getElementById("inputtext")! as HTMLInputElement).value;
  getSentiment(inputsentence);
}

async function getSentiment(inputsentence: string) {
  var sentence = [];
  sentence.push(inputsentence);
  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(settings.apikey));
  const sentimentresults = await client.analyzeSentiment(sentence, language);
  const sentimentresult = sentimentresults[0];
  if (!sentimentresult.error) {
    // console.log(result.sentiment);
    (document.getElementById("negative")! as HTMLInputElement).value = sentimentresult.confidenceScores.negative * 100;
    (document.getElementById("neutral")! as HTMLInputElement).value = sentimentresult.confidenceScores.neutral * 100;
    (document.getElementById("positive")! as HTMLInputElement).value = sentimentresult.confidenceScores.positive * 100;
  } else {
    console.error(`  Error: ${sentimentresult.error}`);
  }
};

</script>

<template>
  
  <div>
    <textarea class="textarea textarea-bordered w-1/2 h-24 max-h-48" placeholder="I think Sophia does an outstanding job." id="inputtext"/>
  </div>
  <div class="form-control">
    <div class="input-group">
      <select class="select select-bordered" v-model="language">
        <option disabled selected>Pick the language you want to analyze</option>
        <option>de</option>
        <option>en</option>
        <option>es</option>
        <option>fr</option>
        <option>hi</option>
      </select>
      <button class="btn" @click="send">analyze</button>
    </div>
    <div>
      <progress class="progress progress-error w-56" id="negative" max="100"></progress> <br/>
      <progress class="progress progress-warning w-56" id="neutral" max="100"></progress> <br/>
      <progress class="progress progress-success w-56" id="positive" max="100"></progress>
    </div>
  </div>
</template>
