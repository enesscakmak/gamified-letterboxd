// import "cally";

document.addEventListener("DOMContentLoaded", function () {
	// Search input toggle
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
	// Add dropdown and review window logic
	const addButton = document.getElementById("add-button");
	const dropdown = document.getElementById("add-dropdown");
	const addReviewWindow = document.getElementById("add-review-window");
	const closeAddReview = document.getElementById("close-add-review");
	const textareas = document.querySelectorAll(".review-textarea");

	addButton.addEventListener("click", function (e) {
		e.stopPropagation();
		dropdown.style.display =
			dropdown.style.display === "block" ? "none" : "block";
	});

	dropdown.addEventListener("click", function (e) {
		if (e.target.classList.contains("dropdown-btn")) {
			const action = e.target.getAttribute("data-action");
			if (action === "add-review") {
				addReviewWindow.style.display = "flex";
			}
			dropdown.style.display = "none";
		}
		e.stopPropagation();
	});

	document.addEventListener("click", function () {
		dropdown.style.display = "none";
		addReviewModal.style.display = "none";
	});

	if (closeAddReview) {
		closeAddReview.addEventListener("click", function (e) {
			addReviewWindow.style.display = "none";
			e.stopPropagation();
		});
	}

	textareas.forEach(function (textarea) {
		textarea.addEventListener("input", function () {
			this.style.height = "auto";
			this.style.height = this.scrollHeight + "px";
		});
	});
});

document.addEventListener("DOMContentLoaded", function () {
	// Date picker logic
	const dateBtn = document.getElementById("date-picker-btn");
	const dateLabel = document.getElementById("date-picker-label");
	const calendar = document.getElementById("calendar-date");
	const popover = document.getElementById("cally-popover1");

	function formatDate(date) {
		const months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
	}

	// Set today's date on load
	const today = new Date();
	dateLabel.textContent = formatDate(today);
	calendar.value = today.toISOString().slice(0, 10);

	// Position popover when clicking the button
	dateBtn.addEventListener("click", function (e) {
		e.stopPropagation();
		if (popover) {
			const rect = dateBtn.getBoundingClientRect();
			popover.style.display = "block";
			popover.style.position = "absolute";
			popover.style.left = rect.left + window.scrollX + "px";
			popover.style.top = rect.bottom + window.scrollY + "px";
			popover.style.zIndex = 2000;
		}
	});

	// Update label and close popover when a date is picked
	calendar.addEventListener("change", function () {
		const selected = new Date(calendar.value);
		dateLabel.textContent = formatDate(selected);
		popover.style.display = "none";
	});

	// Close popover when clicking outside
	document.addEventListener("click", function (e) {
		if (!popover.contains(e.target) && e.target !== dateBtn) {
			popover.style.display = "none";
		}
	});
});
