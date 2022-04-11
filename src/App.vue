<script setup lang="ts">
import { RouterView } from 'vue-router'
import WelcomeKitchenSink from '@/components/WelcomeKitchenSink.vue'
import Navbar from "@/components/Navbar.vue"
</script>

<template>
  <header>
    <Navbar />

  </header>
  <main class="container auto-mx">
    <div class="wrapper">
      <WelcomeKitchenSink />
    </div>
    <RouterView />
  </main>

</template>
