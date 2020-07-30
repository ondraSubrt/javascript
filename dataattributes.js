var nodeOfDownloadButtons =  document.querySelectorAll("a[href*='download-thank-you.php'], a[href*='/download'], a[href*='play.google.com'], a[href*='apps.apple.com']");
var nodeOfBuyButtons =  document.querySelectorAll("a[href*='ipm.store.avast.com'], a[href*='store.avast.com'], a[href*='ipm.store-sl.avast.com'],	a[href*='store-nw.avast.com'], a[href*='store-sl.avast.com'],	a[href*='ipm.store-ap.avast.com'], a[href*='store-cb.avast.com'],	a[href*='ipm.store-cb.avast.com'],	a[href*='shop.avg.com'], a[href*='checkout.hidemyass.com'], a[href*='/pricing']");
var listOfDownloadButtons = Array.from(nodeOfDownloadButtons);
var listOfBuyButtons = Array.from(nodeOfBuyButtons);
var downloadAttributes = ["data-role", "data-download-name"]; // optional attributes "data-os", "data-cta"
var buyAttributes = ["data-role", "data-product-id", "data-product-category", "data-seats", "data-maintenance", "data-campaign", "data-campaign-marker"]; // optional attrbutes

for (var i = 0; i < listOfDownloadButtons.length; i++) {
	listOfDownloadButtons[i].childNodes[0].textContent =  " Download [" + i + "] - " + listOfDownloadButtons[i].childNodes[0].textContent;
	console.group("\n %c Download Button " + i + ": ", 'background: #006400; color: #FFF; font-size: 17px');
	console.log(listOfDownloadButtons[i].childNodes[0].textContent);


	for (var j = 0; j < downloadAttributes.length; j++) {
		if (listOfDownloadButtons[i].hasAttribute(downloadAttributes[j])) {
			if(listOfDownloadButtons[i].attributes[downloadAttributes[j]].value != ""){
				console.log("  - " + downloadAttributes[j] + ": " + listOfDownloadButtons[i].attributes[downloadAttributes[j]].value );
			} else {
				console.log("  - " + downloadAttributes[j] + ": " + "%c is Missing Value",'color: #FF9933;');
			}
		} else {
			console.log("%c  - " + downloadAttributes[j] + ": " + "Missing Attribute", 'color: #FF0000;' );
		}
	}

	console.log(listOfDownloadButtons[i]);
	console.groupEnd();
}

for (var i = 0; i < listOfBuyButtons.length; i++) {
	listOfBuyButtons[i].childNodes[0].textContent =  "Buy [" + i + "] - " + listOfBuyButtons[i].childNodes[0].textContent;
	console.group("\n %c Buy Button " + i + ": ", 'background: #006400; color: #FFF; font-size: 17px');
	console.log(listOfBuyButtons[i].childNodes[0].textContent);


	for (var j = 0; j < buyAttributes.length; j++) {
		if (listOfBuyButtons[i].hasAttribute(buyAttributes[j])) {
			if(listOfBuyButtons[i].attributes[buyAttributes[j]].value != ""){
				console.log("  - " + buyAttributes[j] + ": " + listOfBuyButtons[i].attributes[buyAttributes[j]].value );
			} else {
				console.log("  - " + buyAttributes[j] + ": " + "%c is Missing Value",'color: #FF9933;' );
			}
		} else {
			console.log("%c  - " + buyAttributes[j] + ": " + "Missing Attribute", 'color: #FF0000;' );
		}
	}
	console.log(listOfBuyButtons[i]);
	console.groupEnd();
}
