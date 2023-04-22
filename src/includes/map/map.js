class Map {
	constructor() {
		this.windowWidth = window.innerWidth;
		this.dropdownBtn = document.querySelector('[data-dropdown-btn]');
		this.dropdownIcon = document.querySelector('[data-dropdown-icon]');
		this.dropdownLinks = document.querySelectorAll('[data-dropdown-link]');
		this.dropdownLists = document.querySelectorAll('[data-dropdown-list]');
		this.dropdown = document.querySelector('[data-dropdown]');

		this.init();
		window.addEventListener('resize', () => {
			this.windowWidth = window.innerWidth;
		});
	}
	init() {
		this.dropdownBtn.addEventListener('click', () => {
			this.dropdown.classList.toggle('_show');
			this.dropdownIcon.classList.toggle('_show');
		});

		this.dropdownLinks.forEach(link => {
			link.addEventListener('click', e => {
				e.preventDefault();
				if (this.windowWidth > 768 && this.dropdown.classList.contains('_show')) {
					this.dropdown.classList.toggle('_show');
					this.dropdownIcon.classList.toggle('_show');
				}
			});
		});

		this.dropdownLists.forEach(list => {
			list.addEventListener('click', e => {
				const children = e.currentTarget.querySelectorAll(
					'[data-dropdown-list-item]:not(:first-child)'
				);
				children.forEach(child => {
					child.classList.toggle('_show');
				});
			});
		});
	}
}

export default new Map();
