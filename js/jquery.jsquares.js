/*
 * jSquares for jQuery
 * http://boedesign.com/
 *
 * Copyright (c) 2009-2011 Jordan Boesch
 * Dual licensed under the MIT and GPL licenses.
 *
 * Date: Sept 20, 2011
 * Version: 1.4
 *
 */
(function($) {
	
	// If the hoverIntent plugin is not included, tell them
    if(typeof $.fn.hoverIntent !== 'function')
    {
        throw "You need to include jquery.hoverintent.min.js to use jSquares.";
    }

    /**
	* Initialize and setup plugin
	* @param {Object} options The set of options to pass to over-write the defaults
	*/
	$.fn.jsquares = $.fn.jSquares = function(options){

		// General
		var main = this,
			image_counter = 0,
			dropin_int = 0,
		
			// Set up the default options
			defaults = { 
		
				// Public 
				image: '.js-image', // target (div) holding info
				caption: '.js-small-caption', // target caption
				caption_overlay_spacing: 12, // caption overlay padding/spacing... sort of
				caption_width: 400, // caption overlay width
				caption_height:130, // caption overlay height
				fade_to: .3, // fade image/caption to what..
				fade_start: 1, // send image back to...
				fade_speed: 'fast', // int or string: anytime the fade effect is used, how fast should it be
				shuffle_in: true, // have the pictures all fade in on page load?
				shuffle_in_speed: 130, // how long to wait before we fade in the next image on page load
				fade_on_hover: true, // do we want the images to fade on hover or just change opacity?
				caption_slide_down: true, // do we want the caption to slide down or just appear?
				caption_slidedown_speed: 'fast', // how fast to slidedown the caption
				
				// Overwrite at your own risk! (more-so private)
				_fade_selectors_on_hover: 'img, .js-small-caption span',
				_overlay_selector_class: 'js-caption-overlay'
				
			},
		
			// Now overwrite the default options with the ones passed in
			options = $.extend(defaults, options),
			$image = $(options.image, main),
			$image_children = $image.find(options._fade_selectors_on_hover),
			window_width = $(window).width();
		
		// Adjust the var is people resize!
		$(window).resize(function(){
			window_width = $(window).width();
		});
			
		/**
		* Custom functions called on the hover events
		* @private
		* @param {Object} e The element that's being revealed
		* @param {Integer} i The index of that element in the array stack
		* @param {Object} evt The type of event that's being performed
		*/
		function _revealBinds(e, i, evt){
			_caption(i);
			_fadeInOutImage('in', options.fade_to, i);
		}
		
		/**
		* Determine whether we are fading in or fading out, hide/reveal images
		* @private
		* @param {String} in_out If we are fading an element in or we're fading all out
		* @param {Integer} opacity_val Bring the opacity to a certain value
		* @param {Integer} i The index of the element in the array stack
		*/
		function _fadeInOutImage(in_out, opacity_val, i){
			
			var chain = (in_out == 'in') ? 
				$image.not(':eq(' + i + ')').find(options._fade_selectors_on_hover) :
				$image_children;
			
			(options.fade_on_hover) ? 
				$(chain).stop(true, false).fadeTo(options.fade_speed, opacity_val) :
				$(chain).css('opacity', opacity_val);
		
		}
		
		/**
		* Display the caption
		* @private
		* @param {Integer} index The index of the element in the array stack
		*/
		function _caption(index){
			
			$('.' + options._overlay_selector_class).remove(); // remove any stray captions
			
			var $current_image = $(options.image + ':eq(' + index + ')', main),
				overlay_sett = _getCaptionSettings($current_image),
				contents = $current_image.find('.js-overlay-caption-content').html() || '',
				caption_options = (options.caption_slide_down) ? { display: 'none' } : {};
			
			// wrap it appropriately with an image etc.
			if(contents){
			
				var conts = contents,
					img = $current_image.find('img'),
					// if the image is wrapped in an anchor, link the image on the overlay as well
					a = img.parent().attr('href') || '',
					wrap_a_start = (a != '') ? '<a href="' + a + '">' : '',
					wrap_a_end = (a != '') ? '</a>' : '';
				
				contents = wrap_a_start + '<img src="' + img.attr('src')  + '" class="js-overlay-image" />' + wrap_a_end;
				contents += '<div class="js-overlay-html">' + conts + '</div><div style="clear:both"></div>';
				
			}
			
			var caption_options = $.extend({
				top: overlay_sett.y,
				left: overlay_sett.x,
				width: overlay_sett.width,
				height: overlay_sett.height
			}, caption_options); 
			
			// draw the caption	
			$('<div id="js-overlay-id-' + index + '">' + contents + '</div>')
			.css(caption_options)
			.addClass(options._overlay_selector_class)
			.appendTo('body')
			.bind('mouseleave',
				function(){
					_fadeInOutImage('out', options.fade_start)
					$('#js-overlay-id-' + index).remove();
				}
			);
			
			if(options.caption_slide_down){
				$('#js-overlay-id-' + index).slideDown(options.caption_slidedown_speed)
			}
			
		}
		
		/**
		* Determines where the caption should be positioned
		* @private
		* @param {Object} image The jQuery element that we need to get dimensions/location for
		*/
		function _getCaptionSettings(image){
			
			var loc = _elementLocation($(image));
			var loc_x = loc.x - options.caption_overlay_spacing;
			var loc_y = loc.y - options.caption_overlay_spacing;
			
			var img_height = options.caption_height + (options.caption_overlay_spacing * 2);
			var img_width = options.caption_width + (options.caption_overlay_spacing * 2); 
			
			var check_window_width = loc_x + img_width + (options.caption_overlay_spacing * 2);
			
			// Do we need to open the overlay in the opposite direction?
			if(check_window_width >= window_width){
				var hard_img_width = $(image).outerWidth();
				loc_x = loc_x - (options.caption_width + (options.caption_overlay_spacing * 2)) + hard_img_width;
			}
			
			return { x: loc_x, y: loc_y, width: img_width, height: img_height }; 
			
		}
		
		/**
		* If they chose to have the effect slide down, run it here
		* @private
		* @param {Array} images An array of all images in the stack
		*/
		function _setImageTimeoutSlideDown(images){
			
			var images = _shuffle(images);
			
			dropin_int = setInterval(function(){
				
				if(image_counter == images.length){
					clearInterval(dropin_int);
					return false;
				}
				
				var $img = $(options.image + ':eq(' + images[image_counter] + ')', main)
				var img_height = $img.height();
				$img.fadeIn(options.fade_speed);
				image_counter++
				
			}, options.shuffle_in_speed);
			
			
		}
		
		/**
		* Calculate the position of the element on the page
		* @private
		* @param {Object} obj The jQuery element that we want the position of
		*/
		function _elementLocation(obj){
		
			var curleft = 0;
			var curtop = 0;
			  
			do {
                var offset = obj.position();
				curleft += offset.left;
				curtop += offset.top;
				obj = obj.offsetParent();
			} while (obj[0].tagName.toLowerCase() !== 'body');

			return { x:curleft, y:curtop };
			
		}
		
		/**
		* Give an array a random order
		* @private
		* @param {Array} v An array of images that we mix and return a random order for when they shuffle in
		*/
		function _shuffle(v){
		    
		    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
		    return v;
		    
		};

		
		// Run the process of revealing/hiding captions
		return this.each(function() {
			
			// Hide all the images off the start and push them into an array
			var images = [];
			$image.each(function(i){ $(this).hide(); images.push(i); });
    		
			// Run the effect of sliding down?
			(options.shuffle_in) ? _setImageTimeoutSlideDown(images) : $image.show();
    		
			// Add hover action for each image 
			$image.each(function(i){

                $(this).hoverIntent(
                    function(evt){ _revealBinds(this, i, evt); },
                    function(evt){  }
                );
			});
    		
		});
		
		
	};
	
})(jQuery);                                                  