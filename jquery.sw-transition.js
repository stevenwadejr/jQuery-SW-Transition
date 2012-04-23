(function($){
	$.fn.swTransition = function(options) {
	
		var settings = $.extend({
      'method'								: 'direct',
      'container_width'				:	1000,
      'transition_duration'		: 1000,
      'effect'								: 'fadeIn',
      'delay'									: 0,
      'speed'									: 1000,
      'hold'									: 0,
      'alpha'									: '0.1'
    }, options);
	
		//this.css('display', 'block');
		
		if(settings.method == 'direct')
		{
			
		}
		else if(settings.method == 'class')
		{
			this.find('.transition').each(function(){
				var classes = $(this).attr('class').split(' ');
				var delay, speed, hold, alpha;
				
				if(searchStringInArray(classes, 'effect') >= 0)
				{
					settings.effect = classes[searchStringInArray(classes, 'effect')].replace('effect-', '');
				}
				if(searchStringInArray(classes, 'delay') >= 0)
				{
					delay = classes[searchStringInArray(classes, 'delay')].replace('delay-', '');
					settings.delay = delay * 1000;
				}
				if(searchStringInArray(classes, 'speed') >= 0)
				{
					speed = classes[searchStringInArray(classes, 'speed')].replace('speed-', '');
					settings.speed = speed * 1000;
				}
				if(searchStringInArray(classes, 'hold') >= 0)
				{
					hold = classes[searchStringInArray(classes, 'hold')].replace('hold-', '');
					settings.hold = hold * 1000;
				}
				if(searchStringInArray(classes, 'alpha') >= 0)
				{
					alpha = classes[searchStringInArray(classes, 'alpha')].replace('alpha-', '');
					settings.alpha = '0.' + alpha;
				}
				
				performEffect(this);
				
			});//end each
		}//end if
		
		function performEffect(obj)
		{
			switch(settings.effect)
			{
				case 'fadeIn' :
					if($.browser.msie && $.browser.version <= 8.0) // Work around for Internet Explorer's trouble with transparent PNGs
					{
						$(obj).show();
					}
					else
					{
						$(obj).delay(settings.delay).fadeIn(settings.speed);
					}
					break;
				case 'slideLeft' :
					var oX = $(obj).css('left');
					$(obj)
					.css({
						left: (settings.container_width + 1),
						display: 'block'
					})
					.delay(settings.delay)
					.animate({
						left: oX
					}, settings.speed);
					break;
				case 'slideRight' :
					var oX = $(obj).css('left');
					$(obj)
					.css({
						left: (0 - $(obj).width()),
						display: 'block'
					})
					.delay(settings.delay)
					.animate({
						left: oX
					}, settings.speed);
					break;
				case 'slideDown' :
					var oY = $(obj).css('top');
					$(obj)
					.css({
						top: (0 - $(obj).height()),
						display: 'block'
					})
					.delay(settings.delay)
					.animate({
						top: oY
					}, settings.speed);
					break;
				case 'zoomIn' :
					var oH = $(obj).height();
					var oW = $(obj).width();
					var oX = $(obj).css('left');
					var oY = $(obj).css('top');
					oX = Number(oX.replace('px', ''));
					oY = Number(oY.replace('px', ''));
					$(obj)
					.css({
						height: 0,
						left: (oX + Math.round(oW/2)),
						top: (oY + Math.round(oH/2)),
						width: 0,
						display: 'block'
					})
					.delay(settings.delay)
					.animate({
						height: oH,
						left: oX,
						top: oY,
						width: oW
					}, settings.speed);
					break;
				case 'panLeft' :
					var width = $(obj).width();
					var destX = width - settings.container_width;
					$(obj).fadeIn(slide_trans_duration, function(){
						$(obj)
						.css({
							display: 'block'
						})
						.animate({
							left: -(destX)
						},{
							duration: settings.speed, 
							easing: 'easeInOutQuad',
							complete: function(){
								$(obj).fadeOut(slide_trans_duration);
							}
						});
					});
					break;
				case 'panLeftNoFade' :
					var width = $(obj).width();
					var destX = width - settings.container_width;
					$(obj).fadeIn(slide_trans_duration, function(){
						$(obj)
						.css({
							display: 'block'
						})
						.animate({
							left: -(destX)
						},{
							duration: settings.speed, 
							easing: 'easeInOutQuad',
							complete: function(){
								if($(obj).hasClass('can-scroll'))
								{
									var imgPos = $(obj).parent().offset();
									var imgWidth = $(obj).width();
									var leftOver = imgWidth - settings.container_width;
									var x1 = imgPos.left + (-leftOver);
									var x2 = imgPos.left;
									$(obj).draggable({axis: 'x', containment: [x1, 0, x2, 0]}).css('cursor', 'move');
								}
							}
						});
					});
					break;
				case 'panRight' :
					var width = $(obj).width();
					var destX = width - settings.container_width;
					$(obj).fadeIn(slide_trans_duration, function(){
						$(obj)
						.css({
							display: 'block'
						})
						.animate({
							left: 0
						},{
							duration: settings.speed, 
							easing: 'easeInOutQuad',
							complete: function(){
								$(obj).fadeOut(slide_trans_duration);
							}
						});
					});
					break;
				case 'fadeInOut' :
					$(obj).delay(settings.delay).fadeIn(settings.speed);
					var self = $(obj);
					setTimeout(function(){
						$(self).fadeOut(settings.speed);
					}, settings.hold);
					break;
				case 'fadeInOutTo' :
					$(obj).delay(settings.delay).fadeIn(settings.speed);
					var self = $(obj);
					setTimeout(function(){
						$(self).animate({
							opacity: settings.alpha
						}, settings.speed);
					}, settings.hold);
					break;
				case 'scrollToTop' :
					$(obj).delay(settings.delay).fadeIn(settings.speed);
					var self = $(obj);
					setTimeout(function(){
						$(self).animate({
							top: '-212px'
						}, 6000);
					}, settings.speed);
					break;
			}
		}
	
		function searchStringInArray(stringArray, string)
		{
		  for (var j=0; j<stringArray.length; j++) {
		      if (stringArray[j].match (string)) return j;
		  }
		  return -1;
		}
			
	};
})(jQuery);