import { fetchMarkdownScenes } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const allScenes = await fetchMarkdownScenes();

	const sortedScenes = allScenes.sort((a, b) => {
		return a.meta.scene - b.meta.scene;
	});

	return json(sortedScenes);
};
