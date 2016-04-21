/*global createjs*/

function tocaAudio(id) {
	var timeout = 0;
	if (id === "porta-fechando" || id === "todas-portas-fechando") {
		timeout = 400;
	}
	setTimeout(function () { createjs.Sound.play(id); }, timeout);
}