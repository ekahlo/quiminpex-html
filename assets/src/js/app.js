jQuery(document).ready(function($) {

// call components
	$(function(){
			var includes = $('[data-include]');
			$.each(includes, function(){
				var file = $(this).data('include') + '.html';
				$(this).load(file);
		});
	});
});

// anime({
//   targets: '.css-selector-demo .el',
//   translateX: 250
// });

