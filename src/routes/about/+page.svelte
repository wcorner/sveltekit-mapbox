<script>
	import decorate from '$lib/utils/decorate';
</script>

<svelte:head>
	<title>{decorate('About')}</title>
	<meta name="description" content="About this app." />
</svelte:head>

<div class="page-wrapper">
	<article>
		<h2>About</h2>
		<h3>What is SvelteKit Mapbox?</h3>
		<p>
			Please read <a href="https://williamcorner.com/"
				>"Behind the Seams"</a
			> on my personal website to see what I'm using this for.
		</p>
	</article>
</div>

<style>
	.page-wrapper {
		padding: var(--size-fluid-2);
	}
	article {
		margin: var(--size-fluid-2) auto;
		background: var(--stone-1);
		color: var(--stone-10);
		border-radius: var(--radius-3);
		padding: var(--size-fluid-2) var(--size-fluid-2) var(--size-fluid-4) var(--size-fluid-2);
		box-shadow: var(--inner-shadow-2);
		max-width: 60rem;
		background: var(--brown-1);
	}
</style>
