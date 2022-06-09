<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="drawer-side">
    <label for="drawer" class="drawer-overlay"></label>
    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
      <!-- Sidebar content here -->
      <li><RouterLink to="/">Home</RouterLink></li>
      <!-- <li><RouterLink to="/about">About</RouterLink></li> -->
      <li><RouterLink to="/speech">Speech</RouterLink></li>
      <li><RouterLink to="/face">Face</RouterLink></li>
      <li><RouterLink to="/language">Language</RouterLink></li>
      <!-- <li><RouterLink to="/formrecognizer">Form Recognizer</RouterLink></li> -->
      <li><RouterLink to="/customvision">Custom Vision</RouterLink></li>
      <!-- <li><RouterLink to="/computervision">Computer Vision</RouterLink></li> -->
      <li><RouterLink to="/settings">Settings</RouterLink></li>
    </ul>
  </div>
</template>
