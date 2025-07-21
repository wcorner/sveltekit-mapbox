<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { fade } from 'svelte/transition';
	import 'open-props/animations.min.css';
	let { data, children } = $props();
</script>

<Header />

{#key data.currentRoute}
	<main in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
		{@render children?.()}
	</main>
{/key}

<Footer />

<style>
	:root {
		--custom-gradient-1: linear-gradient(to right bottom, rgb(199, 210, 254), rgb(254, 202, 202), rgb(254, 243, 199));
	}
	:global(body) {
		margin: 0;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background: var(--stone-10);
		font-family: var(--font-geometric-humanist);
	}
	:global(*) {
		box-sizing: border-box;
	}
	:global(article * + *) {
		margin-top: var(--size-fluid-2);
	}
	:global(article > p) {
		text-indent: 1em;
	}
	:global(article > blockquote) {
		margin-left: 1.5em;
		margin-right: 1.5em;
	}
	:global(h1, h2) {
		font-size: var(--font-size-fluid-3);
		line-height: var(--font-lineheight-1);
		margin: 0;
	}
	:global(h3) {
		font-size: var(--font-size-fluid-2);
	}
	:global(p, ul, code) {
		font-size: var(--font-size-fluid-1);
		line-height: 1.5;
	}

	:global(article code) {
		color: var(--cyan-10);
		text-shadow: var(--cyan-6) 0 0 0.5rem;
		background: var(--cyan-1);
		font-family: var(--font-classical-humanist);
		/*font-family: var(--font-monospace-code);*/
		z-index: 0;
	}
	:global(a) {
		text-decoration: underline;
	}
	:global(a:hover) {
		text-decoration: none;
	}
	main {
		margin-top: 64px;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}
</style>
