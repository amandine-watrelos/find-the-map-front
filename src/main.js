import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Find the Map is deployed!'
	}
});

export default app;
