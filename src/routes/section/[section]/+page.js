export const load = async ({ fetch, params }) => {
	const { section } = params;
	const response = await fetch(`/api/scenes`);
	const allScenes = await response.json();

	const scenes = allScenes.filter((scene) => scene.meta && scene.meta.section === parseInt(section));

	return {
		section,
		scenes
	};
};
