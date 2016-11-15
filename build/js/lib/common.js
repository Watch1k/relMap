/* Common JS */
$(document).ready(function () {

	var tagInput = $('.js-tags');

	initTags();

	//for IE9
	svg4everybody();

	initMoreModals();
	initMoreModalsClose();

	function initTags() {
		if (tagInput.length) {
			tagInput.each(function () {
				$(this).tagtacular({
					systemTags: ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega'],
					configEditTrayFirst: true,
					configShowSwitchButton: false,
					configAddButtonText: '+'
				});
			});
		}
	}

	(function () {
		var datepicker = $('.js-datepicker');
		datepicker.datepicker({
			firstDay: 1,
			dateFormat: "dd-mm-yy",
			dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
			monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
			monthNamesShort: ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"],
			showOtherMonths: true
		});
	})();

	function initMoreModals() {
		var modalBtn = $('.js-init-more'),
			content = $('.js-content');
		modalBtn.on('click', function (e) {
			e.preventDefault();
			var _thisBtn = $(this),
				ref = _thisBtn.data('href');
			$.get('modals/' + ref + '.html', function (data) {
				content.prepend(data);
				$('.modal-more').fadeIn('fast');
				initMoreModalsClose();
			});
		});
	}

	function initMoreModalsClose() {
		var modalMore = $('.js-modal-more'),
			closeBtn = $('.js-modal-more-close');

		closeBtn.on('click', function () {
			$(this).closest(modalMore).fadeOut('fast', function () {
				$(this).remove();
				$('form').trigger('reset');
			});
		});
	}

	(function () {
		var tabsNav = $('.js-tabs-nav').children(),
			tabsItem = $('.js-tabs-for').children();

		tabsNav.on('click', function () {
			var _this = $(this);
			tabsNav.removeClass('is-active');
			$(this).addClass('is-active');
			tabsItem.eq(_this.index() - 1).fadeOut('fast', function () {
				tabsItem.eq(_this.index()).fadeIn('fast');
			});
		});

	})();

	(function () {
		var header = $('.js-header'),
			form = $('.js-form'),
			boxHead = $('.js-box-head'),
			boxContent = $('.js-box-content'),
			resetBtn = $('.js-form-reset'),
			checkAllBtn = $('.js-check-all'),
			filterRow = $('.filter__row'),
			iconFilter = $('.icon-filter');

		boxContent.css('height', $(window).height() - header.outerHeight() - boxHead.outerHeight() - 30);

		$(window).resize(function () {
			boxContent.css('height', $(window).height() - header.outerHeight() - boxHead.outerHeight() - 30);
		});

		resetBtn.on('click', function () {
			$(this).closest('form').trigger('reset').find('.is-active').removeClass('is-active');
			$(this).closest('form').find($('.filter__row-hidden')).slideUp('fast');
			$('.js-tags').html('');
			initTags();
		});

		checkAllBtn.on('click', function () {
			var _this = $(this);
			if (_this.is(':checked')) {
				_this.closest('form').find('input[data-checkbox=main]').each(function () {
					if (!$(this).is(checkAllBtn)) {
						$(this).prop('checked', true);
					}
				});
			} else {
				_this.closest('form').find('input[data-checkbox=main]').each(function () {
					if (!$(this).is(checkAllBtn)) {
						$(this).prop('checked', false);
					}
				});
			}
		});

		iconFilter.on('click', function (e) {
			e.preventDefault();
			$(this).closest(filterRow).toggleClass('is-active');
			$(this).toggleClass('is-active').closest('.filter__row-visible').siblings().slideToggle('fast');
		});
	})();

	(function () {
		var geoBtn = $('.js-show-geo');

		geoBtn.on('click', function (e) {
			e.preventDefault();
			var geoWidth = $(this).data('width'),
				geoHeight = $(this).data('height');

			$(this).append(
				'<div class="geo">' +
				'<div class="geo__row">' +
				'Широта: <span class="geo__number">' + geoWidth + '</span>' +
				'</div>' +
				'<div class="geo__row">' +
				'Долгота: <span class="geo__number">' + geoHeight + '</span>' +
				'</div>' +
				'</div>'
			).find('.geo').fadeIn('fast', function () {
				var _thisGeo = $(this);
				$(document).on('click', function (e) {
					if ($(e.target).closest(geoBtn).length != 0) return false;
					_thisGeo.fadeOut('fast', function () {
						$(this).remove();
					});
				})
			});
		});
	})();

	// Clear placeholder
	(function () {
		var el = $('input, textarea');
		el.focus(function () {
			$(this).data('placeholder', $(this).attr('placeholder'));
			$(this).attr('placeholder', '');
		});
		el.blur(function () {
			$(this).attr('placeholder', $(this).data('placeholder'));
		});
	})();

});