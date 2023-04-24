import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);

class Life {
	constructor() {
		this.init();
	}
	init() {
		new Swiper('[data-slider-life]', {
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
				el: '.swiper-pagination',
			},
			cssMode: true,
			slidesPerView: 1,
			breakpoints: {
				768: {
					cssMode: false,
				},
			},
		});
	}
}

export default new Life();
