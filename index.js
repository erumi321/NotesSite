document.getElementById("main-text").addEventListener('input', function() {
	var scroll_height = document.getElementById("main-text").scrollHeight;

	document.getElementById("main-text").style.height = scroll_height + 'px';
});