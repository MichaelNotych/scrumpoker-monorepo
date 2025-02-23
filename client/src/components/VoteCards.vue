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
	<div v-if="roomStore.status === 'reveal'" class="cards">
		<div class="cards__item" v-for="[vote, count] in roomStore.getVotesResult" :key="vote">
			<div class="cards__count">
				<span :style="`width: ${count / roomStore.votes.length * 100}%`"></span>
			</div>
			<div class="cards__card">{{ vote }}</div>
		</div>
	</div>
	<div v-else class="cards">
		<button v-for="card in cards" :key="card" @click="voteHander(card)"
			:class="[
				'cards__card',
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

.cards__card {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3rem;
	min-width: 3rem;
	height: 4rem;
	font-size: 1rem;
	border: 1px solid var(--border-color);
	border-radius: 0.5rem;
	background-color: var(--background-color-light);
	padding: 0;
	transition:
		transform 0.3s,
		border-color 0.3s;
}

.cards__card:not(.choosed):hover {
	transform: scale(1.05);
	border-color: var(--accent-color-hover);
}

.cards__card:not(.choosed):active {
	transform: scale(0.95);
}

.cards__card.choosed {
	background-color: var(--accent-color);
	color: var(--accent-button-color);
}

.cards__card.disabled {
	pointer-events: none;
	opacity: 0.5;
}

.cards__card.loading {
	position: relative;
	pointer-events: none;
	border-color: var(--accent-color-hover);
}

.cards__card.loading::after {
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

.cards__card.choosed.loading::after {
	border-color: var(--accent-button-color);
	border-top-color: var(--accent-color);
}

.cards__card.loading::before {
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

.cards__item {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.25rem;
}

.cards__item .cards__card {
	pointer-events: none;
}

.cards__count {
	position: absolute;
	width: calc(100% - 0.5rem);
	height: 0.5rem;
	bottom: 0.25rem;
	left: 0.25rem;
	background-color: var(--background-color);
	border-radius: 0.5rem;
	overflow: hidden;
}

.cards__count span {
	position: absolute;
	left: 0;
	bottom: 0;
	height: 100%;
	border-radius: 0.5rem;
	background-color: var(--accent-color);
}
</style>