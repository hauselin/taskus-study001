function myFunction() {
	// one formID for randomization form (id from EDIT page!)
	let editFormID = "19ZOaRVk8lzDi1SQnCUCkphFUYV8P6Vx1HKxn0ofykgY";  // taskus survey 1 (launchpad survey1) 

	// form actual urls for different sets for participants (surveys 2 onward)
	let formURLs = [
		"https://docs.google.com/forms/d/e/1FAIpQLSc_Hko0-DYBsv_DO3YV-GPaS4MPJuSJju3rjJrQJ4BJNg26iQ/viewform?usp=sf_link",
		"https://docs.google.com/forms/d/e/1FAIpQLScrcu0asnwy0BLp-GA2WLpbRwZFfmW1vFdpyJ5IRYf7ofrsLQ/viewform?usp=sf_link",
		"https://docs.google.com/forms/d/e/1FAIpQLSfA-tP6V1KlnG5lNHu6M9tJB2rlSiiy_m0zVHsnC9qYgKS6KQ/viewform?usp=sf_link",
		"https://docs.google.com/forms/d/e/1FAIpQLSdnTPXrRGerLvANWmDRbt9HaqzfpcELKMw_sEQAiKY2z--IOw/viewform?usp=sf_link",
		"https://docs.google.com/forms/d/e/1FAIpQLSccdfUt9_ZznUoDe--u-tk7L1IMMrxGxDB3HII-EknzM9pzSQ/viewform?usp=sf_link",
		"https://docs.google.com/forms/d/e/1FAIpQLSepEuQs-9p2-Owa3Zah9LUxgd7uQn5P5-Ivp7XhahSp648H1A/viewform?usp=sf_link",
		"https://docs.google.com/forms/d/e/1FAIpQLSfy1KHP1nVyf8dY3JYxEKjd6C6awMR9OGmR-cB2zp1Ho9HuPQ/viewform?usp=sf_link",
		"https://docs.google.com/forms/d/e/1FAIpQLSdPx5eP2Cd7SGdyw9gNMjADrZpbi2EkUTwwEn9fNdMiFcHUIA/viewform?usp=sf_link",
	];

	// assign survey/condition by minute
	const d = new Date();
	let minutes = d.getMinutes();

	// repeat formURLs 60 times (at least 1 for each minute)
	for (let i = 0; i < 60; i++) {
		formURLs.push(formURLs[(i) % formURLs.length]);
	}

	let formURL = formURLs[minutes];
	Logger.log(formURL);

	let form = FormApp.openById(editFormID);
	deleteTheFreakinForm(form)
	form.setShowLinkToRespondAgain(false);

	// change confirmation message dynamically
	form.setTitle("TaskUs Pilot Survey");
	form.setConfirmationMessage("Click/visit this link to begin: " + formURL);
	form.setDescription("Welcome to the pilot survey. Thanks for taking the time to complete it. To begin, click the Submit button below.");
}






function deleteTheFreakinForm(form) {

	//First, remove list item choices. Then delete the list items.

	var listItems = form.getItems(FormApp.ItemType.LIST);
	let itemIndex = 0;
	while (itemIndex < listItems.length) {
		listItems[itemIndex].asListItem().setChoiceValues(['']);
		form.deleteItem(listItems[itemIndex]);
		itemIndex++;
	}

	//Second, remove the multiple choice item choices. Then delete the multiple 
	//choice items.

	var multipleChoiceItems = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE);
	itemIndex = 0;
	while (itemIndex < multipleChoiceItems.length) {
		multipleChoiceItems[itemIndex].asMultipleChoiceItem().setChoiceValues(['']);
		form.deleteItem(multipleChoiceItems[itemIndex]);
		itemIndex++;
	}

	//Finally, delete the remaining form items.

	var items = form.getItems();
	itemIndex = 0;
	while (itemIndex < items.length) {
		form.deleteItem(items[itemIndex]);
		itemIndex++;
	}
}



