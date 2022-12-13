
<script setup lang="ts">
import { reactive, computed } from "vue";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import { useSettingsStore } from "@/stores/settings";
import { DocumentAnalysisClient, AzureKeyCredential } from '@azure/ai-form-recognizer'; // import Form Recognizer


const settings = useSettingsStore();
var imageUrl = "";
const endpoint = 'https://' + settings.azureregion + '.api.cognitive.microsoft.com/';
const credentials =  new AzureKeyCredential(settings.apikey);

async function analyzePicture() {
    imageUrl = (document.getElementById("imagelink1")! as HTMLInputElement).value;
    (document.getElementById("image")! as HTMLMediaElement).src = "";
    const documentClient = new DocumentAnalysisClient( // FormRecognizerClient
      endpoint, credentials );
    const poller = await documentClient.beginAnalyzeDocument("prebuilt-receipt", imageUrl) // Form Recognizer API ansprechen
    const {
        documents: [result]
    } = await poller.pollUntilDone();
    (document.getElementById("merchant")! as HTMLInputElement).innerHTML = 'Merchant name: ' + JSON.stringify(result.fields.MerchantName.value).slice(1,-1);
    (document.getElementById("total")! as HTMLInputElement).innerHTML = 'Total price: ' + JSON.stringify(result.fields.Total.value);
    (document.getElementById("image")! as HTMLMediaElement).src = imageUrl;
  }


</script>

<template>

  <div class="form-control">
    <div class="input-group">
      <input type="text" placeholder="Link to the image you want to analyze ..." class="input input-bordered"
        id="imagelink1" />
      <button class="btn btn-active btn-accent" @click="analyzePicture">Analyze</button>
    </div>
  </div>
  <p id="merchant"></p>
  <p id="total"></p>
  <img id="image" />
  <div>
    <canvas id="canvas" width="300" height="200"></canvas>
  </div>
</template>