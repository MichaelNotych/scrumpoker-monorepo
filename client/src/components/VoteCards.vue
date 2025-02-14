<script setup>
import { useRoomStore } from '@/stores/room';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const cards = ['?', '0', '1', '2', '3', '5', '8', '13', '21', '40'];
const clickedCard = ref(null);
const roomStore = useRoomStore();
const toast = useToast();

const voteHander = async (vote) => {
	if (roomStore.status === 'reveal') {
		return toast.info('You can\'t vote now, reset the game first');
	}
	clickedCard.value = vote;
	const voteToSubmit = vote === roomStore.getCurrentUserVote ? null : vote;
	await roomStore.vote(voteToSubmit);
	clickedCard.value = null;
}
</script>
<template>
	<div class="cards">
		<button v-for="card in cards" :key="card" @click="voteHander(card)"
			:class="[
				'card',
				card === roomStore.getCurrentUserVote ? 'choosed' : '',
				clickedCard === card ? 'loading' : '',

			]">
			{{ card }}
		</button>
	</div>
</template>
<style>
.cards {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	width: 100%;
	gap: 0.5rem;
}

.card {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 4rem;
	min-width: 4rem;
	height: 5rem;
	font-size: 1.25rem;
	border: 1px solid var(--border-color);
	border-radius: 0.5rem;
	background-color: var(--background-color-light);
	padding: 0;
	transition:
		transform 0.3s,
		border-color 0.3s;
}

@media (max-width: 480px) {
	.card {
		width: 3rem;
		min-width: 3rem;
		height: 4rem;
		font-size: 1rem;
	}
}

.card:not(.choosed):hover {
	transform: scale(1.05);
	border-color: var(--accent-color-hover);
}

.card:not(.choosed):active {
	transform: scale(0.95);
}

.card.choosed {
	background-color: var(--accent-color);
	color: var(--accent-button-color);
}

.card.disabled {
	pointer-events: none;
	opacity: 0.5;
}

.card.loading {
	position: relative;
	pointer-events: none;
	border-color: var(--accent-color-hover);
}

.card.loading::after {
	content: '';
    position: absolute;
    left: calc(50% - 0.75rem);
    top: calc(50% - 0.75rem);
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
	border: 0.25rem solid var(--accent-color);
	border-top-color:var(--background-color-light);
    animation: spinner 0.9s linear infinite;
}

.card.choosed.loading::after {
	border-color: var(--accent-button-color);
	border-top-color: var(--accent-color);
}

.card.loading::before {
	content: '';
	position: absolute;
	inset: 0;
	background-color: inherit;
	border-radius: inherit;
}

@keyframes spinner {
	to {
		transform: rotate(360deg);
	}
}
</style>