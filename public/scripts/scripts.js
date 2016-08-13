!function($){
	$(window).on('load', function(){
		var breakpoint = {"tablet": 550, "desktop":1200}

		// Set Sliders
		$('[data-slide=true]').each(function(){
			slide(this, 60, breakpoint);
		});

		// ransomize the order of Joe, Peter and Alan on the home page
		randomize('.founders', '.founder');

		$('.sidebar-nav-link').click(function(){
			$("#menu-close").click();
		})

		 // Closes the sidebar menu
	    $("#menu-close").click(function(e) {
	        e.preventDefault();
	        $("#sidebar-wrapper").toggleClass("active");
	    });

	    // Opens the sidebar menu
	    $("#menu-toggle").click(function(e) {
	        e.preventDefault();
	        $("#sidebar-wrapper").toggleClass("active");
	    });

	    // Scrolls to the selected menu item on the page
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
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

	// Randomize: randomizes the order of targets within a container
	// accepts a selector for the container and a selector for the targets
	// example randomize('.container', '.target')
	function randomize(container, target){
		$(container).each(function(i, item){
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