<script setup>
defineProps({
	user: {
		type: Object,
	},
	roomStatus: {
		type: String,
	}
})
</script>
<template>
	<div class="user">
		<div :class="`user__vote ${user.vote !== null ? 'filled' : ''} ${roomStatus === 'reveal' ? 'show' : ''}`">
			{{ user.vote }}
		</div>
		{{ user.name }}
	</div>
</template>
<style>
.user {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
}

.user__vote {
	width: 4rem;
	height: 5rem;
	background-color: var(--background-color);
	border-radius: 0.5rem;
	border: 1px solid var(--border-color);
	font-size: 0;
}

.user__vote.filled {
	position: relative;
	background-color: var(--background-color-light);
}

.user__vote.filled::after {
	content: '👍';
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	font-size: 1.5rem;
}

.user__vote.show {
	font-size: inherit;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.25rem;
}

.user__vote.show::after {
	display: none;
}
</style>