<header>
	<h1>
		<a data-sveltekit-preload-data="hover" href="/"
			> <span>SvelteKit</span> with <span>Mapbox</span></a
		>
	</h1>
</header>

<style>
	header {
		background: var(--custom-gradient-1);
		height: 64px;
		top: 0;
		box-shadow: var(--shadow-2);
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
		position: fixed;
		width: 100%;
		z-index: 100;
	}
	h1 {
		width: 100%;
		font-size: var(--size-fluid-2);
		opacity: 0.8;
	}
	h1 span {
		font-size: var(--size-fluid-3);
	}
	a {
		color: var(--stone-12);
		text-shadow: var(--stone-1) 0 0 0.8rem;
		transition: text-shadow 0.2s ease-in-out;
	}
	a:hover {
		text-shadow: var(--stone-1) 0 0 1.5rem;
	}
</style>
