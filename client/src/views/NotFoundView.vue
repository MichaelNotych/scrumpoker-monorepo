<script setup>
import CustomButton from '@/components/CustomButton.vue';
import ViewWrapper from '@/components/ViewWrapper.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
	<ViewWrapper>
		<div class="not-found">
			<div class="not-found__title">Page not found</div>
			<CustomButton @click="router.push('/')">Go back home</CustomButton>
		</div>
	</ViewWrapper>
</template>

<style>
.not-found {
	max-width: 30rem;
	margin: auto;
	padding: 0 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
}

.not-found__title {
	font-size: 2rem;
	font-weight: 700;
}
</style>