<script setup>
import { useRoomStore } from '@/stores/room';
import CopyIcon from './icons/CopyIcon.vue';
import CustomButton from './CustomButton.vue';
import { useUserStore } from '@/stores/user';

const roomStore = useRoomStore();
const userStore = useUserStore();

</script>
<template>
	<header class="header">
		<div v-if="roomStore.roomId && userStore.token" class="header__wrapper">
			<div @click="roomStore.copyInviteLink" class="header__title header__title_room">
				Room: {{ roomStore.roomName }}
				<CopyIcon :width="18" :height="18" />
			</div>
			<CustomButton @click="roomStore.leaveRoom" :is-loading="roomStore.isLeaving" type="secondary">Leave room</CustomButton>
		</div>
		<div v-else class="header__wrapper">
			<div class="header__title">SCRUM poker</div>
		</div>
	</header>
</template>
<style>
.header {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	padding: 1rem;
}

.header__wrapper {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.header__title {
	font-size: 1.25rem;
}

.header__title_room {
	cursor: pointer;
	display: flex;
    gap: 10px;
    align-items: center;
	transition: color 0.3s;
}

.header__title_room:hover {
	color: var(--accent-color);
}
</style>