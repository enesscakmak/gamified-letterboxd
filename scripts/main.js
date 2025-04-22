document.addEventListener("DOMContentLoaded", function () {
	const toggle = document.querySelector(".search_toggle");
	const input = document.querySelector(".search_input");
	toggle.addEventListener("click", function () {
		toggle.style.display = "none";
		input.style.display = "block";
		input.focus();
	});
	input.addEventListener("blur", function () {
		input.style.display = "none";
		toggle.style.display = "flex";
	});
});
