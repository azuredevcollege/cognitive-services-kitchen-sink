<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import WelcomeKitchenSink from '@/components/WelcomeKitchenSink.vue'
import Navbar from "@/components/Navbar.vue"
</script>

<template>
  <header>
    <img alt="Azure Cognitive Services Logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <WelcomeKitchenSink />

      <Navbar />
    </div>
  </header>

  <RouterView />
</template>

<style>
@import '@/assets/base.css';
</style>
