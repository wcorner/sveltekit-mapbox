class Navigation {
	// eslint-disable-next-line no-undef
	value = $state(1);

	goToScene(sceneNumber, scenes) {
		if (sceneNumber >= 1 && sceneNumber <= scenes.length) {
			this.value = sceneNumber;
			window.scrollTo(0, 0);
		}
	}

	goToNextScene(scenes) {
		if (this.value < scenes.length) {
			this.value += 1;
			window.scrollTo(0, 0);
		}
	}

	goToPreviousScene() {
		if (this.value > 1) {
			this.value -= 1;
		}
	}
}

// Export a singleton
export const navigation = new Navigation();
