<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
	<nav>
		<RouterLink class="hover:bg-blue-500 hover:ring-blue-500 hover:shadow-md" to="/">Home</RouterLink>
		<RouterLink to="/about">About</RouterLink>
	</nav>
</template>