document.addEventListener("DOMContentLoaded", function () {
	// Search toggle logic
	const toggle = document.querySelector(".search_toggle");
	const input = document.querySelector(".search_input");
	if (toggle && input) {
		toggle.addEventListener("click", function () {
			toggle.style.display = "none";
			input.style.display = "block";
			input.focus();
		});
		input.addEventListener("blur", function () {
			input.style.display = "none";
			toggle.style.display = "flex";
		});
	}

	// Add button and dropdown logic
	const addButton = document.getElementById("add-button");
	const dropdown = document.getElementById("add-dropdown");
	const addReviewWindow = document.getElementById("add-review-window");
	const closeAddReview = document.getElementById("close-add-review");

	if (addButton && dropdown) {
		addButton.addEventListener("click", function (e) {
			e.stopPropagation();
			dropdown.style.display =
				dropdown.style.display === "block" ? "none" : "block";
		});
	}

	// Delegate dropdown button actions
	if (dropdown) {
		dropdown.addEventListener("click", function (e) {
			if (e.target.classList.contains("dropdown-btn")) {
				const action = e.target.getAttribute("data-action");
				if (action === "add-review" && addReviewWindow) {
					addReviewWindow.style.display = "flex";
				}
				dropdown.style.display = "none";
			}
			e.stopPropagation();
		});
	}

	// Hide dropdown and modal when clicking outside
	document.addEventListener("click", function () {
		if (dropdown) dropdown.style.display = "none";
		if (addReviewWindow) addReviewWindow.style.display = "none";
	});

	// Prevent closing when clicking inside the modal
	if (addReviewWindow) {
		addReviewWindow.addEventListener("click", function (e) {
			e.stopPropagation();
		});
	}

	// Close modal button
	if (closeAddReview && addReviewWindow) {
		closeAddReview.addEventListener("click", function (e) {
			addReviewWindow.style.display = "none";
			e.stopPropagation();
		});
	}

	// Date picker logic
	const dateBtn = document.getElementById("date-pick-btn");
	const hiddenDateInput = document.getElementById("hidden-date-input");

	if (dateBtn && hiddenDateInput) {
		const today = new Date();
		const yyyy = today.getFullYear();
		const mm = String(today.getMonth() + 1).padStart(2, "0");
		const dd = String(today.getDate()).padStart(2, "0");
		hiddenDateInput.value = `${yyyy}-${mm}-${dd}`;

		const formatted = today
			.toLocaleDateString("en-GB", {
				day: "2-digit",
				month: "short",
				year: "numeric",
			})
			.replace(/ /g, " ");
		dateBtn.textContent = formatted;

		dateBtn.addEventListener("click", function (e) {
			e.stopPropagation();
			if (hiddenDateInput.showPicker) {
				hiddenDateInput.showPicker();
			} else {
				hiddenDateInput.click();
			}
		});

		hiddenDateInput.addEventListener("change", function () {
			const selected = new Date(this.value);
			const formatted = selected
				.toLocaleDateString("en-GB", {
					day: "2-digit",
					month: "short",
					year: "numeric",
				})
				.replace(/ /g, " ");
			dateBtn.textContent = formatted;
		});
	}

	// SVG Half-Star Rating logic
	const starContainer = document.getElementById("star-rating-svg");
	const starValue = document.getElementById("star-rating-value");
	const starInput = document.getElementById("star-rating-input");
	let currentRating = 2.5;

	function updateStars(rating) {
		const halves = starContainer.querySelectorAll(".star-half");
		halves.forEach((half) => {
			const val = parseFloat(half.getAttribute("data-value"));
			if (val <= rating) {
				half.classList.add("filled");
			} else {
				half.classList.remove("filled");
			}
		});
		if (starValue) starValue.textContent = rating;
		if (starInput) starInput.value = rating;
	}

	if (starContainer) {
		starContainer.addEventListener("mousemove", function (e) {
			if (e.target.classList.contains("star-half")) {
				updateStars(parseFloat(e.target.getAttribute("data-value")));
			}
		});
		starContainer.addEventListener("mouseleave", function () {
			updateStars(currentRating);
		});
		starContainer.addEventListener("click", function (e) {
			if (e.target.classList.contains("star-half")) {
				currentRating = parseFloat(e.target.getAttribute("data-value"));
				updateStars(currentRating);
			}
		});
		updateStars(currentRating);
	}
});
