<script setup>
import { useRoomStore } from '@/stores/room';
import CopyIcon from './icons/CopyIcon.vue';
import CustomButton from './CustomButton.vue';
import { useUserStore } from '@/stores/user';
import GithubIcon from './icons/GithubIcon.vue';

const roomStore = useRoomStore();
const userStore = useUserStore();

</script>
<template>
	<header class="header">
		<div v-if="roomStore.roomId && userStore.token" class="header__wrapper">
			<div @click="roomStore.copyInviteLink" class="header__title">
				Room: {{ roomStore.roomName }}
				<CopyIcon :width="18" :height="18" />
			</div>
			<CustomButton @click="roomStore.leaveRoom" :is-loading="roomStore.isLeaving" type="secondary">Leave room</CustomButton>
		</div>
		<div v-else class="header__wrapper">
			<a class="header__logo" href="/">
				<img src="../assets/logo.svg" alt="logo"/>
				crum poker
			</a>
			<a href="https://github.com/MichaelNotych/scrumpoker-monorepo/" class="header__link">
				<GithubIcon/>
				Source code
			</a>
		</div>
	</header>
</template>
<style>
.header {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	padding: 2rem 3rem;
}

@media (max-width: 760px) {
	.header {
		padding: 1rem;
	}
}

.header__wrapper {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.header__title {
	font-size: 1.25rem;
	cursor: pointer;
	display: flex;
    gap: 10px;
    align-items: center;
	transition: color 0.3s;
}

.header__title:hover {
	color: var(--accent-color);
}

.header__logo {
	color: inherit;
	display: flex;
	align-items: center;
	gap: 0.1rem;
	text-decoration: none;
	font-size: 1.25rem;
}

.header__link {
	color: inherit;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	text-decoration: none;
	font-size: 0.8rem;
}
</style>