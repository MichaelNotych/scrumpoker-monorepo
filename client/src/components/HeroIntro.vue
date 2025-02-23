<template>
	<div class="hero__intro">
		<h2 class="hero__title">How it works:</h2>
		<ul class="hero__list">
			<li class="hero__item">
				<div class="hero__info">
					<p class="hero__subtitle">Initiate a new game</p>
					<span class="hero__desc">Create a room and get a unique link to&nbsp;share</span>
				</div>
				<img class="hero__img" src="../assets/how-it-works-1.png" alt="room" width="300" />
			</li>
			<li class="hero__item">
				<div class="hero__info">
					<p class="hero__subtitle">Invite Your Team</p>
					<span class="hero__desc"> Send the link so your team can join and&nbsp;participate
						in&nbsp;realtime</span>
				</div>
				<img class="hero__img" src="../assets/how-it-works-2.png" alt="room" width="300" />
			</li>
			<li class="hero__item">
				<div class="hero__info">
					<p class="hero__subtitle">Rate Tasks Together</p>
					<span class="hero__desc">Estimate task complexity using Fibonacci&nbsp;values</span>
				</div>
				<img class="hero__img" src="../assets/how-it-works-3.png" alt="room" width="300" />
			</li>
		</ul>
	</div>
</template>

<style>
.hero__intro {
	max-width: 50%;
	width: 100%;
	background-color: var(--background-color-light);
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 5rem 3rem;
}

@media (max-width: 960px) {
	.hero__intro {
		padding: 2rem;
	}
}

@media (max-width: 760px) {
	.hero__intro {
		max-width: 100%;
		margin-top: 2rem;
		padding: 2rem 2rem 8rem;
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
		margin-bottom: 1rem;
	}
}

.hero__list {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin: 0;
	padding: 0;
	list-style: none;
	width: 100%;
}

.hero__item {
	display: flex;
	align-items: flex-start;
	gap: 1rem;
}

@media (max-width: 480px) {
	.hero__item {
		flex-direction: column;
	}
}

.hero__info {
	width: 50%;
}

@media (max-width: 480px) {
	.hero__info {
		width: 100%;
	}
}

.hero__img {
	width: 50%;
}

@media (max-width: 480px) {
	.hero__img {
		width: 100%;
	}
}

.hero__subtitle {
	font-size: 1.25rem;
	font-weight: 500;
	margin: 0;
}

.hero__desc {
	font-size: 1rem;
	opacity: 0.6;
}
</style>