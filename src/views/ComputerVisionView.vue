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
        var caption = JSON.stringify(result.captions[0].text);
        var confidence1 = JSON.stringify(result.captions[0].confidence);
        var confidence2 = parseFloat(confidence1) * 100;
        (document.getElementById("tags")! as HTMLInputElement).innerHTML = "We are about " + confidence2.toFixed(2) + "% sure that the image shows " + caption.slice(1, -1) + ".";
      });
    computerVisionClient.detectObjects(imageUrl)
      .then(result => {
        var boxes = [];
        var objects = [];
        if (typeof result.objects !== 'undefined' && result.objects.length > 0){
          for (let i = 0; i < result.objects.length; i++){
            boxes.push(result.objects[i].rectangle.x, result.objects[i].rectangle.y, result.objects[i].rectangle.w, result.objects[i].rectangle.h);
            objects.push(result.objects[i].object, "x", "x", "x")
          }
          displayObjects(imageUrl, boxes, objects);
        } else {
          (document.getElementById("image")! as HTMLMediaElement).src = imageUrl;
        }
      });
}

function analyzeText(){
  imageUrl = (document.getElementById("imagelink1")! as HTMLInputElement).value;
  const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': settings.apikey } }), endpoint);
  computerVisionClient.describeImage(imageUrl)
    .then(result => {
      var caption = JSON.stringify(result.captions[0].text);
      var confidence1 = JSON.stringify(result.captions[0].confidence);
      var confidence2 = parseFloat(confidence1) * 100;
      (document.getElementById("tags")! as HTMLInputElement).innerHTML = "We are about " + confidence2.toFixed(2) + "% sure that the image shows " + caption.slice(1, -1) + ".";
    });
  computerVisionClient.recognizePrintedText(true, imageUrl)
    .then(result => {
      var textboxes = [];
      var texts = [];
      if (typeof result.regions !== 'undefined' && result.regions.length > 0) {
        for (let i = 0; i < result.regions.length; i++){
          for (let j =0; j < result.regions[i].lines.length; j++) {
            for (let k = 0; k < result.regions[i].lines[j].words.length; k++){
              textboxes.push(result.regions[i].lines[j].words[k].boundingBox);
              texts.push(result.regions[i].lines[j].words[k].text)
            }
          }
          displayText(imageUrl, textboxes, texts);
        }
      } else {
        (document.getElementById("image")! as HTMLMediaElement).src = imageUrl;
      }
    });
}

function displayObjects(imageUrl, boxes, objects){
  var j = 0;
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  var img    = new Image();
  img.src    = imageUrl;
  img.onload = function(){
    var w = img.width;
    var h = img.height;
    canvas.height = h;
    canvas.width = w;
    context.drawImage(img,0,0);
    context.strokeStyle = "white";
    context.font="30px Arial";
    for (let i = 0; i < (objects.length/4); i++){
      j = i*4;
      context.strokeText(objects[j], boxes[j], boxes[j+1]);
      context.strokeRect(boxes[j], boxes[j+1], boxes[j+2], boxes[j+3]);
    }
  };
}

function displayText(imageUrl, textboxes, texts){
  var textbox = [];
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  var img    = new Image();
  img.src    = imageUrl;
  img.onload = function(){
    var w = img.width;
    var h = img.height;
    canvas.height = h;
    canvas.width = w;
    context.drawImage(img,0,0);
    context.strokeStyle = "white";
    context.font="20px Arial";
    for (let i = 0; i < (texts.length); i++){
      textbox = textboxes[i].split(',');
      context.strokeText(texts[i], textbox[0], textbox[1]);
      context.strokeRect(textbox[0], textbox[1], textbox[2], textbox[3]);
    }
  };
}

</script>

<template>

  <div class="form-control">
    <div class="input-group">
      <input type="text" placeholder="Link to the image you want to analyze ..." class="input input-bordered"
        id="imagelink1" />
      <button class="btn" @click="analyzePicture">Analyze</button>
      <button class="btn" @click="analyzeText">OCR</button>
    </div>
  </div>
  <p id="tags"></p>
  <p id="text"></p>
  <img id="image" />
  <div>
    <canvas id="canvas" width="300" height="200"></canvas>
  </div>
</template>