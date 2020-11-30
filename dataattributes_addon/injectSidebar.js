(function createSidebar(){
    var sidebarWidth = window.innerWidth-600 + "px";
    console.log(sidebarWidth);
    var new_div = document.createElement("div");
    new_div.id = "sidebarDivFirst";
    new_div.className = "sidebar";
    new_div.style.width = "600px";
    // create div which will have all body inside andd then create another one for sidebar
    //document.querySelectorAll(".js-navigation-bootstrap")[0].style.width = sidebarWidth;
    //document.querySelectorAll("#main-content")[0].style.width = sidebarWidth;
    if (document.querySelectorAll(".sticky-bar").length > 0){    
        document.querySelectorAll(".sticky-bar")[0].style.width = sidebarWidth;
    }
    //new_div.innerHTML = "<table><tbody><tr><td>first</td><td>second</td><td>third</td><td>fourth</td></tr></tbody></table>"
    var first = document.body.firstChild;
    first.parentNode.insertBefore(new_div, first);
    
})();

/* trying to show link to button only on visible buttons */

function renderButton(type, index, buttonId){
    if (type == "download"){
        var bttn = "dl";
    } else if (type == "buy"){
        var bttn = "buy";
    }
    var divs = document.getElementsByTagName("div");
    for (var r = 0; r < divs.length; r++) {
        if (divs[r].id == bttn + "-" + index) { 
            if (window.getComputedStyle(divs[r]).display !== "none" && window.getComputedStyle(divs[r]).visibility !== "hidden") {
                if (divs[r].getBoundingClientRect().x * divs[r].getBoundingClientRect().x != 0){
                    var linkToButton = document.createElement("div");
                    linkToButton.classList.add("link-to-button-label");
                    linkToButton.innerHTML = "<button onclick=document.getElementById('" + bttn + "-" + index + "').scrollIntoView()>to the button</button>";
                    console.log(divs[r]);
                    return document.querySelectorAll("#" + buttonId)[0].appendChild(linkToButton);    
                }    
            }
        }
    }
} 


// Dodělat - https://stackoverflow.com/questions/32644906/accessing-all-the-window-variables-of-the-current-tab-in-chrome-extension
(function _getDataLayer(){
    var dL = document.createElement("script");
    var hackScript = 
    `var originalDl = window.dataLayer;
    var dlParams = ['contentGroup', 'pageGroup', 'pageId', 'contentLocale'];
    var outputJSON = {};
    for (var m = 0; m < originalDl.length; m++) {
        for (let n = 0; n < dlParams.length; n++) {
            if(originalDl[m].hasOwnProperty(dlParams[n])){
                outputJSON[dlParams[n]] = originalDl[m][dlParams[n]];
            }
            
        }
 
    }
    outputJSON.gaId = Object.keys(gaData)[0];
    var hiddenDiv = document.createElement('div');
    hiddenDiv.style.visibility = 'hidden';
    hiddenDiv.textContent = JSON.stringify(outputJSON);
    hiddenDiv.id = 'dlHack';
    document.body.appendChild(hiddenDiv);`
    var scriptDl = document.createTextNode(hackScript);
    dL.appendChild(scriptDl);
    document.body.appendChild(dL);
    
    var dataLayerJSON = JSON.parse(document.querySelectorAll("#dlHack")[0].textContent);
    console.log("this is a DL: ");  
    console.log(dataLayerJSON);
      
    var params = ["contentGroup", "pageGroup", "pageId", "contentLocale", "gaId"];
    var property = document.createElement("div");
    property.id = "dataLayerValues";
    property.classList.add("sidebar-div-dl");
    property.innerHTML = "<h3>dataLayer Values</h3>";
    document.querySelectorAll("#sidebarDivFirst")[0].appendChild(property);
    for (var l = 0; l < params.length; l++) {
        if (dataLayerJSON.hasOwnProperty(params[l])){
            var hasProperty = document.createElement("li");
            hasProperty.classList.add("has-attribute-dl");
            hasProperty.innerText = params[l] + ": " + dataLayerJSON[params[l]];
            document.querySelectorAll("#dataLayerValues")[0].appendChild(hasProperty); 
        } else {
            var hasProperty = document.createElement("li");
            hasProperty.classList.add("no-attribute-dl");
            hasProperty.innerText = params[l] + ": " + "is missing";
            document.querySelectorAll("#dataLayerValues")[0].appendChild(hasProperty); 
        }
           
    } 
    var hasProperty = document.createElement("li");
    hasProperty.classList.add("has-attribute-dl");
    hasProperty.innerText = "GTM ID: " + document.querySelectorAll('script[src*="googletagmanager"]')[0].getAttribute("src").split("=")[1];
    document.querySelectorAll("#dataLayerValues")[0].appendChild(hasProperty); 
})();

function check(cla){
    return cla.includes("no-attribute");
}
    
function allDownloadsBuys(buttonType) { // vymazat labely ve stránce
    var hidden = document.querySelectorAll(".sidebar-div.hidden");
    for (var s = 0; s < hidden.length; s++) {
        hidden[s].classList.remove("hidden");       
    }

    var allLabels = document.querySelectorAll('div[class*="button-label-"]');
    for (var s = 0; s < allLabels.length; s++) {
        allLabels[s].classList.remove("hidden");       
    }

    var listOfBoxes = document.querySelectorAll(".sidebar-div");
    for (var s = 0; s < listOfBoxes.length; s++) {
        if (listOfBoxes[s].id.includes(buttonType)){
            listOfBoxes[s].classList.add("hidden");
        } 
    }
    var listOfLabels = document.querySelectorAll(".button-label-" + buttonType);
    for (var s = 0; s < listOfLabels.length; s++) {
        if (buttonType == "download"){
            if (listOfLabels[s].id.includes("dl-")){
                listOfLabels[s].classList.add("hidden");
            } 
        } else {
            if (listOfLabels[s].id.includes("buy-")){
                listOfLabels[s].classList.add("hidden");
            } 
        }
        
    }
}

function filterErrors() {
    var listOfErrorBoxes = document.querySelectorAll(".sidebar-div");
    for (var s = 0; s < listOfErrorBoxes.length; s++) {
        var listOfDivs = listOfErrorBoxes[s].querySelectorAll("li");   
        var cl = [];
        for (var t = 0; t < listOfDivs.length; t++) {
            cl.push(listOfDivs[t].className); 
        }
        console.log(cl);
        if (cl.some(check) == false) {
            console.log(listOfErrorBoxes[s])
            listOfErrorBoxes[s].classList.add("hidden");
            console.log(listOfErrorBoxes[s].style)
        }
    }
}

function showAll() {
    var listOfErrorBoxes = document.querySelectorAll(".sidebar-div.hidden");
    for (var s = 0; s < listOfErrorBoxes.length; s++) {
        listOfErrorBoxes[s].classList.remove("hidden");       
    }
    var allLabels = document.querySelectorAll('div[class*="button-label-"]');
    for (var s = 0; s < allLabels.length; s++) {
        allLabels[s].classList.remove("hidden");       
    }
}

(function _getAllButtons(){
    var nodeOfDownloadButtons = document.querySelectorAll("a[href*='download-thank-you.php'], a[href*='/download'], a[href*='play.google.com'], a[href*='apps.apple.com']");
    var nodeOfBuyButtons =  document.querySelectorAll("a[href*='ipm.store.avast.com'], a[href*='store.avast.com'], a[href*='ipm.store-sl.avast.com'],	a[href*='store-nw.avast.com'], a[href*='store-sl.avast.com'],	a[href*='ipm.store-ap.avast.com'], a[href*='store-cb.avast.com'],	a[href*='ipm.store-cb.avast.com'],	a[href*='shop.avg.com'], a[href*='checkout.hidemyass.com'], a[href*='/pricing']");
    var listOfDownloadButtons = Array.from(nodeOfDownloadButtons);
    var listOfBuyButtons = Array.from(nodeOfBuyButtons);
    var downloadAttributes = ["data-role", "data-download-name"]; // optional attributes "data-os", "data-cta"
    var buyAttributes = ["data-role", "data-product-id", "data-product-category", "data-seats", "data-maintenance", "data-campaign", "data-campaign-marker"]; // optional attrbutes

    var menuButtons = document.createElement("div");
    menuButtons.id = "menuButtons";
    menuButtons.classList.add("menu-table");
    menuButtons.innerHTML = "<table><tbody><tr><td><a href='#' id='allButtons'><div>All buttons</div></a></td><td><a href='#' id='errorButtons'><div>Buttons with error</div></a></td><tr><td><a href='#' id='allDownloadButtons'><div>All download buttons</div></a></td><td><a href='#' id='allBuyButtons'><div>All buy buttons</div></a></td></tbody></table>";
    document.getElementById("sidebarDivFirst").appendChild(menuButtons);

    if (!document.getElementById("more-options")){
        var moreOptionsDiv = document.createElement("div");
        moreOptionsDiv.id = "more-options";
        moreOptionsDiv.classList.add("more-options");
        moreOptionsDiv.innerHTML = "<input type='checkbox' id='visible-on-page' name='visible-on-page' value='visible'><label for='visible-on-page'> Show buttons visible on page only</label>";
        document.getElementById("menuButtons").appendChild(moreOptionsDiv);
    }    
    
    var moreOptionsInputVisible = document.querySelector("input[name=visible-on-page]");;
    moreOptionsInputVisible.addEventListener( 'change', function() {
        var sidebarDivs = document.querySelectorAll(".sidebar-div");
        if(this.checked) {
            sidebarDivs.forEach(function(sidebarDiv) {
                if (sidebarDiv.getElementsByTagName("button").length == 0){
                    sidebarDiv.classList.add("hide-non-visible");
                }
            });
        } else {
            sidebarDivs.forEach(function(sidebarDiv) {
                if(sidebarDiv.className.includes("hide-non-visible")){
                    sidebarDiv.classList.remove("hide-non-visible");
                }
                
            });
            
        }
    });
    
    document.getElementById("allButtons").addEventListener("click", showAll);
    document.getElementById("errorButtons").addEventListener("click", filterErrors);
    document.getElementById("allDownloadButtons").addEventListener("click", function(){allDownloadsBuys("buy")});
    document.getElementById("allBuyButtons").addEventListener("click", function(){allDownloadsBuys("download")});

    for (var i = 0; i < listOfDownloadButtons.length; i++) {
        var downloadButton = document.createElement("div");
        downloadButton.id = "download" + i;
        downloadButton.classList.add("sidebar-div");
        downloadButton.innerHTML = "<h3>Download Button " + i + "</h3>";
        document.querySelectorAll("#sidebarDivFirst")[0].appendChild(downloadButton);
        for (var j = 0; j < downloadAttributes.length; j++) {
            if (listOfDownloadButtons[i].hasAttribute(downloadAttributes[j]) && listOfDownloadButtons[i].attributes[downloadAttributes[j]].value != "") {
                var hasAttribute = document.createElement("li");
                hasAttribute.classList.add("has-attribute");
                hasAttribute.innerText = downloadAttributes[j] + ": " + listOfDownloadButtons[i].attributes[downloadAttributes[j]].value;
                document.querySelectorAll("#" + downloadButton.id)[0].appendChild(hasAttribute); 
            } else if (listOfDownloadButtons[i].hasAttribute(downloadAttributes[j]) && listOfDownloadButtons[i].attributes[downloadAttributes[j]].value == ""){
                var hasAttribute = document.createElement("li");
                hasAttribute.classList.add("has-attribute-no-value");
                hasAttribute.innerText = downloadAttributes[j] + ": " + "missing value";
                document.querySelectorAll("#" + downloadButton.id)[0].appendChild(hasAttribute); 
            } else {
                var hasAttribute = document.createElement("li");
                hasAttribute.classList.add("no-attribute");
                hasAttribute.innerText = downloadAttributes[j] + ": " + "missing attribute";
                document.querySelectorAll("#" + downloadButton.id)[0].appendChild(hasAttribute); 
            } 

        }
        
        var labelClass = "button-label-download";
        var buttonLabelParent = listOfDownloadButtons[i].parentElement; 
        var buttonLabel = document.createElement("div"); 
        buttonLabel.classList.add(labelClass);
        buttonLabel.id = "dl-" + i;
        buttonLabel.innerHTML = "<button onclick=document.getElementById('download" + i + "').scrollIntoView()>Download Button" + i + "</button>";

        buttonLabelParent.insertBefore(buttonLabel, buttonLabelParent.firstChild);
        
        

        var downloadButtonGA = document.createElement("div");
        downloadButtonGA.id = "downloadButton" + i;
        downloadButtonGA.innerHTML = '<h3>Event shown in GA</h3>';
        document.querySelectorAll("#" + downloadButton.id)[0].appendChild(downloadButtonGA);

        var eventArray = ["Category", "Action", "Label"];

        var dlAttributesObject = {};
        dlAttributesObject.downloadName = listOfDownloadButtons[i].dataset.hasOwnProperty("downloadName") && listOfDownloadButtons[i].dataset.downloadName != "" ? listOfDownloadButtons[i].dataset.downloadName : "N/A";
        dlAttributesObject.role = listOfDownloadButtons[i].dataset.hasOwnProperty("role") && listOfDownloadButtons[i].dataset.role != "" ? listOfDownloadButtons[i].dataset.role : "N/A";
   
        if(dlAttributesObject.role == "download-link" && dlAttributesObject.downloadName != "N/A"){ // GTM Trigger
            for (let f = 0; f < eventArray.length; f++) {
                var gaEvents = document.createElement("li");
                gaEvents.classList.add("has-attribute");
                if (eventArray[f] == "Category"){
                    gaEvents.innerText = eventArray[f] + ": " + "CTA > Click On Download";
                } else if (eventArray[f] == "Action"){
                    if (listOfDownloadButtons[i].dataset.downloadName){
                        gaEvents.innerText = eventArray[f] + ": " + dlAttributesObject.downloadName; 
                    } else {
                        gaEvents.innerText = eventArray[f] + ": " + "N/A"; 
                    }        
                } else {
                    gaEvents.innerText = eventArray[f] + ": " + document.location.href;
                }
                document.querySelectorAll("#" + downloadButton.id)[0].appendChild(gaEvents);
                
            }
        } else {
            var gaEvents = document.createElement("div");
            gaEvents.classList.add("no-attribute");
            gaEvents.innerText = "This event will not be sent to GA!";
            document.querySelectorAll("#" + downloadButton.id)[0].appendChild(gaEvents);
        }

        renderButton("download", i, downloadButton.id);
    }

    for (var i = 0; i < listOfBuyButtons.length; i++) {
        var buyButton = document.createElement("div");
        buyButton.id = "buy" + i;
        buyButton.classList.add("sidebar-div");
        buyButton.innerHTML = "<h3>Buy Button " + i + "</h3>";
        document.querySelectorAll("#sidebarDivFirst")[0].appendChild(buyButton);
        for (var j = 0; j < buyAttributes.length; j++) {
            if (listOfBuyButtons[i].hasAttribute(buyAttributes[j]) && listOfBuyButtons[i].attributes[buyAttributes[j]].value != "") {
                var hasAttribute = document.createElement("li");
                hasAttribute.classList.add("has-attribute");
                hasAttribute.innerText = buyAttributes[j] + ": " + listOfBuyButtons[i].attributes[buyAttributes[j]].value;
                document.querySelectorAll("#" + buyButton.id)[0].appendChild(hasAttribute); 
            } else if (listOfBuyButtons[i].hasAttribute(buyAttributes[j]) && listOfBuyButtons[i].attributes[buyAttributes[j]].value == ""){
                var hasAttribute = document.createElement("li");
                hasAttribute.classList.add("has-attribute-no-value");
                hasAttribute.innerText = buyAttributes[j] + ": " + "missing value";
                document.querySelectorAll("#" + buyButton.id)[0].appendChild(hasAttribute); 
            } else {
                var hasAttribute = document.createElement("li");
                hasAttribute.classList.add("no-attribute");
                hasAttribute.innerText = buyAttributes[j] + ": " + "missing attribute";
                document.querySelectorAll("#" + buyButton.id)[0].appendChild(hasAttribute); 
            }
            
        } 

        var labelClass = "button-label-buy";
        var buttonLabelParent = listOfBuyButtons[i].parentElement; 
        var buttonLabel = document.createElement("div"); 
        buttonLabel.innerText = "Buy button" + " " + i;
        buttonLabel.classList.add(labelClass);
        buttonLabel.id = "buy-" + i;
        buttonLabel.innerHTML = "<button onclick=document.getElementById('buy" + i + "').scrollIntoView()>Buy Button" + i + "</button>";
        /* var computedStyles = window.getComputedStyle(listOfDownloadButtons[i]);
        var divClientRect = listOfDownloadButtons[i].getBoundingClientRect();
        if (computedStyles.display == "none" || computedStyles.visibility !== "hidden" || divClientRect.x * divClientRect.y == 0) {
                buttonLabel.classList.add("hidden");
        } */
        buttonLabelParent.insertBefore(buttonLabel, buttonLabelParent.firstChild);

        var buyButtonGA = document.createElement("div");
        buyButtonGA.id = "buyButton" + i;
        buyButtonGA.innerHTML = '<h3>Event shown in GA</h3>';
        document.querySelectorAll("#" + buyButton.id)[0].appendChild(buyButtonGA);

        var eventArray = ["Category", "Action", "Label"];
        var attributesObject = {};
        attributesObject.role = listOfBuyButtons[i].dataset.hasOwnProperty("role") && listOfBuyButtons[i].dataset.role != "" ? listOfBuyButtons[i].dataset.role : "N/A";
        attributesObject.productId = listOfBuyButtons[i].dataset.hasOwnProperty("productId") && listOfBuyButtons[i].dataset.productId != "" ? listOfBuyButtons[i].dataset.productId : "N/A";
        attributesObject.seats = listOfBuyButtons[i].dataset.hasOwnProperty("seats") && listOfBuyButtons[i].dataset.seats != "" ? listOfBuyButtons[i].dataset.seats : "N/A";
        attributesObject.maintenence = listOfBuyButtons[i].dataset.hasOwnProperty("maintenance") && listOfBuyButtons[i].dataset.maintenance != "" ? listOfBuyButtons[i].dataset.maintenance : "N/A";
        attributesObject.campaign = listOfBuyButtons[i].dataset.hasOwnProperty("campaign") && listOfBuyButtons[i].dataset.campaign != "" ? listOfBuyButtons[i].dataset.campaign : "N/A";
        attributesObject.quantity = listOfBuyButtons[i].dataset.hasOwnProperty("quantity") && listOfBuyButtons[i].dataset.quantity != "" ? listOfBuyButtons[i].dataset.quantity : "N/A";
        attributesObject.productCategory = listOfBuyButtons[i].dataset.hasOwnProperty("productCategory") && listOfBuyButtons[i].dataset.productCategory != "" ? listOfBuyButtons[i].dataset.productCategory : "N/A";
        attributesObject.campaignMarker = listOfBuyButtons[i].dataset.hasOwnProperty("campaignMarker") && listOfBuyButtons[i].dataset.campaignMarker != "" ? listOfBuyButtons[i].dataset.campaignMarker.replace("_","#") : "N/A";
        
        if(listOfBuyButtons[i].dataset.role == "cart-link"){ // GTM trigger
            for (let f = 0; f < eventArray.length; f++) {
                var gaEvents = document.createElement("li");
                gaEvents.classList.add("has-attribute");
                
                if (eventArray[f] == "Category"){
                    gaEvents.innerText = eventArray[f] + ": " + "CTA > Click to Cart";
                } else if (eventArray[f] == "Action"){
                    gaEvents.innerText = eventArray[f] + ": " + attributesObject.productId + "_" + attributesObject.seats + "_" + attributesObject.maintenence + "_" + attributesObject.campaign + "_" + attributesObject.quantity + "_" + attributesObject.campaignMarker + "_" + attributesObject.productCategory;
                } else {
                    gaEvents.innerText = eventArray[f] + ": " + listOfBuyButtons[i].href;
                }
                document.querySelectorAll("#" + buyButton.id)[0].appendChild(gaEvents);
                
            }
        } else {
            var gaEvents = document.createElement("div");
            gaEvents.classList.add("no-attribute");
            gaEvents.innerText = "This event will not be sent to GA!";
            document.querySelectorAll("#" + buyButton.id)[0].appendChild(gaEvents);
        }

        renderButton("buy", i, buyButton.id);
    }
})();


function updateButtons (){    
    console.log("spusteno");
    var listOfLinksToButtonsToDelete = document.querySelectorAll(".link-to-button-label");
    listOfLinksToButtonsToDelete.forEach(function(div){
        div.remove();
    })

    var divs = document.querySelectorAll("div");
    divs.forEach(function(div){
        if (div.id.match(/^buy-|^dl-/)) {
            var computedStyles = window.getComputedStyle(div);
            if (computedStyles.display !== "none" && computedStyles.visibility !== "hidden") {
                var divClientRect = div.getBoundingClientRect();
                if (divClientRect.x * divClientRect.y != 0){
                    //console.log("not hiden:");
                    //console.log(div);
                    var type = "";
                    if (div.id.includes("buy-")){
                        type = div.id.replace("buy-", "buy");
                        //console.log(type);
                    } else if (div.id.includes("dl-")){
                        type = div.id.replace("dl-", "download");
                        //console.log(type);
                    }
                    var linkToButton = document.createElement("div");
                    linkToButton.classList.add("link-to-button-label");
                    linkToButton.innerHTML = "<button onclick=document.getElementById('" + div.id + "').scrollIntoView()>to the button</button>";
                    //console.log(div);
                    //console.log(type);
                    document.getElementById(type).appendChild(linkToButton);  
                    console.log(type);
                     
                     
                }    
            }    
        }
    })
}

window.addEventListener("hashchange", updateButtons);

