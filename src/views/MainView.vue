<script setup lang="ts">
import NavbarDrawer from "@/components/NavbarDrawer.vue";
import NavbarBurger from "@/components/NavbarBurger.vue";
</script>

<template>
  <div class="drawer drawer-mobile">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <NavbarBurger />
      <!-- Page content here -->
      <slot></slot>
    </div>
    <NavbarDrawer />
  </div>
</template>
