!function($){
	$(window).on('load', function(){
		var breakpoint = {"tablet": 550, "desktop":1200}

		// Set Sliders
		$('[data-slide=true]').each(function(){
			slide(this, 60, breakpoint);
		});

		// ransomize the order of Joe, Peter and Alan on the home page
		randomize($('.main-hero'), '.profile-wrapper');

		// Set backgrounds on elements
		$('[data-background]').each(function(){
			var t = $(this);
			backgroundImage(t, breakpoint.tablet)

			$(window).on('resize', function(){
				backgroundImage(t, breakpoint.tablet)
			});
		});
	});

//////////////  Define Functions  //////////////////////

	// slides a tartget  
	// accepts a jQuery object
	function slide(target, padding, breakpoint){
		var t = $(target),
			tH = t.height(),
			c = t.parent(),
			cP = c.position();

		minHeight(t, breakpoint.tablet)

		$(window).scroll(function(e){
			if ( $(window).outerWidth() > breakpoint.tablet ){
				var scroll = $(window).scrollTop(),
				cB = (cP.top + c.height());

			if(( scroll > cP.top) && ( scroll < (cB - tH - padding) ))
			{
				t.css({
					'top': scroll - cP.top + 'px'
				})
			} else if (scroll <= cP.top){
				t.css({
					'top': 0
				})
			}	
			}
		});

		function minHeight(target, breakpoint){
			if ( $(window).outerWidth() > breakpoint ){
				target.parent().css({'min-height': target.height() + (padding*5) + 'px'})
			} else {
				target.parent().css({'min-height': target.height() + padding + 'px'})
			}
		}
	}

	// sets the background of an element depending on the breakpoint
	// accepts a jQuery object and an int
	function backgroundImage(target, breakpoint){
		if ( $(window).outerWidth() > breakpoint ){
			var background = JSON.parse($(target).attr('data-background')),
				style = '';

			$.each(background, function(i, item){
				if(i === 'url'){
					target.css({"background-image": "url(" + item + ")"});
				}
				if(i === 'position'){
					target.css({"background-position": item });
				}
				if(i === 'size'){
					target.css({"background-size": item });
				}
				if(i === 'repeat'){
					target.css({"background-repeat": item });
				}
			});
		}
	};

	// Randomize: randomizes the order of targets within a container
	// accepts a jQuery object and a selector
	// example randomize($('.container'), '.randomize')
	function randomize(container, target){
		$.each(container, function(i, item){
			var t = $(item),
				targets = t.find(target),
				length = targets.length,
				random = function(t){ return Math.floor(Math.random() * t)};

			for (var i = 0; i < length; i++){
				var rand = random(length),
					move = $(targets[rand]).detach();

				t.prepend(move);
			}
		})
	};
}(jQuery)