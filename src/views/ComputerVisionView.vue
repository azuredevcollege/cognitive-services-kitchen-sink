<script setup lang="ts">
import { reactive, computed } from "vue";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import { useSettingsStore } from "@/stores/settings";
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';


const settings = useSettingsStore();
var imageUrl = "";
const endpoint = 'https://' + settings.azureregion + '.api.cognitive.microsoft.com/';

function analyzePicture() {
  imageUrl = (document.getElementById("imagelink1")! as HTMLInputElement).value;
  const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': settings.apikey } }), endpoint);
  computerVisionClient.describeImage(imageUrl)
    .then(result => {
      console.log(result);
      var caption = JSON.stringify(result.captions[0].text);
      var confidence1 = JSON.stringify(result.captions[0].confidence);
      var confidence2 = parseFloat(confidence1) * 100;
      (document.getElementById("tags")! as HTMLInputElement).innerHTML = "We are about " + confidence2.toFixed(2) + "% sure that the image shows " + caption.slice(1, -1) + ".";
      (document.getElementById("image")! as HTMLMediaElement).src = imageUrl;
    });
  // computerVisionClient.recognizePrintedText(true, imageUrl)
  //   .then(result => {
  //     console.log(result);
  //     var caption1 = JSON.stringify(result);
  //     (document.getElementById("text")! as HTMLMediaElement).innerHTML = caption1;
  //   });
}

</script>

<template>

  <div class="form-control">
    <div class="input-group">
      <input type="text" placeholder="Link to the image you want to analyze ..." class="input input-bordered"
        id="imagelink1" />
      <button class="btn" @click="analyzePicture">Analyze</button>
    </div>
  </div>
  <p id="tags"></p>
  <p id="text"></p>
  <img id="image" />
</template>