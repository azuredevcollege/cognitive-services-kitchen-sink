<script setup lang="ts">
import { reactive, computed } from "vue";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import { useSettingsStore } from "@/stores/settings";
import { PredictionAPIClient } from "@azure/cognitiveservices-customvision-prediction";

const settings = useSettingsStore();
var imageUrl = "";
var predictionlength = 0;

function sendPicture() {
  imageUrl = (document.getElementById("imagelink1")! as HTMLInputElement).value;
  const credentials = new ApiKeyCredentials({ inHeader: { "Prediction-key": settings.predictionkey } });
  const predictor = new PredictionAPIClient(credentials, settings.predictionendpoint);
  predictor.classifyImageUrl(settings.iterationid, settings.publishiterationname, { url: imageUrl })
    .then(result => {
      var results = result.predictions;
      let displayresult = "";
      predictionlength = Object.keys(results!).length;
      for (var i = 0; i < predictionlength; i++) {
        var prob = results![i].probability * 100;
        var name = results![i].tagName;
        console.log(results![i].probability! * 100);
        displayresult += `<progress class="progress w-56" value=` + Math.round(prob) + ` max="100"></progress>` + name + "<br>"
      };
      (document.getElementById("display")! as HTMLInputElement).innerHTML = displayresult;
      (document.getElementById("image")! as HTMLMediaElement).src = imageUrl;
    });
}
</script>

<template>

  <div class="form-control">
    <div class="input-group">
      <input type="text" placeholder="Link to the image you want to analyze ..." class="input input-bordered w-1/3"
        id="imagelink1" />
      <button class="btn" @click="sendPicture">Classify</button>
    </div>
  </div>
  <p id="display"></p>
  <img id="image" />
</template>