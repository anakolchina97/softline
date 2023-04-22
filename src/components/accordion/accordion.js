import { gsap } from 'gsap';

const BORDER_HEIGHT = 0;
const MOBILE_BREAKPOINT = 768;

class Accordion {
	constructor(el) {
		const mqMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

		this.onWindowWidthChange = evt => {
			if (evt.matches) {
				if (el.getAttribute('data-accordion') === 'mobile') {
					this.init(el);
				} else {
					this.init(el);
				}
			} else {
				if (el.getAttribute('data-accordion') === 'mobile') {
					if (el.classList.contains('_loaded')) {
						this.destroy();
					}
				} else {
					this.init(el);
				}
			}
		};

		this.onWindowWidthChange = this.onWindowWidthChange.bind(this);

		mqMobile.addEventListener('change', this.onWindowWidthChange);
		this.onWindowWidthChange(mqMobile);
	}
	init(element) {
		if (element.classList.contains('_loaded')) {
			return;
		}

		this.element = element;
		this.toggle = element.querySelector('[data-accordion-toggle]');
		this.content = element.querySelector('[data-accordion-content]');

		this.animation = null;
		this.isClosing = false;
		this.isOpening = false;

		this.addClasses();

		this.onClick = this.onClick.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);

		this.toggle.addEventListener('click', this.onClick);
		window.addEventListener('resize', this.onWindowResize);

		this.element.style.height = `${this.toggle.offsetHeight + BORDER_HEIGHT}px`;
		this.element.classList.add('_loaded');

		global.ProjectApp.accordions.push(this);
	}
	destroy() {
		this.toggle.removeEventListener('click', this.onClick);
		window.removeEventListener('resize', this.onWindowResize);
		this.element.classList.remove('_loaded');
		this.element.removeAttribute('style');
		this.element.open = false;
		this.removeClasses();
	}
	animateHeight(aHeight, bHeight, onFinish, onKill) {
		if (this.animation) {
			this.animation.kill();
			onKill();
		}

		this.animation = gsap.fromTo(
			this.element,
			{ height: aHeight },
			{ height: bHeight, duration: 0.3, ease: 'ease', onComplete: onFinish }
		);
	}
	onClick(evt) {
		evt.preventDefault();

		if (this.isClosing || !this.element.open) {
			this.open();
		} else if (this.isOpening || this.element.open) {
			this.close();
		}

		clearTimeout(this.openTO);

		this.openTO = setTimeout(() => {
			const rect = this.toggle.getBoundingClientRect();

			const isElementInViewport =
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				rect.right <= (window.innerWidth || document.documentElement.clientWidth);

			if (!isElementInViewport || rect.top < 70) {
				this.toggle.scrollIntoView({ behavior: 'smooth' });
			}
		}, 350);
	}
	onWindowResize() {
		!this.element.open &&
			(this.element.style.height = `${this.toggle.offsetHeight + BORDER_HEIGHT}px`);
	}
	open() {
		this.element.open = true;
		window.requestAnimationFrame(() => this.expand());
	}
	close() {
		this.isClosing = true;
		this.element.classList.remove('_opened');

		const startHeight = `${this.element.offsetHeight}px`;
		const endHeight = `${this.toggle.offsetHeight + BORDER_HEIGHT}px`;

		this.animateHeight(
			startHeight,
			endHeight,
			() => this.onAnimationFinish(false, endHeight),
			() => (this.isClosing = false)
		);
	}
	expand() {
		this.isOpening = true;
		this.element.classList.add('_opened');

		const startHeight = `${this.toggle.offsetHeight}px`;
		const endHeight = `${this.element.scrollHeight}px`;

		this.animateHeight(
			startHeight,
			endHeight,
			() => this.onAnimationFinish(true, endHeight),
			() => (this.isOpening = false)
		);
	}
	onAnimationFinish(isOpen, height) {
		if (isOpen) {
			this.isInViewPort =
				this.element.querySelector('.accordion__toggle').getBoundingClientRect().top > 0;
		}
		this.element.open = isOpen;
		this.animation = null;
		this.isClosing = false;
		this.isExpanding = false;
		this.element.style.height = height;

		if (isOpen) {
			clearTimeout(this.TO);

			this.TO = setTimeout(() => {
				this.element.style.height = 'auto';
			}, 100);
		}
	}
	addClasses() {
		this.element.classList.add('accordion');
		this.toggle.classList.add('accordion__toggle');
		this.content.classList.add('accordion__content');
	}
	removeClasses() {
		this.element.classList.remove('accordion');
		this.element.classList.remove('_opened');
		this.toggle.classList.remove('accordion__toggle');
		this.content.classList.remove('accordion__content');
	}
}

export default Accordion;
