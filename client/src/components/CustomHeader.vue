<script setup>
import { useRoomStore } from '@/stores/room';
import { useUserStore } from '@/stores/user';
import CustomButton from './CustomButton.vue';
import CopyIcon from './icons/CopyIcon.vue';
import GithubIcon from './icons/GithubIcon.vue';

const roomStore = useRoomStore();
const userStore = useUserStore();

</script>
<template>
	<header class="header">
		<div v-if="roomStore.roomId && userStore.token" class="header__wrapper">
			<div @click="roomStore.copyInviteLink" class="header__title">
				Room: {{ roomStore.roomName }}
				<CopyIcon />
			</div>
			<CustomButton @click="roomStore.leaveRoom" :is-loading="roomStore.isLeaving" type="secondary">Leave room</CustomButton>
		</div>
		<div v-else class="header__wrapper">
			<a class="header__logo" href="/">
				scrumpoker
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

@media (max-width: 960px) {
	.header {
		padding: 2rem;
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
    gap: 0.5rem;
    align-items: center;
	transition: color 0.3s;
}

.header__title:hover {
	color: var(--accent-color);
}

.header__logo {
	position: relative;
	color: inherit;
	text-decoration: none;
	font-size: 1.25rem;
	line-height: 1;
	padding-left: 0.75rem;
	font-family: Arial, Helvetica, sans-serif;
}

.header__logo::before {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	width: 0.5rem;
	height: 0.5rem;
	border-radius: 100%;
	background-color: var(--accent-color);
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