<script setup lang="ts"></script>

<template>
  <div class="greetings">
    <h1 class="blue">Azure Cognitive Services - Kitchen Sink</h1>
    <h3 class="blue">
      Welcome to the Azure Cognitive Services - Kitchen Sink Application. Here,
      you can try out different cognitive services of the Azure Cognitive
      Services stack.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
