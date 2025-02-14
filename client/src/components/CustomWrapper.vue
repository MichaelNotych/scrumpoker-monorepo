<script setup>
import CustomHeader from './CustomHeader.vue';
import ThemeToggle from './ThemeToggle.vue';

</script>

<template>
	<CustomHeader />
	<div class="wrapper">
		<slot></slot>
	</div>
	<ThemeToggle/>
</template>

<style>
.wrapper {
	max-width: 680px;
	padding: 0 1rem;
	width: 100%;
	margin: auto;
}
</style>