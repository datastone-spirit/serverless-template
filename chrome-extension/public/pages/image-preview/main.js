chrome.storage.local.get("Base64ImgData", (result) => {
	const data = result.Base64ImgData;
	if (data) {
		const img = document.createElement("img");
		img.src = data;
		document.body.appendChild(img);
	}
});
