import utils from '../utils/utils';

const SELECTORS = {
	classActiveNavLink: 'scrolling-page__link_active'
}

class ScrollAnchor {
	constructor() {
		this._nav = document.querySelector('[data-scroll-nav]');
		this._scrollDeltaY = 70;
		this._scrollLength = 0;
		this._currentScrollLength = 0;
		this.currentYCoord = 0;
		this.targetBlockYCoord = 0;

		this._navClickHandler = this._navClickHandler.bind(this);
		this._scroll = this._scroll.bind(this);
		this._scrollAnimation = this._scrollAnimation.bind(this);

		if (this._nav) {
			this.init();
		}
	}

	init() {
		this._nav.addEventListener('click', this._navClickHandler);
	}

	_navClickHandler(event) {
		if (event.target.dataset.scrollAnchor) {
			event.preventDefault();
			this._toggleClasses(event.target);
			this._scroll(event.target);
		}
	}

	_toggleClasses(anchor) {
		if (!anchor.classList.contains(`${SELECTORS.classActiveNavLink}`)) {

			if (this._nav.querySelector(`.${SELECTORS.classActiveNavLink}`)) {
				this._nav
					.querySelector(`.${SELECTORS.classActiveNavLink}`)
					.classList.remove(`${SELECTORS.classActiveNavLink}`);
			}

			anchor.classList.add(`${SELECTORS.classActiveNavLink}`);
		}
	}

	_scroll(element) {
		const targetBlock = document.querySelector(`[data-scroll-target=${element.dataset.scrollAnchor}]`);
		this.targetBlockYCoord =
			targetBlock.getBoundingClientRect().top + window.pageYOffset;
		this.currentYCoord = window.pageYOffset;
		this._scrollLength = this.targetBlockYCoord;

		this._scrollAnimation();
	}

	_scrollAnimation() {
		utils.animate({
			duration: 350,
            timing: utils.easeInOutQuad,
            render: timingProgress => {
				window.scrollTo(0, this.currentYCoord + ((this.targetBlockYCoord - this.currentYCoord) * timingProgress) - this._scrollDeltaY)
            }
		});
	}
}

export default new ScrollAnchor();
