<script setup>
defineProps({
	type: {
		type: String,
		default: "primary",
		validator: (value) => ["primary", "secondary"].includes(value)
	},
	size: {
		type: String,
		default: "md",
		validator: (value) => ["md", "lg"].includes(value)
	},
	isLoading: {
		type: Boolean,
		default: false
	},
	buttonType: {
		type: String,
		default: 'submit',
	}
})
</script>
<template>
	<button class="btn" :class="`btn_${type} btn_${size} ${isLoading ? 'loading' : ''}`" :type="buttonType">
		<slot></slot>
	</button>
</template>
<style>
.btn {
	font-size: 1rem;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	padding: 0.5rem 1rem;
	border-radius: 0.25rem;
	transition: background-color 0.3s;
}

.btn:disabled {
	pointer-events: none;
	opacity: 0.5;
}

.btn_lg {
	padding: 1rem;
	border-radius: 0.5rem;
	text-transform: uppercase;
	text-align: center;
}

.btn_primary {
	background-color: var(--accent-color);
	border-color: var(--accent-color);
	color: var(--accent-button-color);
}

.btn.btn_primary.loading::after {
	border: 0.25rem solid var(--accent-button-color);
}
.btn.btn_primary.loading::after {
	border-top-color:var(--accent-color);
}

.btn_primary:hover {
	background-color: var(--accent-color-hover);
}

.btn_secondary {
	background-color: var(--background-color);
	color: var(--text-color);
	border: 1px solid var(--border-color);
}

.btn_secondary.loading::after {
	border: 0.25rem solid var(--text-color);
}
.btn_secondary.loading::after {
	border-top-color:var(--background-color);
}

.btn_secondary:hover {
	background-color: var(--background-color-light);
}

.btn.loading {
	position: relative;
	pointer-events: none;
}

.btn.loading::after {
	content: '';
    position: absolute;
    left: calc(50% - 0.75rem);
    top: calc(50% - 0.75rem);
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
    animation: spinner 0.9s linear infinite;
}

.btn.loading::before {
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
