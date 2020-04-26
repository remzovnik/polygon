class ScrollAnchor {
	constructor() {
		this._anchors = document.querySelectorAll('[data-scroll-anchor]');
		this._scrollDelta = 70;
	}

	init() {
		this._anchors.forEach(elem =>
			elem.addEventListener('click', event => {
				event.preventDefault();
				this._scroll(elem);
			})
		);
	}

	_scroll(elem) {
		const target = elem.dataset.scrollAnchor;
		const targetBlock = document.querySelector(`[data-scroll-target=${target}]`);
		const targetBlockYCoord =
			document.documentElement.scrollTop +
			targetBlock.getBoundingClientRect().top -
			this._scrollDelta;

		window.scrollTo({
			top: targetBlockYCoord,
			behavior: 'smooth',
		});
	}
}

export default new ScrollAnchor().init();
