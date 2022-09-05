var selectedID = "";
var mainText = document.getElementById('main-text');
var currentlySelectedButton = null;
mainText.addEventListener('input', function() {
	var scroll_height = mainText.scrollHeight;

	mainText.style.height = scroll_height + 'px';
});

function SaveDoc(id) {
    id = "1EqWilimO1NDqgoJ3zzUxW4c5NcATWxVNX4y2_jlz8uM";

    clearDriveDoc(id, () => {
        writeDriveDoc(id, 1, mainText.value, () => {console.log("YAHOOO, written")});
    })
}

function selectDoc(btn, id) {
    if (currentlySelectedButton != null) {
        currentlySelectedButton.classList.remove('selected');
    }
    currentlySelectedButton = btn;

    btn.classList.add('selected');

    var selectedDocText = getDriveDocText(id, (text) => {
        mainText.value = text;

        var scroll_height = mainText.scrollHeight;

        mainText.style.height = scroll_height + 'px';
    });
}