<template>
	<div class="hero__intro">
		<h2 class="hero__title">How it works:</h2>
		<ol class="hero__list">
			<li class="hero__item">
				<p class="hero__subtitle">Initiate a new game</p>
				<span class="hero__desc">Create a room and get a unique link to&nbsp;share</span>
			</li>
			<li class="hero__item">
				<p class="hero__subtitle">Invite Your Team</p>
				<span class="hero__desc"> Send the link so your team can join and participate in&nbsp;realtime</span>
			</li>
			<li class="hero__item">
				<p class="hero__subtitle">Rate Tasks Together</p>
				<span class="hero__desc">Estimate task complexity using Fibonacci values</span>
			</li>
		</ol>
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
	padding: 3rem;
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
	font-size: 3rem;
	line-height: 1.2;
	margin: 0 0 2rem;
}

@media (max-width: 960px) {
	.hero__title {
		font-size: 2.5rem;
	}
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
	padding-left: 2rem;
}

@media (max-width: 760px) {
	.hero__list {
		padding-left: 1.25rem;
	}
}

.hero__item {
	font-size: 1.5rem;
}

@media (max-width: 960px) {
	.hero__item {
		font-size: 1.25rem;
	}
}

.hero__subtitle {
	font-weight: 500;
	margin: 0;
}

.hero__desc {
	font-size: 1rem;
	opacity: 0.6;
}
</style>