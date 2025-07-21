import { render } from 'svelte/server';

export const fetchMarkdownScenes = async () => {
	const allSceneFiles = import.meta.glob('/src/scenes/*/*.md');
	const iterableSceneFiles = Object.entries(allSceneFiles);

	return Promise.all(
		iterableSceneFiles.map(async ([path, resolver]) => {
			const resolvedScene = await resolver();
			const content = render(resolvedScene.default);

			return {
				meta: resolvedScene.metadata,
				path: path,
				content: content
			};
		})
	);
};
