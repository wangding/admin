$(() => {
	$form = $('form');
	
	$form.onsubmit(() => {
		$form.preventDefault();
		alert('hello');
	});
});