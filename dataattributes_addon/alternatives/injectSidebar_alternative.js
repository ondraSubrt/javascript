// funkce pro filtry


var allButtons = {};
var nodeOfDownloadButtons = document.querySelectorAll("a[href*='download-thank-you.php'], a[href*='/download'], a[href*='play.google.com'], a[href*='apps.apple.com']");
var nodeOfBuyButtons =  document.querySelectorAll("a[href*='ipm.store.avast.com'], a[href*='store.avast.com'], a[href*='ipm.store-sl.avast.com'], a[href*='store-nw.avast.com'], a[href*='store-sl.avast.com'],	a[href*='ipm.store-ap.avast.com'], a[href*='store-cb.avast.com'], a[href*='ipm.store-cb.avast.com'], a[href*='shop.avg.com'], a[href*='checkout.hidemyass.com'], a[href*='/pricing']");
var listOfDownloadButtons = Array.from(nodeOfDownloadButtons);
var listOfBuyButtons = Array.from(nodeOfBuyButtons);
var downloadAttributes = ["data-role", "data-download-name"]; // optional attributes "data-os", "data-cta"
var buyAttributes = ["data-role", "data-product-id", "data-product-category", "data-seats", "data-maintenance", "data-campaign-marker", "data-quantity", "data-campaign"]; // optional attrbutes  "data-campaign"

function createNewElement(elementType, elementId, elementClass, elementInnerHTML, elementInnerText){
    elementId = elementId || "";
    elementClass = elementClass || "";
    elementInnerText = elementInnerText || "";
    elementInnerHTML = elementInnerHTML || "";
    var element = document.createElement(elementType);
    if (elementClass != ""){
        element.classList.add(elementClass);
    }
    if (elementId != ""){
        element.id = elementId;
    }    
    if (elementInnerHTML != ""){
        element.innerHTML = elementInnerHTML;
    }
    if (elementInnerText != ""){
        element.innerText = elementInnerText;
    }
    return element;
}


function copyTextToClipboard(idOfBtn) {
    navigator.clipboard.writeText(idOfBtn);
}

function addLabels(buttonsList, buttonType){
    if (buttonsList.buttons){
        var buttons = buttonsList.buttons;
    } else {
        var buttons = buttonsList;
    }
    var labelsList = [];
    for (var a = 0; a < buttons.length; a++){
        var labelClass = "button-label-" + buttonType;
        var buttonLabelParent = buttons[a].parentElement; 
        //console.log(buttons[a].parentElement);
        
        var buttonLabel = document.createElement("div"); 
        buttonLabel.classList.add(labelClass);
        buttonLabel.id = buttonType + "Label" + a;
        buttonLabel.innerHTML = "<button onclick=document.getElementById('" + buttonType + "Box" + a + "').scrollIntoView()>" + buttonType + " Button " + a + "</button>";
        buttonLabelParent.insertBefore(buttonLabel, buttonLabelParent.firstChild);
    
        labelsList.push(document.getElementById(buttonType + "Label" + a));
    }
    if (!allButtons[buttonType].labels){
        allButtons[buttonType].labels = [];
    }
    allButtons[buttonType].labels.push(...labelsList);
}


// allButtons
//  download {}
//      buttonType ""      
//      buttons []
//      labels []
//      links []           
//  buy {}
//      buttonType ""
//      buttons []
//      labels []
//      links []     

/* function showOnlyVisibleButtons(btns){ // allbuttons
    for (var d = 0; d < btns.buttons.length; d++) {
        var computedStyles = window.getComputedStyle(btns.buttons[d]);
        if (computedStyles.display != "none" || computedStyles.visibility != "hidden") {
            var divClientRect = btns.buttons[d].getBoundingClientRect();
            if (divClientRect.x * divClientRect.y == 0){
                btns.links[d].classList.add("hidden");
                btns.labels[d].classList.add("hidden");
                console.log(d);
            }
        } else {
            console.log(d);            
            btns.links[d].classList.add("hidden");
            btns.labels[d].classList.add("hidden");
        }
        
    }
} */

function showOnlyVisibleButtons(btns){ // allbuttons
    for (var d = 0; d < btns.buttons.length; d++) {
        var divClientRect = btns.buttons[d].getBoundingClientRect();
        var computedStyles = window.getComputedStyle(btns.buttons[d]);
        if (computedStyles.display == "none") {
            btns.links[d].classList.add("hidden");
            btns.labels[d].classList.add("hidden");
        } else if (computedStyles.visibility == "hidden") {
            btns.links[d].classList.add("hidden");
            btns.labels[d].classList.add("hidden");
        } else if (divClientRect.x * divClientRect.y == 0) {
            btns.links[d].classList.add("hidden");
            btns.labels[d].classList.add("hidden");
        }
    }
}

function listAttributes(attributes, listOfButtons, buttonType, buttons){
    var errors = [];
    var eventCategories = {
        'download': "CTA > Click On Download",
        'buy': "CTA > Click To Cart"
    }
    
    for (var b = 0; b < listOfButtons.length; b++) {
        var dataAttributes = {};
        var errorsArray = [];
        var elementHTML = "<h3>" + buttonType + " button " + b + "</h3>";
        var idOfElement = buttonType + "Box" + b;
        var buttonTypeCap = buttonType.charAt(0).toUpperCase() + buttonType.slice(1);
        document.querySelectorAll("[id^='sidebarDivFirst']")[0].appendChild(createNewElement("div", idOfElement, "sidebar-div", elementHTML));
        
        for (var d = 0; d < attributes.length; d++) {
            if (listOfButtons[b].hasAttribute(attributes[d]) && listOfButtons[b].attributes[attributes[d]].value != "") {
                var text = attributes[d] + ": " + listOfButtons[b].attributes[attributes[d]].value;
                errorsArray.push("ok");
                dataAttributes[attributes[d]] = listOfButtons[b].attributes[attributes[d]].value;
                document.querySelectorAll("[id^='" + idOfElement + "']")[0].appendChild(createNewElement("li", "", "has-attribute", "", text));
            } else if (listOfButtons[b].hasAttribute(attributes[d]) && listOfButtons[b].attributes[attributes[d]].value == ""){
                if (attributes[d] == "data-campaign"){
                    var text = attributes[d] + ": " + "missing value (optional attribute)";
                    errorsArray.push("ok");
                    dataAttributes[attributes[d]] = "N/A";
                    document.querySelectorAll("[id^='" + idOfElement + "']")[0].appendChild(createNewElement("li", "", "has-attribute-no-value", "", text)); 
                } else if (attributes[d] == "data-quantity"){
                    if (listOfButtons[b].hasAttribute("data-product-category")){
                        if (listOfButtons[b].attributes["data-product-category"].value.match(/SMB|smb|Smb|(B|b)usiness/g)){
                            var text = attributes[d] + ": " + "missing value";
                            errorsArray.push("error");
                            dataAttributes[attributes[d]] = "N/A";
                            document.querySelectorAll("[id^='" + idOfElement + "']")[0].appendChild(createNewElement("li", "", "has-attribute-no-value", "", text)); 
                        } 
                    }        
                } else {
                    var text = attributes[d] + ": " + "missing value";
                    errorsArray.push("error");
                    dataAttributes[attributes[d]] = "N/A";
                    document.querySelectorAll("[id^='" + idOfElement + "']")[0].appendChild(createNewElement("li", "", "has-attribute-no-value", "", text))
                }  
            } else {
                if (attributes[d] == "data-campaign"){
                    var text = attributes[d] + ": " + "missing attribute (optional attribute)";
                    errorsArray.push("ok");
                    dataAttributes[attributes[d]] = "N/A";
                    document.querySelectorAll("[id^='" + idOfElement + "']")[0].appendChild(createNewElement("li", "", "no-attribute", "", text)); 
                } else if (attributes[d] == "data-quantity"){
                    if (listOfButtons[b].hasAttribute("data-product-category")){
                        if (listOfButtons[b].attributes["data-product-category"].value.match(/SMB|smb|Smb|(B|b)ussines/g)){
                            var text = attributes[d] + ": " + "missing attribute for test";
                            errorsArray.push("error");
                            dataAttributes[attributes[d]] = "N/A";
                            document.querySelectorAll("[id^='" + idOfElement + "']")[0].appendChild(createNewElement("li", "", "no-attribute", "", text)); 
                        } else {
                            dataAttributes[attributes[d]] = "N/A";
                        }
                    }        
                } else {
                    var text = attributes[d] + ": " + "missing attribute";
                    errorsArray.push("error");
                    dataAttributes[attributes[d]] = "N/A";
                    document.querySelectorAll("[id^='" + idOfElement + "']")[0].appendChild(createNewElement("li", "", "no-attribute", "", text))
                }
            } 
        }
        if (errorsArray.some(function(el){return el == "error"})){
            errors[b] = "error";
        } else {
            errors[b] = "ok";
        }

        

        document.querySelectorAll("[id^='" + idOfElement + "']")[0].appendChild(createNewElement("div", buttonType + "ButtonH3-" + b, "", "<h3>Event shown in GA</h3>", ""));
        
        // Optional
        // data-campaign
        // data-quantity is there only in data-product-category id SMB

        var gaEvents = {
            'category' : "Category: " + eventCategories[buttons.buttonType],
            'action' : "Action: ",
            'label' :  "Label: " + document.location.href

        }

        if (dataAttributes["data-role"] != "N/A"){
            switch (dataAttributes["data-role"]){
                case "download-link": 
                    gaEvents["action"] += dataAttributes["data-download-name"];
                    break;
                case "cart-link": 
                    gaEvents["action"] += dataAttributes["data-product-id"] + "_" + dataAttributes["data-seats"] + "_" + dataAttributes["data-maintenance"] + "_" + dataAttributes["data-campaign"] + "_" + dataAttributes["data-quantity"] + "_" + dataAttributes["data-campaign-marker"] + "_" + dataAttributes["data-product-category"];
                    break;
            }
        } else {
            // will not be triggered    
            if (document.querySelectorAll("[id^=notSentToGA" + b + "]").length == 0){ 
                document.querySelectorAll("[id^='" + idOfElement + "']")[0].appendChild(createNewElement("div", "notSentToGA" + b, "not-send-to-ga", "", "( ! ) This event will not be sent to GA!"));
            }
        }

        if (!dataAttributes["data-download-name"] || dataAttributes["data-download-name"] != "N/A"){
            Object.keys(gaEvents).forEach(function(element){
                document.querySelectorAll("[id^='" + idOfElement + "']")[0].appendChild(createNewElement("li", "", "has-attribute", "", gaEvents[element]));
            })
        } else {
            if (document.querySelectorAll("[id^=notSentToGA" + b + "]").length == 0){    
                document.querySelectorAll("[id^='" + idOfElement + "']")[0].appendChild(createNewElement("div", "notSentToGA" + b, "not-send-to-ga", "", "( ! ) This event will not be sent to GA!"));
            }
        }

        var html = "<button onclick=document.getElementById('" + buttonType + "Label" + b + "').scrollIntoView()>Show " + buttonTypeCap + " " + b + "</button>";
        document.querySelectorAll("[id^='" + buttonType + "Box" + b + "']")[0].appendChild(createNewElement("div", "linkTo" + buttonTypeCap + "ButtonLabel" + b, "link-to-button-label", html, ""));    
    } 
    if (!buttons.errors){
        buttons.errors = [];
    }
    buttons.errors.push(...errors); //buttons.errors = errors;
    
    if(!buttons.links){
        buttons.links = [];
    }
    buttons.links.push(...document.querySelectorAll("[id^='linkTo" + buttonTypeCap + "']")); //buttons.links = document.querySelectorAll("[id^='linkTo" + buttonTypeCap + "']");
}

function getDataLayer(){
    var dL = document.createElement("script");
    var hackScript = 
    `function copyTextToClipboard(idOfBtn) {
        navigator.clipboard.writeText(idOfBtn);
    };

    var originalDl = window.dataLayer;
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
    document.body.appendChild(hiddenDiv);`;
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
}

function addBoxes(box, boxType){
    var allBoxes = document.querySelectorAll("[id^='" + boxType + "Box']");    
    if (!allButtons[boxType].boxes){
       allButtons[boxType].boxes = [];
    }
    allButtons[boxType].boxes.push(...allBoxes);
}

function filterVisibleOnly(){
    var moreOptionsInputVisible = document.querySelector("[id^='visible-on-page']");
    moreOptionsInputVisible.addEventListener( 'change', function() {
        var sidebarDivs = document.querySelectorAll(".link-to-button-label");
        if(moreOptionsInputVisible.checked) {
            sidebarDivs.forEach(function(sidebarDiv) {
                if (sidebarDiv.className.includes("hidden")){
                    sidebarDiv.parentElement.classList.add("hide-non-visible");
                }
            });
        } else {
            sidebarDivs.forEach(function(sidebarDiv) {
                if(sidebarDiv.parentElement.className.includes("hide-non-visible")){
                    sidebarDiv.parentElement.classList.remove("hide-non-visible");
                }
                
            });
            
        }
    }); 
}

function showAll() {
    var listOfErrorBoxes = document.querySelectorAll(".sidebar-div.hidden");
    for (var s = 0; s < listOfErrorBoxes.length; s++) {
        listOfErrorBoxes[s].classList.remove("hidden");       
    }
    var allLabels = document.querySelectorAll('div[class*="button-label-"]');
    for (var s = 0; s < allLabels.length; s++) {
        if (allLabels[s].className.includes("hidden")){
            allLabels[s].classList.remove("hidden");       
        }
    }
}

function filterErrors(allBoxes){
    for (var e = 0; e < allBoxes.errors.length; e++) {
        if (allBoxes.errors[e] == "ok"){
            allBoxes.boxes[e].classList.add("hidden");
            allBoxes.labels[e].classList.add("hidden");

        }
    }
}

function allDownloadsBuys(buttonBox) { // vymazat labely ve stránce
    showAll();
    for (var s = 0; s < buttonBox.boxes.length; s++) {
        buttonBox.boxes[s].classList.add("hidden");  
        buttonBox.labels[s].classList.add("hidden");       
    }
    /* if (document.getElementById("visible-on-page").checked == true){
        document.getElementById("visible-on-page").click();
    } */

}

function addCross(){
    var innerHTML = '<svg data-v-393ba124="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g data-v-393ba124="" fill="none" fill-rule="evenodd"><path data-v-393ba124="" fill="#FFF" d="M7.383 7.99L3.019 3.618 3.636 3 8 7.372 12.364 3l.617.618L8.617 7.99 13 12.382l-.617.618L8 8.609 3.617 13 3 12.382z"></path></g></svg>'
    var firstElement = document.getElementById("sidebarDivFirst");
    firstElement.insertBefore(createNewElement("div", "crossParent", "cross-parent", "", ""), firstElement.firstChild);
    document.getElementById("crossParent").appendChild(createNewElement("div", "closeCross", "close-cross", innerHTML, ""));
}

function closeAddon(){
    document.getElementById("sidebarDivFirst").remove(); 
    Object.keys(allButtons).forEach(function(key){
        allButtons[key].labels.forEach(function(element){
           element.remove(); 
        
        })
        allButtons[key].buttons.forEach(function(element){
            element.id = ""; 
         
        }) 

    delete allButtons[key];

    })
}

function addCopyLink(){
    
    Object.keys(allButtons).forEach(function(property){
        var box = allButtons[property].boxes;
        box.forEach(function(element, index){
            var copy = createNewElement("div", "copyTextParent", "copy-text", "", "Copy ID");
            var idOfButton = '#' + property + 'Button' + index;
            copy.setAttribute("onclick", "copyTextToClipboard('" + idOfButton + "')");
            element.insertBefore(copy, element.firstChild);
        })
        
    })
}

function activeButton(buttonId){
    var ids = ["allButtons", "errorButtons", "allDownloadButtons", "allBuyButtons"];
    document.getElementById(buttonId).firstChild.style.backgroundColor = "rgb(67, 178, 153)";
    for (var g = 0; g < ids.length; g++) {
        if (ids[g] != buttonId){
            document.getElementById(ids[g]).firstChild.style.backgroundColor = "rgb(0, 133, 92)";
        }
        
    }

}

function noActiveButton(){
    var ids = ["allButtons", "errorButtons", "allDownloadButtons", "allBuyButtons"];
    for (var g = 0; g < ids.length; g++) {
            document.getElementById(ids[g]).firstChild.style.backgroundColor = "rgb(0, 133, 92)";
        }
        
    }



(function createSidebar(){
    var downloadArray = [];
    var buyArray = [];

    for (var i = 0; i < listOfDownloadButtons.length; i++){
        listOfDownloadButtons[i].id = "downloadButton" + i;
        downloadArray.push(listOfDownloadButtons[i]);  
    }
    allButtons.download = {};
    allButtons.download.buttons = downloadArray;
    allButtons.download.buttonType = "download";

    for (var i = 0; i < listOfBuyButtons.length; i++){
        listOfBuyButtons[i].id = "buyButton" + i;
        buyArray.push(listOfBuyButtons[i]);  
    }
    allButtons.buy = {};
    allButtons.buy.buttons = buyArray;
    allButtons.buy.buttonType = "buy";

    addLabels(allButtons.download, "download");
    addLabels(allButtons.buy, "buy");
    
    var sidebarWidth = window.innerWidth-600 + "px";
    var new_div = createNewElement("div", "sidebarDivFirst","sidebar","","");
    // create div which will have all body inside andd then create another one for sidebar
    
    if (document.querySelectorAll(".sticky-bar").length > 0){    
        document.querySelectorAll(".sticky-bar")[0].style.width = sidebarWidth;
    }
    
    var first = document.body.firstChild;
    first.parentNode.insertBefore(new_div, first);
    
    getDataLayer();
    
    var menuHTML = "<table><tbody><tr><td><button id='allButtons'><div>All buttons</div></button></td><td><button id='errorButtons'><div>Buttons with error</div></button></td><tr><td><button id='allDownloadButtons'><div>All download buttons</div></button></td><td><button id='allBuyButtons'><div>All buy buttons</div></button></td></tbody></table>";
    document.getElementById("sidebarDivFirst").appendChild(createNewElement("div", "menuButtons", "menu-table", menuHTML, ""));

    if (!document.getElementById("more-options")){
        var optionsHTML = "<input type='checkbox' id='visible-on-page' name='visible-on-page' value='visible'><label for='visible-on-page'> Show only buttons visible on page</label>";
        document.getElementById("menuButtons").appendChild(createNewElement("div", "more-options", "more-options", optionsHTML, ""));
    }    
    
    filterVisibleOnly();

    listAttributes(downloadAttributes, allButtons.download.buttons, "download", allButtons.download);
    listAttributes(buyAttributes, allButtons.buy.buttons, "buy", allButtons.buy);

    addBoxes(allButtons.download, "download");
    addBoxes(allButtons.buy, "buy");

    showOnlyVisibleButtons(allButtons.download);
    showOnlyVisibleButtons(allButtons.buy);

    document.getElementById("allButtons").addEventListener("click", function(){ 
        showAll();
        activeButton("allButtons");
    });   
    document.getElementById("errorButtons").addEventListener("click", function(){
        showAll();
        activeButton("errorButtons");
        filterErrors(allButtons.download);
        filterErrors(allButtons.buy);
    });

    document.getElementById("allDownloadButtons").addEventListener("click", function(){
        activeButton("allDownloadButtons");
        allDownloadsBuys(allButtons.buy);
    });
    document.getElementById("allBuyButtons").addEventListener("click", function(){
        activeButton("allBuyButtons");
        allDownloadsBuys(allButtons.download);
    });

    addCross();

    document.getElementById("closeCross").addEventListener("click", function(){closeAddon()});

    addCopyLink();

})();

function updateButtons(btns){ // allbuttons
        for (var t = 0; t < btns.links.length; t++) {
            if (btns.links[t].className.includes("hidden")){
                btns.links[t].classList.remove("hidden");
            }
        }
        for (var d = 0; d < btns.buttons.length; d++) {
            var divClientRect = btns.buttons[d].getBoundingClientRect();
            var computedStyles = window.getComputedStyle(btns.buttons[d]);
            if (computedStyles.display == "none") {
                btns.links[d].classList.add("hidden");
            } else if (computedStyles.visibility == "hidden"){
                btns.links[d].classList.add("hidden");
            } else if (divClientRect.x * divClientRect.y == 0){
                btns.links[d].classList.add("hidden");
            }        
        }
    }

window.addEventListener("hashchange", function(){
    showAll();
    noActiveButton();
    updateButtons(allButtons.buy);
    updateButtons(allButtons.download);
    if (document.getElementById("visible-on-page").checked == true){
        document.getElementById("visible-on-page").click();
    }    
})
window.addEventListener("hashchange", function(){console.log(document.location)});


// jak změnit labely při změně option v selectu?
// dodělat když se změní select aby se to projevilo i v boxu
// může se stát, že se na stránku přidá nový prvek

var selects = Array.from(document.getElementsByTagName("select"));
selects.forEach(function(elm){
    elm.addEventListener("change", function(){
        filterVisibleOnly();
        var allDlButtonElements = document.querySelectorAll("a:not([id])[href*='download-thank-you.php'], a:not([id])[href*='/download'], a:not([id])[href*='play.google.com'], a:not([id])[href*='apps.apple.com']")
        var allBuyButtonElements = document.querySelectorAll("a:not([id])[href*='ipm.store.avast.com'], a:not([id])[href*='store.avast.com'], a:not([id])[href*='ipm.store-sl.avast.com'], a:not([id])[href*='store-nw.avast.com'], a:not([id])[href*='store-sl.avast.com'],	a:not([id])[href*='ipm.store-ap.avast.com'], a:not([id])[href*='store-cb.avast.com'], a:not([id])[href*='ipm.store-cb.avast.com'], a:not([id])[href*='shop.avg.com'], a:not([id])[href*='checkout.hidemyass.com'], a:not([id])[href*='/pricing']");
        if (allDlButtonElements.length > 0){
            showAll();
            updateButtons(allButtons.buy);
            addLabels(allDlButtonElements, "download");
            addBoxes(allDlButtonElements, "download");
            listAttributes(downloadAttributes, allDlButtonElements, "download", allButtons.download);
        }
        if (allBuyButtonElements.length > 0){
            showAll();
            updateButtons(allButtons.download);
            addLabels(allBuyButtonElements, "buy");
            addBoxes(allBuyButtonElements, "buy");
            listAttributes(buyAttributes, allBuyButtonElements, "buy", allButtons.buy);
        }
    })
})




