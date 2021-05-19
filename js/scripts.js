$(() => {
	// Отзывы
	if ($('.cultural .reviews .swiper-container').length) {
		new Swiper('.cultural .reviews .swiper-container', {
			loop: true,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.reviews_swiper-button-next',
				prevEl: '.reviews_swiper-button-prev'
			},
			breakpoints: {
				0: {
					spaceBetween: 16,
					slidesPerView: 2
				},
				480: {
					spaceBetween: 20,
					slidesPerView: 2
				},
				768: {
					spaceBetween: 20,
					slidesPerView: 3
				},
				1024: {
					spaceBetween: 24,
					slidesPerView: 4
				},
				1280: {
					spaceBetween: 34,
					slidesPerView: 4
				}
			}
		})
	}
})