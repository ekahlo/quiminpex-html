$(document).ready(function() {
    $('.js-boxes').select2({ theme: 'bootstrap' });
	$("#header .js-boxes").select2({
	    minimumResultsForSearch: Infinity
	});
	$("#order .js-boxes").select2({
	    minimumResultsForSearch: Infinity
	});
	$("#top-menu .js-boxes").select2({
	    minimumResultsForSearch: Infinity
	});
});

