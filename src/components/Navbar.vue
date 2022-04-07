<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
	<nav>
		<RouterLink class="bg-sky-600 hover:bg-sky-700" to="/">Home</RouterLink>
		<RouterLink to="/about">About</RouterLink>
	</nav>
</template>