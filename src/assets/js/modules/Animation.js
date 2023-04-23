import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

class Animation {
	constructor() {
		this.init();
	}
	init() {
		this.animationSection();
		this.animationDirections();
	}
	animationSection() {
		gsap.utils.toArray('[data-animation]').forEach(animation => {
			gsap.set(animation, { opacity: 0 });
			gsap.to(animation, {
				opacity: 1,
				stagger: 0.2,
				scrollTrigger: {
					trigger: animation,
					markers: false,
					start: 'top 70%',
					end: 'bottom 50%',
				},
			});
		});
	}
	animationDirections() {
		gsap.to('[data-directions-item]', {
			opacity: 1,
			stagger: 0.2,
			scrollTrigger: {
				trigger: '.directions',
				markers: false,
				start: 'top 50%',
				end: 'bottom 50%',
			},
		});
	}
}

export default new Animation();
