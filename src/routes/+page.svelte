<script>
	import decorate from '$lib/utils/decorate';
	import { PUBLIC_MODE } from '$env/static/public';
</script>

<svelte:head>
	<title>{decorate('Home')}</title>
	<meta name="description" content="Home description goes here." />
</svelte:head>

<section>
	<header>
	<h2>SvelteKit Mapbox</h2>
	</header>
	<p>By <a href="https://williamcorner.com">William Corner</a></p>
	<p class="small">Example SvelteKit App with clickable scenes linked to map marker points.</p>

	<nav>
		<ul>
			<li>
				<a data-sveltekit-preload-data="hover" href="/section/1">Section 1</a>
			</li>
			{#if PUBLIC_MODE !== 'demo'}
				<li>
					<a data-sveltekit-preload-data="hover" href="/section/2">Section 2</a>
				</li>
			{/if}
		</ul>
	</nav>
</section>

<style>
	h2 {
		text-align: center;
		line-height: 0.9;
		padding: 1rem 0;
		color: transparent;
		background-image: var(--custom-gradient-1);
		background-clip: text;
	}
	h2 span {
		font-size: var(--font-size-fluid-2);
	}
	section {
		padding: var(--size-fluid-2);
		background: var(--brown-1);
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	header {
			background: var(--sand-8);
			padding: var(--size-fluid-3);
			border-radius: var(--radius-drawn-4);
	}
	nav {
		margin: var(--size-fluid-3) 0;
	}
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		row-gap: var(--size-fluid-2);
	}
	.small {
			font-size: var(--font-size-fluid-1);
			margin: 0;
			text-align: center;
	}
	a {
		color: var(--blue-8);
	}
	a:hover {
		color: var(--blue-10);
	}
	li a {
      font-size: var(--font-size-fluid-2);
	}
</style>
