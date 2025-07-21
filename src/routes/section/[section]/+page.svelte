<script>
	import { onMount } from 'svelte';
	import { navigation } from '$lib/stores/navigation.svelte.js';
	import Map from '$lib/components/Map.svelte';
	import { PUBLIC_MODE } from '$env/static/public';
	import decorate from '$lib/utils/decorate';

	let { data } = $props();
	let scenes = data.scenes;

	let currentSection = parseInt(data.section);
	let nextSection = parseInt(data.section) + 1;

	onMount(() => {
		if (scenes && scenes.length > 0) {

			const article = document.querySelectorAll('article')[0];

			setTimeout(() => {
				article.classList.remove('faded');
			}, 5000)
			// Set up keyboard navigation
			const handleKeydown = (e) => {
				// Only handle if no input is focused
				if (
					document.activeElement?.tagName === 'INPUT' ||
					document.activeElement?.tagName === 'TEXTAREA'
				) {
					return;
				}

				if (e.key === 'ArrowRight' || e.key === ' ') {
					e.preventDefault();
					navigation.goToNextScene(scenes);
				} else if (e.key === 'ArrowLeft') {
					e.preventDefault();
					navigation.goToPreviousScene();
				}
			};

			window.addEventListener('keydown', handleKeydown);

			return () => {
				window.removeEventListener('keydown', handleKeydown);
			};
		}
	});

	function goToNextScene() {
		navigation.goToNextScene(scenes);
	}
</script>

<svelte:head>
	<title>{decorate('Section ' + currentSection)}</title>
	<meta
		name="description"
		content={'Section ' +
			currentSection +
			' of SvelteKit Mapbox.'}
	/>
</svelte:head>

<Map {scenes} />

<div class="scene-wrapper">
	{#if scenes.length}
		<h2>Section {currentSection}</h2>

		{#each scenes as scene, index}
			{@const isCurrentScene = scene.meta.scene === navigation.value}
			{@const hasNextScene = index < scenes.length - 1}
			{@const nextSceneNumber = hasNextScene ? scenes[index + 1].meta.scene : null}

			<article hidden={!isCurrentScene} class="{index === 0 ? 'faded' : ''}">
				<span class="anchor" id="scene-{scene.meta.scene}">Scene {scene.meta.scene}</span>
				<h3>Scene {scene.meta.scene}: {scene.meta.location}</h3>

				{@html scene.content.html}

				{#if hasNextScene}
					<a
						class="scene-link continue"
						onclick={(e) => {
							e.preventDefault();
							goToNextScene();
						}}
						href="#scene-{nextSceneNumber}">Continue to Scene {nextSceneNumber}</a
					>
				{:else if nextSection < 6}
					<p>End of Section {currentSection}.</p>

					{#if PUBLIC_MODE === 'demo'}
						<p>
							Thank you for reading this draft.
						</p>
					{/if}

					{#if PUBLIC_MODE !== 'demo'}
						<a data-sveltekit-reload class="scene-link end" href="/section/{nextSection}"
							>Continue to Section {nextSection}</a
						>
					{/if}
				{/if}
			</article>
		{/each}
	{:else}
		<h2>No scenes</h2>
	{/if}
</div>

<style>
	span.anchor {
		display: block;
		position: relative;
		top: calc(-240px - var(--size-fluid-4));
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
	h2 {
		text-align: center;
		color: white;
	}
	:global(.faded) {
			opacity: 0;
	}
	.scene-wrapper {
		margin-top: 240px;
		padding: var(--size-fluid-2);
	}
	article {
		transition: opacity 0.5s ease-in-out;
		margin: var(--size-fluid-2) auto;
		background: var(--stone-1);
		color: var(--stone-10);
		border-radius: var(--radius-3);
		padding: var(--size-fluid-2) var(--size-fluid-2) var(--size-fluid-4) var(--size-fluid-2);
		box-shadow: var(--inner-shadow-2);
		max-width: 60rem;
		background: var(--sand-1);
	}
	.scene-link {
		border: none;
		display: inline-block;
		color: var(--stone-1);
		font-size: var(--font-size-fluid-1);
		text-decoration: none;
		padding: var(--size-fluid-1) var(--size-fluid-2);
		background: var(--stone-10);
		border-radius: var(--radius-2);
		margin-top: var(--size-fluid-1);
		cursor: pointer;
	}
	.scene-link:hover {
		background: var(--custom-gradient-1);
	}
	.scene-link {
		display: inline-block;
		color: var(--stone-1);
		font-size: var(--font-size-fluid-1);
		text-decoration: none;
		padding: var(--size-fluid-1) var(--size-fluid-2);
		background: var(--stone-10);
		border-radius: var(--radius-2);
		margin-top: var(--size-fluid-1);
	}
	.scene-link:hover {
		background: var(--custom-gradient-1);
		color: var(--stone-12);
	}
	@media (min-width: 768px) {
		.scene-wrapper {
			margin-top: 340px;
			padding: var(--size-fluid-2);
		}
	}
</style>
