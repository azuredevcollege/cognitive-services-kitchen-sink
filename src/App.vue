<script setup lang="ts">
import { RouterView } from "vue-router";
// import WelcomeKitchenSink from "@/components/WelcomeKitchenSink.vue";
import MainView from "@/views/MainView.vue";
</script>

<template>
  <MainView>
    <RouterView />
  </MainView>
</template>
