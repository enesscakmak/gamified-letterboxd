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

document.addEventListener("DOMContentLoaded", function () {
	const addButton = document.getElementById("add-button");
	const dropdown = document.getElementById("add-dropdown");
	const addReviewWindow = document.getElementById("add-review-window");
	const closeAddReview = document.getElementById("close-add-review");

	addButton.addEventListener("click", function (e) {
		e.stopPropagation();
		dropdown.style.display =
			dropdown.style.display === "block" ? "none" : "block";
	});

	// Delegate dropdown button actions
	dropdown.addEventListener("click", function (e) {
		if (e.target.classList.contains("dropdown-btn")) {
			const action = e.target.getAttribute("data-action");
			if (action === "add-review") {
				addReviewWindow.style.display = "flex";
			}
			// Add more actions here as needed
			dropdown.style.display = "none";
		}
		e.stopPropagation();
	});

	// Hide dropdown when clicking outside
	document.addEventListener("click", function () {
		dropdown.style.display = "none";
		addReviewModal.style.display = "none";
	});

	// Close modal button
	if (closeAddReview) {
		closeAddReview.addEventListener("click", function (e) {
			addReviewWindow.style.display = "none";
			e.stopPropagation();
		});
	}
});
