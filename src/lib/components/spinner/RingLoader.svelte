<script lang="ts">
	import type { SpinnerTypes } from './types/spinner.type';
	export let color: SpinnerTypes['color'] = '#FF3E00';
	export let unit: SpinnerTypes['unit'] = 'px';
	export let duration: SpinnerTypes['duration'] = '2s';
	export let size: SpinnerTypes['size'] = '60';
	export let pause: SpinnerTypes['pause'] = false;
	export let message: string = '';

	const range = (size: number, startAt = 0) => [...Array(size).keys()].map((i) => i + startAt);

</script>

<div class="spinner-wrapper" style="--size: {size}{unit}; --color: {color}; --duration: {duration};">
	{#each range(2, 1) as version}
		<div class="border {version}" class:pause-animation={pause} />
	{/each}
</div>
<div class="spinner-label" style="--color: {color};">{message}</div>

<style>
	.spinner-label {
		color: var(--color);
		font-size: 1.2rem;
		font-weight: 500;
		margin-top: 1rem;
		margin-left: 1rem;
	}
	.spinner-wrapper {
		position: relative;
		align-items: center;
		width: var(--size);
		height: var(--size);
	}
	.border {
		border-color: var(--color);
		position: absolute;
		top: 0px;
		left: 0px;
		width: var(--size);
		height: var(--size);
		opacity: 0.4;
		perspective: 800px;
		border-width: 6px;
		border-style: solid;
		border-image: initial;
		border-radius: 100%;
	}
	.border.\31 {
		animation: var(--duration) linear 0s infinite normal none running ringOne;
	}
	.border.\32 {
		animation: var(--duration) linear 0s infinite normal none running ringTwo;
	}
	.pause-animation {
		animation-play-state: paused;
	}

	@keyframes ringOne {
		0% {
			transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
		}
		100% {
			transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg);
		}
	}
	@keyframes ringTwo {
		0% {
			transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
		}
		100% {
			transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg);
		}
	}
</style>