# jQuery SW Transition
Yet another jQuery transition plugin.

SW Transition allows elements to transition in to frame in a multitude of different methods. It's kinda like PowerPoint transitions, but not stupid.

Target a single element for transition or transition multiple children elements by using HTML classes to dictate the plugin parameters.

## Usage
### Class Based
	$(window).load(function(){
		$('#myElement').swTransition({
			'method' : 'class',
			'container_width' : 1100
		});
	});