<script>
	import { onMount } from 'svelte';
	import { navigation } from '$lib/stores/navigation.svelte.js';
	import mapboxgl from 'mapbox-gl';
	import '../../../node_modules/mapbox-gl/dist/mapbox-gl.css';
	import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';

	let { scenes } = $props();

	let map;
	let mapContainer;
	let markers = [];
	let introCompleted = false;

	// Update map using $effect
	$effect(() => {
		const sceneNumber = navigation.value;

		if (map && sceneNumber && markers.length > 0) {
			console.log('Current map scene:', sceneNumber);
			updateMapForScene(sceneNumber);
		}
	});

	function updateMapForScene(sceneNumber) {
		const scene = scenes.find((s) => s.meta.scene === sceneNumber);
		const nextScene = scenes.find((s) => s.meta.scene === sceneNumber + 1);

		if (!scene) {
			return;
		}

		// Update marker states
		markers.forEach((marker) => {
			const markerElement = marker.getElement().querySelector('.marker');
			const markerSceneNumber = parseInt(markerElement.getAttribute('data-scene'));

			// Remove all state classes
			markerElement.classList.remove('active', 'next', 'visited');

			// Add appropriate classes based on the current scene
			if (markerSceneNumber === sceneNumber) {
				// Current scene: active and visited
				markerElement.classList.add('active', 'visited');
			} else if (markerSceneNumber === sceneNumber + 1) {
				// Next scene: visible and clickable
				markerElement.classList.add('next');
			} else if (markerSceneNumber < sceneNumber) {
				// Previous scenes: visited but not active
				markerElement.classList.add('visited');
			}
		});

		// Update map view (always update after intro is completed)
		if (introCompleted) {
			if (nextScene) {
				let newBounds = new mapboxgl.LngLatBounds();
				newBounds.extend([scene.meta.lng, scene.meta.lat]);
				newBounds.extend([nextScene.meta.lng, nextScene.meta.lat]);
				map.fitBounds(newBounds, { padding: 48 });
			} else {
				map.flyTo({
					center: [scene.meta.lng, scene.meta.lat],
					zoom: 10,
				});
			}
		}
	}

	onMount(() => {
		console.log('Map component mounted');
		console.log('Scenes:', scenes.length);

		if (!scenes.length || !mapContainer) {
			return;
		}

		let bounds = new mapboxgl.LngLatBounds();

		for (let scene of scenes) {
			if (scene.meta) {
				let coords = [scene.meta.lng, scene.meta.lat];
				bounds.extend(coords);
			}
		}

		map = new mapboxgl.Map({
			container: mapContainer,
			accessToken: PUBLIC_MAPBOX_TOKEN,
			style: `mapbox://styles/mapbox/dark-v11`,
			projection: "globe",
			minZoom: 4,
			maxZoom: 18
		});

		map.fitBounds(bounds, { padding: 48, duration: 0 });

		map.addControl(
			new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				trackUserLocation: true,
				showUserHeading: true
			})
		);

		// Create markers
		for (let scene of scenes) {
			if (scene.meta) {
				const el = document.createElement('div');
				const elLink = document.createElement('a');

				elLink.href = `#scene-${scene.meta.scene}`;
				elLink.setAttribute('data-scene', scene.meta.scene);
				elLink.classList.add('marker');
				elLink.classList.add('next'); // Initially show all markers
				elLink.classList.add('intro'); // Disable interaction
				elLink.classList.add(scene.meta.type);
				elLink.textContent = `${scene.meta.scene}`;

				// Handle marker clicks through the navigation store
				elLink.addEventListener('click', (e) => {
					e.preventDefault();
					if (e.target.classList.contains('intro')) return; // Ignore clicks during intro

					const sceneNumber = parseInt(e.target.getAttribute('data-scene'));
					const currentSceneNumber = navigation.value;

					// Only allow clicking on next scene or any previously visited scene
					if (sceneNumber === currentSceneNumber + 1 || sceneNumber <= currentSceneNumber) {
						navigation.goToScene(sceneNumber, scenes);
					}
				});

				el.appendChild(elLink);
				let coords = [scene.meta.lng, scene.meta.lat];
				const marker = new mapboxgl.Marker(el).setLngLat(coords).addTo(map);
				markers.push(marker);
			}
		}

		const firstMarker = markers[0]?.getElement().querySelector('.marker');
		const secondMarker = markers[1]?.getElement().querySelector('.marker');

		if (firstMarker) {
			// Set up first marker as active and visited immediately
			firstMarker.classList.add('active', 'visited');
		}

		// After 3 seconds, fade out all markers except current/next and enable interaction
		setTimeout(() => {
			markers.forEach((marker) => {
				const markerElement = marker.getElement().querySelector('.marker');
				const markerSceneNumber = parseInt(markerElement.getAttribute('data-scene'));

				// Remove the intro class to enable interaction
				markerElement.classList.remove('intro');

				// Hide markers beyond scene 2 initially (but they'll be shown as we progress)
				if (markerSceneNumber > 2) {
					markerElement.classList.remove('next');
				}
			});
		}, 3000);

		// After 5 seconds, complete intro and zoom to the first two scenes
		setTimeout(() => {
			if (secondMarker) {
				secondMarker.classList.add('next');
			}

			// Mark intro as completed
			introCompleted = true;

			// Auto-start the first scene and zoom to it
			navigation.goToScene(1, scenes);

			// Zoom to the first and second scene after intro
			if (scenes.length >= 2) {
				const firstScene = scenes.find((s) => s.meta.scene === 1);
				const secondScene = scenes.find((s) => s.meta.scene === 2);

				if (firstScene && secondScene) {
					let newBounds = new mapboxgl.LngLatBounds();
					newBounds.extend([firstScene.meta.lng, firstScene.meta.lat]);
					newBounds.extend([secondScene.meta.lng, secondScene.meta.lat]);
					map.fitBounds(newBounds, { padding: 48 });
				}
			}
		}, 5000);
	});
</script>

<div class="map-wrap">
	<div class="map" bind:this={mapContainer}></div>
</div>

<style>
	.map-wrap {
		position: fixed;
		top: 64px;
		width: 100%;
		height: 240px;
		box-shadow: var(--shadow-2);
	}
	.map {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	:global(.marker) {
		background: rgba(000, 000, 000, 0);
		font-size: var(--font-size-2);
		border-style: dotted;
		border-width: var(--border-size-2);
		border-color: var(--sand-3);
		display: flex;
		transition: opacity 0.5s ease;
		opacity: 0;
		pointer-events: none;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: var(--radius-round);
		text-decoration: none;
		color: white;
		box-shadow: var(--sand-3) 0 0 1rem;
		cursor: pointer;
	}
	:global(.marker.intro) {
		pointer-events: none;
	}
	:global(.marker.next) {
		opacity: 1;
		pointer-events: auto;
	}
	:global(.marker.visited) {
		opacity: 1;
		pointer-events: auto;
	}
	:global(.type-3) {
		border-color: var(--cyan-3);
		box-shadow: var(--cyan-3) 0 0 1rem;
	}
	:global(.type-2) {
		border-color: var(--yellow-3);
		box-shadow: var(--yellow-3) 0 0 1rem;
	}
	:global(.marker.active) {
		background: rgba(255, 255, 255, 1);
		color: black;
		opacity: 1;
		pointer-events: auto;
		border-style: solid;
	}
	:global(.marker.visited:not(.active)) {
		background: rgba(255, 255, 255, 0.5);
		color: black;
		opacity: 1;
		pointer-events: auto;
	}
	:global(.marker:hover) {
		background: rgba(255, 255, 255, 1) !important;
		text-decoration: underline;
		color: black !important;
	}
	@media (min-width: 768px) {
		.map-wrap {
			height: 340px;
		}
	}
</style>
