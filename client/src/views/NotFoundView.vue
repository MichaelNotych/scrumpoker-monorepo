<script setup>
import CustomButton from '@/components/CustomButton.vue';
import CustomWrapper from '@/components/CustomWrapper.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
	<CustomWrapper>
		<h1>Not found!</h1>
		<CustomButton @click="router.push('/')">Go back home</CustomButton>
	</CustomWrapper>
</template>