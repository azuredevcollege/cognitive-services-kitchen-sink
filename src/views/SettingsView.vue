<script setup lang="ts">
import { useSettingsStore } from "@/stores/settings";
const settings = useSettingsStore();
</script>

<template>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text"
        ><strong>Cognitive Services Subscription Key</strong></span
      >
    </label>
    <input
      v-model="settings.apikey"
      type="text"
      placeholder="Type here"
      class="input input-bordered w-full max-w-xs"
    />
    <label class="label">
      <span class="label-text-alt"
        >Example: e000cad0902x44f0x0c02xxxe12xxx3</span
      >
    </label>
  </div>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text"
        ><strong>Pick your Cognitive Services Region</strong></span
      >
    </label>
    <select class="select select-bordered" v-model="settings.azureregion">
      <option disabled selected>Pick one or type your region</option>
      <option>westeurope</option>
      <option>northeurope</option>
      <option>westus</option>
      <option>eastus</option>
      <option>germanywestcentral</option>
    </select>
  </div>
  <!-- <div class="divider" />
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text"
        ><strong>Face Service Subscription Key</strong></span
      >
    </label>
    <input
      v-model="settings.faceApiKey"
      type="text"
      placeholder="Type here"
      class="input input-bordered w-full max-w-xs"
    />
    <label class="label">
      <span class="label-text-alt"
        >Example: e000cad0902x44f0x0c02xxxe12xxx3</span
      >
    </label>
  </div>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text"><strong>Face Service endpoint</strong></span>
    </label>
    <input
      v-model="settings.faceApiEndpoint"
      type="text"
      placeholder="Type here"
      class="input input-bordered w-full max-w-xs"
    />
    <label class="label">
      <span class="label-text-alt"
        >Example: https://SAMPLE-NAME.cognitiveservices.azure.com/</span
      >
    </label>
  </div> -->
  <div class="divider" />
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text"
        ><strong>Custom Vision Prediction Key</strong></span
      >
    </label>
    <input
      v-model="settings.predictionkey"
      type="text"
      placeholder="Type here"
      class="input input-bordered w-full max-w-xs"
    />
    <label class="label">
      <span class="label-text-alt"
        >Tipp: If you are using a dedicated Custom Vision Service use the Key from the Prediction Service, if you are using a multi-Cognitive Service it's key should be here.</span
      >
    </label>
  </div>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text"
        ><strong>Azure Custom Vision Prediction Endpoint</strong></span
      >
    </label>
    <input
      v-model="settings.predictionendpoint"
      type="text"
      placeholder="Type here"
      class="input input-bordered w-full max-w-xs"
    />
    <label class="label">
      <span class="label-text-alt"
        >Example: https://name.cognitiveservices.azure.com/customvision/v3.0/Prediction/id/classify/iterations/something/url</span
      >
    </label>
  </div>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text"
        ><strong>Azure Custom Vision Published Name</strong></span
      >
    </label>
    <input
      v-model="settings.publishiterationname"
      type="text"
      placeholder="Type here"
      class="input input-bordered w-full max-w-xs"
    />
    <label class="label">
      <span class="label-text-alt"
        >Example: Something</span
      >
    </label>
  </div>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text"
        ><strong>Azure Custom Vision Iteration ID</strong></span
      >
    </label>
    <input
      v-model="settings.iterationid"
      type="text"
      placeholder="Type here"
      class="input input-bordered w-full max-w-xs"
    />
    <label class="label">
      <span class="label-text-alt"
        >Example: e000cad0-902x-44f0-x0c0-2xxxe12xxx3</span
      >
    </label>
  </div>
</template>
