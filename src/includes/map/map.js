class Map {
	constructor() {
		this.dropdownBtn = document.querySelector('[data-dropdown-btn]');
		this.dropdownIcon = document.querySelector('[data-dropdown-icon]');
		this.dropdownLinks = document.querySelectorAll('[data-dropdown-link]');
		this.dropdown = document.querySelector('[data-dropdown]');
		this.init();
	}
	init() {
		this.dropdownBtn.addEventListener('click', () => {
			this.dropdown.classList.toggle('_show');
			this.dropdownIcon.classList.toggle('_show');
		});

		this.dropdownLinks.forEach(link => {
			link.addEventListener('click', e => {
				e.preventDefault();
				this.dropdown.classList.remove('_show');
				this.dropdownIcon.classList.remove('_show');
			});
		});
	}
}

export default new Map();
