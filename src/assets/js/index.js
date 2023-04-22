// import { gsap } from 'gsap';

// import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js';
// gsap.registerPlugin(ScrollToPlugin);

// global.gsap = gsap;

// gsap.defaults({
// 	overwrite: 'auto',
// });

class ProjectApp {
	constructor() {
		this.env = require('./utils/env').default;
		this.utils = require('./utils/utils').default;
		this.classes = {
			// Signal: require('./classes/Signal').default,
		};
		this.components = {
			Tabs: require('../../components/tabs/tabs').default,
			Life: require('../../includes/life/life').default,
			Map: require('../../includes/map/map').default,
			Accordion: require('../../components/accordion/accordion').default,
		};
		this.helpers = {};
		this.modules = {};
		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');
			this.accordions = [];

			document.querySelectorAll('[data-tabs]').forEach(tabs => new this.components.Tabs(tabs));
			document.querySelectorAll('[data-accordion]').forEach(el => {
				new this.components.Accordion(el);
			});
		});
	}
}

global.ProjectApp = new ProjectApp();

if (module.hot) {
	module.hot.accept();
}
