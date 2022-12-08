<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>

<div class="drawer drawer-mobile">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col items-center justify-center">
    <!-- Page content here -->
    <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div class="drawer-side">
    <label for="my-drawer-2" class="drawer-overlay"></label> 
    <ul class="menu p-4 w-80 bg-base-100 text-base-content font-bold">
      <!-- Sidebar content here -->
      <li><RouterLink to="/">Home</RouterLink></li>
      <!-- <li><RouterLink to="/about">About</RouterLink></li> -->
      <li><RouterLink to="/speech">Speech</RouterLink></li>
      <!-- <li><RouterLink to="/face">Face</RouterLink></li> -->
      <li><RouterLink to="/translate">Translator</RouterLink></li>
      <li><RouterLink to="/language">Language</RouterLink></li>
      <!-- <li><RouterLink to="/formrecognizer">Form Recognizer</RouterLink></li> -->
      <li><RouterLink to="/customvision">Custom Vision</RouterLink></li>
      <!-- <li><RouterLink to="/computervision">Computer Vision</RouterLink></li> -->
      <li><RouterLink to="/settings">Settings</RouterLink></li>
      
    </ul>
  </div>
</div>
</template>
