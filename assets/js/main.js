/*
	Locus by Pixelarity
	pixelarity.com @pixelarity
	License: pixelarity.com/license
*/

(function($) {

	var settings = {

		// Parallax background effect?
			parallax: true,

		// Parallax factor (lower = more intense, higher = less intense).
			parallaxFactor: 5

	};

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1366px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function() {

		var $window = $(window),
			$body = $('body');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Off-Canvas Navigation.

			// Navigation Button.
				$(
					'<div id="navButton">' +
						'<a href="#navPanel" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						resetScroll: true,
						resetForms: true,
						side: 'top',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navPanel')
						.css('transition', 'none');

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (skel.vars.browser == 'ie'
				||	skel.vars.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				var $dummy = $(), $bg;

				$window
					.on('scroll.locus_parallax', function() {

						// Adjust background position.
						// Note: If you've removed the background overlay image, remove the "top left, " bit.
							$bg.css('background-position', 'top left, center ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');

					})
					.on('resize.locus_parallax', function() {

						// If we're in a situation where we need to temporarily disable parallax, do so.
						// Note: If you've removed the background overlay image, remove the "top left, " bit.
							if (skel.breakpoint('medium').active) {

								$body.css('background-position', 'top left, top center');
								$bg = $dummy;

							}

						// Otherwise, continue as normal.
							else
								$bg = $body;

						// Trigger scroll handler.
							$window.triggerHandler('scroll.locus_parallax');

					})
					.trigger('resize.locus_parallax');

			}

	});

})(jQuery);