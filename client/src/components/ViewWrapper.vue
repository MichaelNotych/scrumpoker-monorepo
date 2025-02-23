<script setup>
import CustomHeader from './CustomHeader.vue';
import ThemeToggle from './ThemeToggle.vue';
</script>

<template>
	<CustomHeader />
	<slot></slot>
	<ThemeToggle />
</template>
