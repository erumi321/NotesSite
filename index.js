document.getElementById("main-text").addEventListener('input', function() {
	var scroll_height = document.getElementById("main-text").scrollHeight;

	document.getElementById("main-text").style.height = scroll_height + 'px';
});

function SaveDoc(id) {
    id = "1EqWilimO1NDqgoJ3zzUxW4c5NcATWxVNX4y2_jlz8uM";

	console.log(document.getElementById('main-text').value);

    clearDriveDoc(id, () => {
        writeDriveDoc(id, 1, document.getElementById('main-text').value, () => {console.log("YAHOOO, written")});
    })
}