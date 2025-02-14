<script setup>
import { onMounted, ref, watch } from 'vue';

const theme = ref('light');
onMounted(() => {
	theme.value = localStorage.getItem('theme') || 'light';
});
watch(theme, () => {
	localStorage.setItem('theme', theme.value);
	document.documentElement.setAttribute('data-theme', theme.value);
});
const handleThemeChange = () => {
	theme.value = theme.value === 'light' ? 'dark' : 'light';
}
</script>
<template>
	<div class="theme">
		<input @input="handleThemeChange" class="theme__input" type="checkbox" name="theme" id="theme" :checked="theme === 'dark'" />
		<div class="theme__toggle"></div>
	</div>
</template>
<style scoped>
.theme {
	position: fixed;
	right: 1rem;
	bottom: 1rem;
}

.theme__toggle {
	width: 3rem;
	height: 1.5rem;
	background-color: var(--background-color-light);
	border: 1px solid var(--border-color);
	border-radius: 1rem;
}

.theme__toggle::after {
	content: '';
	position: absolute;
	height: 1.1rem;
	width: 1.1rem;
	background-color: var(--text-color);
	border-radius: 100%;
	left: 0.18rem;
	top: 0.18rem;
	transition: left 0.3s, background-color 0.3s;
}

.theme__input {
	position: absolute;
	left: 0;
	top: 0;
	margin: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
	z-index: 1;
	cursor: pointer;
}

.theme__input:checked + .theme__toggle::after {
	left: calc(100% - 1.3rem);
	background-color: var(--text-color);
}
</style>