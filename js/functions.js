$(() => {
	// Есть ли поддержка тач событий или это apple устройство
	if (!is_touch_device() || !/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) $('html').addClass('custom_scroll')


	// Ленивая загрузка
	setTimeout(() => {
		observer = lozad('.lozad', {
			rootMargin: '200px 0px',
			threshold: 0,
			loaded: (el) => el.classList.add('loaded')
		})

		observer.observe()
	}, 200)


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() + 'px')


	// Моб. версия
	if ($(window).width() < 360) $('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')


	// Моб. меню
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').addClass('active')
		$('body').addClass('menu_open')
		$('header').addClass('show')
		$('.overlay').fadeIn(300)
	})

	$('header > .close, .overlay').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').removeClass('active')
		$('body').removeClass('menu_open')
		$('header').removeClass('show')
		$('.overlay').fadeOut(300)
	})


	if (is_touch_device()) {
		$('header .menu .item > a.sub_link').addClass('touch_link')

		$('header .menu .item > a.sub_link').click(function (e) {
			const $dropdown = $(this).next()

			if ($dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				$('header .menu .sub_menu').removeClass('show')
				$dropdown.addClass('show')

				$('body').css('cursor', 'pointer')
			}
		})

		// Закрываем под. меню при клике за её пределами
		$(document).click((e) => {
			if ($(e.target).closest('.menu').length === 0) {
				$('header .menu .sub_menu').removeClass('show')

				$('body').css('cursor', 'default')
			}
		})


		// Закрытие моб. меню свайпом справо на лево
		let ts

		$('body').on('touchstart', (e) => { ts = e.originalEvent.touches[0].clientX })

		$('body').on('touchend', (e) => {
			let te = e.originalEvent.changedTouches[0].clientX

			if ($('body').hasClass('menu_open') && ts > te + 50) {
				// Свайп справо на лево
				$('.mob_header .mob_menu_btn').removeClass('active')
				$('body').removeClass('menu_open')
				$('header').removeClass('show')
				$('.overlay').fadeOut(300)
			} else if (ts < te - 50) {
				// Свайп слева на право
			}
		})
	}
})



$(window).resize(() => {
	// Моб. версия
	$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
	if ($(window).width() < 360) $('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')
})



// Вспомогательные функции
const setHeight = (className) => {
	let maxheight = 0

	className.each(function () {
		const elHeight = $(this).outerHeight()

		if (elHeight > maxheight) maxheight = elHeight
	})

	className.outerHeight(maxheight)
}


const is_touch_device = () => !!('ontouchstart' in window)


const widthScroll = () => {
	let div = document.createElement('div')

	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}