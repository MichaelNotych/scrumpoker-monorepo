<script setup>
import ViewWrapper from '@/components/ViewWrapper.vue';
import RoomForm from '@/components/RoomForm.vue';
import { ref } from 'vue';
import CustomButton from '@/components/CustomButton.vue';

const showMobileHelp = ref(false);
const mobileHelpHandler = () => {
	showMobileHelp.value = !showMobileHelp.value
}
</script>

<template>
	<ViewWrapper>
		<div class="hero">
			<div class="hero__form">
				<RoomForm />
				<CustomButton class="hero__help" type="secondary" button-type="button" :onclick="mobileHelpHandler">
					How it works?
				</CustomButton>
			</div>
			<div :class="`hero__intro ${showMobileHelp ? 'visible' : ''}`">
				<h2 class="hero__title">How it works:</h2>
				<CustomButton class="hero__close" type="secondary" button-type="button" :onclick="mobileHelpHandler">
					X
				</CustomButton>
				<ul class="hero__list">
					<li class="hero__item">
						<div class="hero__info">
							<p class="hero__subtitle">Initiate a new game</p>
							<span class="hero__text">Create a room and get a unique link to&nbsp;share</span>
						</div>
						<img class="hero__img" src="../assets/how-it-works-1.png" alt="room" width="300" />
					</li>
					<li class="hero__item">
						<div class="hero__info">
							<p class="hero__subtitle">Invite Your Team</p>
							<span class="hero__text"> Send the link so your team can join and&nbsp;participate
								in&nbsp;realtime</span>
						</div>
						<img class="hero__img" src="../assets/how-it-works-2.png" alt="room" width="300" />
					</li>
					<li class="hero__item">
						<div class="hero__info">
							<p class="hero__subtitle">Rate Tasks Together</p>
							<span class="hero__text">Estimate task complexity using Fibonacci&nbsp;values</span>
						</div>
						<img class="hero__img" src="../assets/how-it-works-3.png" alt="room" width="300" />
					</li>
				</ul>
			</div>
		</div>
	</ViewWrapper>
</template>

<style>
.hero {
	display: flex;
	height: 100vh;
	min-height: fit-content;
	flex-direction: row-reverse;
}

@media (max-width: 760px) {
	.hero {
		flex-direction: column;
	}
}

.hero__form {
	padding: 0 1rem;
	width: 100%;
	margin: auto;
}

@media (max-width: 760px) {
	.hero__form {
		padding: 0 2rem;
	}
}

.hero__help {
	display: none;
}

@media (max-width: 760px) {
	.hero__help {
		display: block;
		position: absolute;
		left: 2rem;
        bottom: 2rem;
	}
}

.hero__close {
	display: none;
}

@media (max-width: 760px) {
	.hero__close {
		display: block;
        position: absolute;
        right: 2rem;
        top: 1.5rem;
        z-index: 7;
        font-size: 24px;
	}
}

.hero__intro {
	max-width: 50%;
	width: 100%;
	background-color: var(--background-color-light);
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 5rem 3rem 0rem 3rem;
	overflow: hidden;
	height: 100vh;
}

@media (max-width: 960px) {
	.hero__intro {
		padding: 5rem 2rem 0rem;
	}
}

@media (max-width: 760px) {
	.hero__intro {
		height: auto;
		max-width: 100%;
		margin-top: 2rem;
		padding: 2rem 2rem 8rem;
	}

	.hero__intro {
		margin: 0;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 3;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s;
	}

	.hero__intro.visible {
		opacity: 1;
		pointer-events: inherit;
	}
}

.hero__title {
	font-size: 2rem;
	line-height: 1.2;
	margin: 0 0 2rem;
}

@media (max-width: 760px) {
	.hero__title {
		font-size: 1.5rem;
		margin-bottom: 3rem;
	}
}

.hero__list {
	display: flex;
	flex-direction: column;
	gap: 2rem;
	margin: 0;
	padding: 0;
	list-style: none;
	max-height: calc(100vh - 100px);
	height: 100%;
	overflow-y: auto;
	padding-right: 20px;
	margin-right: -20px;
	width: calc(100% + 20px);
	position: relative;
	padding-bottom: 30px;
}

@media (max-width: 760px) {
	.hero__list {
		max-height: none;
	}
}

.hero__item {
	display: flex;
	align-items: flex-start;
	gap: 1rem;
	flex-direction: column;
}

@media (max-width: 480px) {
	.hero__item {
		flex-direction: column;
	}
}

.hero__info {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
}

.hero__img {
	width: 100%;
	border-radius: 0.25rem;
}

.hero__subtitle {
	font-size: 1.25rem;
	font-weight: 500;
	margin: 0;
}

.hero__text {
	font-size: 1rem;
	opacity: 0.6;
}
</style>