<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CopyIcon from '@/components/icons/CopyIcon.vue';
import { useRoomStore } from '@/stores/room';
import UserCard from '@/components/UserCard.vue';
import VoteCards from '@/components/VoteCards.vue';
import CustomButton from '@/components/CustomButton.vue';
import CustomWrapper from '@/components/CustomWrapper.vue';

const route = useRoute();
const roomStore = useRoomStore();

onMounted(() => {
	// set up room connection on mount
	roomStore.enterRoom(route.params.id);

	// clean up room connection on leave
	window.addEventListener('popstate', function (event) {
		console.log('popstate', event);
		if (!event.state.current.includes('/room/')) {
			roomStore.cancelRoomStream();
		}
	});
});
</script>

<template>
	<CustomWrapper>
		<div class="room">
			<div class="room__users">
				<UserCard v-for="(user, index) in roomStore.getTopUsers" :key="index" :user="user"
					:roomStatus="roomStore.status" />
			</div>
			<div class="room__table">
				<div v-if="roomStore.status === 'reveal'" class="room__reveal">
					<div class="room__results">
						<span class="room__explain">Average</span>
						<span class="room__explain">Median</span>
						<span class="room__result">{{ roomStore.average }}</span>
						<span class="room__result">{{ roomStore.median }}</span>
					</div>
					<CustomButton v-if="roomStore.isCurrentUserOwner" @click="roomStore.resetResults" :isLoading="roomStore.isLoading">
						Reset game
					</CustomButton>
				</div>
				<CustomButton v-else-if="roomStore.users.length === 1" @click="roomStore.copyInviteLink">
					Copy invite link
					<CopyIcon :width="18" :height="18" :color="'#fff'" />
				</CustomButton>
				<CustomButton v-else-if="roomStore.status === 'ready' && roomStore.isCurrentUserOwner" @click="roomStore.revealResults" :isLoading="roomStore.isLoading">
					Show results
				</CustomButton>
				<div v-else>Pick your cards!</div>
			</div>
			<div class="room__users">
				<UserCard v-for="(user, index) in roomStore.getBottomUsers" :key="index" :user="user"
					:roomStatus="roomStore.status" />
			</div>
		</div>
		<VoteCards />
	</CustomWrapper>
</template>

<style>
.room {
	margin: auto 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	padding: 3rem 0;
}

@media (max-width: 480px) {
	.room {
		padding: 0 0 2rem;
	}
}

.room__users {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
}

.room__table {
	width: 18rem;
	height: 10rem;
	background-color: var(--background-color-light);
	border-radius: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 1rem;
}

.room__reveal {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.room__results {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 2fr;
	column-gap: 0.5rem;
	text-align: center;
}

.room__explain {
	color: var(--text-color);
	opacity: 0.5;
}

.room__result {
	font-size: 2rem;
	line-height: 1;
}
</style>
