var allButtons = {};
var nodeOfDownloadButtons = document.querySelectorAll("a[href*='download-thank-you.php'], a[href*='/download'], a[href*='play.google.com'], a[href*='apps.apple.com']");
var nodeOfBuyButtons =  document.querySelectorAll("a[href*='ipm.store.avast.com'], a[href*='store.avast.com'], a[href*='ipm.store-sl.avast.com'], a[href*='store-nw.avast.com'], a[href*='store-sl.avast.com'],	a[href*='ipm.store-ap.avast.com'], a[href*='store-cb.avast.com'], a[href*='ipm.store-cb.avast.com'], a[href*='shop.avg.com'], a[href*='checkout.hidemyass.com'], a[href*='/pricing']");
var listOfDownloadButtons = Array.from(nodeOfDownloadButtons);
var listOfBuyButtons = Array.from(nodeOfBuyButtons);
var downloadAttributes = ["data-role", "data-download-name"]; // optional attributes "data-os", "data-cta"
var buyAttributes = ["data-role", "data-product-id", "data-product-category", "data-seats", "data-maintenance", "data-campaign-marker", "data-quantity", "data-campaign"]; // optional attrbutes  "data-campaign"
var buttonNodes = {
    "download": nodeOfDownloadButtons, 
    "buy": nodeOfBuyButtons
}
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

/* function noActiveButton(){
    var ids = ["allButtons", "errorButtons", "allDownloadButtons", "allBuyButtons"];
    for (var g = 0; g < ids.length; g++) {
        document.getElementById(ids[g]).firstChild.style.backgroundColor = "rgb(0, 133, 92)";
    }    
} */

function addCross(){
    var innerHTML = '<svg data-v-393ba124="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g data-v-393ba124="" fill="none" fill-rule="evenodd"><path data-v-393ba124="" fill="#FFF" d="M7.383 7.99L3.019 3.618 3.636 3 8 7.372 12.364 3l.617.618L8.617 7.99 13 12.382l-.617.618L8 8.609 3.617 13 3 12.382z"></path></g></svg>'
    var firstElement = document.getElementById("sidebarDivFirst");
    firstElement.insertBefore(createNewElement("div", "crossParent", "cross-parent", "", ""), firstElement.firstChild);
    document.getElementById("crossParent").appendChild(createNewElement("div", "closeCross", "close-cross", innerHTML, ""));
}

function capitalLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

function createSidebar() {
    var sidebarWidth = window.innerWidth-600 + "px";
    var new_div = createNewElement("div", "sidebarDivFirst","sidebar","","");
    // create div which will have all body inside andd then create another one for sidebar
    
    if (document.querySelectorAll(".sticky-bar").length > 0){    
        document.querySelectorAll(".sticky-bar")[0].style.width = sidebarWidth;
    }
    
    var first = document.body.firstChild;
    first.parentNode.insertBefore(new_div, first);
    
    getDataLayer();
    
    var menuHTML = "<table><tbody><tr><td><input type='radio' id='allButtons' class='filter-buttons' name='filter-buttons' ><label for='allButtons'>All buttons</label></td><td><input type='radio' id='errorButtons' class='filter-buttons' name='filter-buttons' ><label for='errorButtons'>Buttons with error</label></td></tr><tr><td><input type='radio' id='allDownloadButtons' class='filter-buttons' name='filter-buttons' ><label for='allDownloadButtons'>All download buttons</label></td><td><input type='radio' id='allBuyButtons' class='filter-buttons' name='filter-buttons' ><label for='allBuyButtons'>All buy buttons</label></td></tr></tbody></table>";
    document.getElementById("sidebarDivFirst").appendChild(createNewElement("div", "menuButtons", "menu-table", menuHTML, ""));

    if (!document.getElementById("more-options")){
        var optionsHTML = "<input type='checkbox' id='visibleOnPage' name='visible-on-page' value='visible'><label for='visible-on-page'> Show only buttons visible on page</label>";
        document.getElementById("menuButtons").appendChild(createNewElement("div", "more-options", "more-options", optionsHTML, ""));
    }   
    
    addCross();
}

function buttonType(button) {
    if (button.attributes.href.value.match(/.*download.*|.*play.*|.*apps.*/)){
        return "download";
    } else if (button.attributes.href.value.includes("store")){
        return "buy";
    }
}
function getAttributes(button){ // if there are other types of buttons add the condition
    if (buttonType(button) == "download"){
        var dlAttributes = {
            "data-role": button.dataset.role,
            "data-download-name": button.dataset.downloadName
        }
        return dlAttributes 
    } else if (buttonType(button) == "buy"){
        var buyAttributes = {
            "data-role": button.dataset.role,
            "data-product-id": button.dataset.productId,
            "data-product-category": button.dataset.productCategory,
            "data-seats": button.dataset.seats,
            "data-maintenance": button.dataset.maintenance,
            "data-campaign-marker": button.dataset.campaignMarker,
            "data-quantity": button.dataset.quantity,
            "data-campaign": button.dataset.campaign
        }
        return buyAttributes;
    }
    
}

function addLabel(button, index){
    var labelButtonType = buttonType(button);
    var labelClass = "button-label-" + labelButtonType;
    var labelParent = button.parentElement; 
    var labelId = labelButtonType + "Label" + index;
    var labelInnerHTML = "<button onclick=document.getElementById('" + labelButtonType + "Box" + index + "').scrollIntoView()>" + capitalLetter(labelButtonType) + " button " + index + "</button>";
    labelParent.insertBefore(createNewElement("div", labelId, labelClass, labelInnerHTML, ""), labelParent.firstChild);
    return document.getElementById(labelId);  
}

function addBox(button, index){
    var boxButtonType = buttonType(button);
    var boxInnerHTML = "<h3>" + capitalLetter(boxButtonType) + " button " + index + "</h3>";
    var boxClass = "sidebar-div";
    var boxId = boxButtonType + "Box" + index;
    document.getElementById("sidebarDivFirst").appendChild(createNewElement("div", boxId, boxClass, boxInnerHTML, ""));
    return document.getElementById(boxId);
}

function addLink(button, index){
    var linkButtonType = buttonType(button);
    var linkInnerHTML = "<button onclick=document.getElementById('" + linkButtonType + "Label" + index + "').scrollIntoView()>Show " + capitalLetter(linkButtonType) + " #" + index + "</button>";
    var linkClass = "link-to-button-label";
    var linkId = "linkTo" + capitalLetter(linkButtonType) + "Label" + index;
    document.getElementById(linkButtonType + "Box" + index).appendChild(createNewElement("div", linkId, linkClass, linkInnerHTML, ""));
    return document.getElementById(linkId);
}

function isVisible(button){

    var divClientRect = button.getBoundingClientRect();
    var computedStyles = window.getComputedStyle(button);
    if (computedStyles.display == "none") {
        return false;
    } else if (computedStyles.visibility == "hidden") {
        return false;
    } else if (divClientRect.x * divClientRect.y == 0) {
        return false;
    } else {
        return true;
    }
}

function hasErrors(button){
    var attributes = getAttributes(button);
    var errors = [];
    Object.keys(attributes).forEach(function(attribute, i){
        if (attributes[attribute] === undefined) {
            if (attribute == "data-campaign") {
                errors[i] = "ok";
            } else if (attribute == "data-quantity" && attributes["data-product-category"].match(/(C|c)onsumer/g)) {
                errors[i] = "ok";
            } 
            else {
                errors[i] = "error";
            }
        } else if (attributes[attribute] == "") { // rozdělit na dvě podmínky a podle toho jestli je undefined nebo prázdný přiřadit třídu a text v <i> potom vytvořit div se všemi <i>, případně eventou, která se posílá do GA a použít insertAfter() <H3> v boxu. možná poslat do funkce i index kvůli indexu boxu
            if (attribute == "data-campaign") {
                errors[i] = "ok";
            } else if (attribute == "data-quantity" && attributes["data-product-category"].match(/(C|c)onsumer/g)) {
                errors[i] = "ok";
            } 
            else {
                errors[i] = "error";
            } 
        } else {
            errors[i] = "ok";
        }
    })
    if (errors.some(function(el){return el == "error"})){
        return "error";
    } else {
        return "ok";
    }
} 

function fillBoxes(button){
    var attributes = getAttributes(button);
    var classes = [];
    var texts = [];
    var elements = [];
    Object.keys(attributes).forEach(function(attribute, i){
        if (attributes[attribute] === undefined) {
            if (attribute == "data-campaign") {
                classes[i] = "has-atribute-no-value";
                texts[i] = "missing attribute (optional attribute)";
            } else if (attribute == "data-quantity" && attributes["data-product-category"].match(/(C|c)onsumer/g)) {
                classes[i] = "has-attribute-no-value";
                texts[i] = "mandatory for SMB (optional for Consumer)"; // Nešlo by nezobrazovat pro Consumer?
            } 
            else {
                classes[i] = "no-attribute";
                texts[i] = "missing attribute";
            }
        } else if (attributes[attribute] == "") { 
            if (attribute == "data-campaign") {
                classes[i] = "has-attribute-no-value";
                texts[i] = "missing value (optional attribute)";
            } else if (attribute == "data-quantity" && attributes["data-product-category"].match(/(C|c)onsumer/g)) {
                classes[i] = "has-attribute-no-value";
                texts[i] = "mandatory for SMB (optional for Consumer)";
            } 
            else {
                classes[i] = "has-attribute-no-value";
                texts[i] = "missing value";
            } 
        } else {
            if (attributes["data-role"] != "download-link" && buttonType(button) == "download"){
                classes[i] = "no-attribute";
                texts[i] = attributes["data-role"] + " wrong value 'download-link' expected";
            } else if (attributes["data-role"] != "cart-link" && buttonType(button) == "buy"){
                classes[i] = "no-attribute";
                texts[i] = attributes["data-role"] + " wrong value 'cart-link' expected";
            } else {
                classes[i] = "has-attribute";
                texts[i] = attributes[attribute]; 
            }
        }

        elements[i] = createNewElement("li", "", classes[i], "", attribute + " : " + texts[i]);
    })
    var boxHeadline = createNewElement("div", "", "", "", "");
    elements.forEach(function(element){
        boxHeadline.appendChild(element);
    })

    
    boxHeadline.appendChild(createNewElement("h3", "", "", "", "GA Event"));
    
    if (attributes["data-role"] != undefined || attributes["data-role"] != "") {
        if (attributes["data-role"] == "download-link" && buttonType(button) == "download"){
            if (attributes["data-download-name"] == undefined || attributes["data-download-name"] == ""){
                var boxAttributes = createNewElement("div", "notSentToGA", "not-send-to-ga", "", "( ! ) This event will not be sent to GA!");
                
            } else {
                var gaEvent = {
                    "category" : "Category: CTA > Click On Download",
                    "action" : "Action: " + attributes["data-download-name"], 
                    "label" : "Label: " + button.href
                }

                var boxAttributes = createNewElement("div", "", "", "", "");
                boxAttributes.appendChild(createNewElement("li", "", "has-attribute", "", gaEvent["category"]));
                boxAttributes.appendChild(createNewElement("li", "", "has-attribute", "", gaEvent["action"]));
                boxAttributes.appendChild(createNewElement("li", "", "has-attribute", "", gaEvent["label"]));
            }

        } else if (attributes["data-role"] == "cart-link" && buttonType(button) == "buy"){
            Object.keys(attributes).forEach(function(attribute){
                if(attributes[attribute] == undefined || attributes[attribute] == ""){
                    attributes[attribute] = "N/A";
                }
            })
            var gaEvent = {
                "category" : "Category: CTA > Click On Download",
                "action" : "Action: " + attributes["data-product-id"] + "_" + attributes["data-seats"] + "_" + attributes["data-maintenance"] + "_" + attributes["data-campaign"] + "_" + attributes["data-quantity"] + "_" + attributes["data-campaign-marker"] + "_" + attributes["data-product-category"], 
                "label" : "Label: " + button.href
            }
            var boxAttributes = createNewElement("div", "", "", "", "");
            boxAttributes.appendChild(createNewElement("li", "", "has-attribute", "", gaEvent["category"]));
            boxAttributes.appendChild(createNewElement("li", "", "has-attribute", "", gaEvent["action"]));
            boxAttributes.appendChild(createNewElement("li", "", "has-attribute", "", gaEvent["label"]));
        } else {
            var boxAttributes = createNewElement("div", "notSentToGA", "not-send-to-ga", "", "( ! ) wrong 'data-role' attribute value");
        }// else if{************ sem doplnit podmínku pro dlaší typy tlačítek ********}
    } else {
        var boxAttributes = createNewElement("div", "notSentToGA", "not-send-to-ga", "", "( ! ) This event will not be sent to GA!");
        
    }
    boxHeadline.appendChild(boxAttributes);
    return boxHeadline;
} 

function addButtonToObject(button, index) {
    button.id = buttonType(button) + "Button" + index;
    var buttonObject = {};
    buttonObject = {
        buttonType: buttonType(button),
        button: {
            element: button,
            box: addBox(button, index),
            label: addLabel(button, index),
            link: addLink(button, index),
            error: hasErrors(button),
            attributes: getAttributes(button),
            visible: isVisible(button)
        }
    };
    return buttonObject;
}

function allButtonNodes(buttons) {
    var allButtons = [];
    Object.keys(buttons).forEach(function(type, index){
        for (var i = 0; i < buttons[type].length; i++) {
            allButtons.push(buttons[type][i]);
        }
    })
    return allButtons;
}

function getButtons(buttons){
    buttons.forEach(function(button) {
        var typeOfButton = buttonType(button);
        if (allButtons[typeOfButton] === undefined){
            allButtons[typeOfButton] = [];
        }
        var index = allButtons[typeOfButton].length 
        allButtons[typeOfButton].push(addButtonToObject(button, index));
    });
};

function showAll() {
    Object.keys(allButtons).forEach(function(type){
        allButtons[type].forEach(function(buttons) {
            if (buttons.button.box.className.includes("hide-non-visible")){
                buttons.button.box.classList.remove("hide-non-visible");
                buttons.button.label.classList.remove("hidden");
            }
        })
    })
}

function filterErrors(){
    showAll();
    Object.keys(allButtons).forEach(function(type){
        allButtons[type].forEach(function(buttons) {
            if (buttons.button.error == "ok"){
                buttons.button.box.classList.add("hide-non-visible");
                buttons.button.label.classList.add("hidden");
            }    
        })
    })
}

function allDownloadsBuys(type) { 
    showAll();
    allButtons[type].forEach(function(buttons) {
        buttons.button.box.classList.add("hide-non-visible");            
        buttons.button.label.classList.add("hidden");
    });
}

// hide all links to buttons which are not visible on the page
function showVisibleOnly(){
    Object.keys(allButtons).forEach(function(type){
        allButtons[type].forEach(function(buttons) {
            buttons.button.visible = isVisible(buttons.button.element)            
            if (buttons.button.visible === false) {
                buttons.button.link.classList.add("hidden")
            } else {
                if (buttons.button.link.className.includes("hidden")){
                    buttons.button.link.classList.remove("hidden")
                }
            }
        });
    });
}

function deleteAddonData(buttons){
    Object.keys(buttons).forEach(function(type){
        buttons[type].forEach(function(elem){
            elem.button.box.remove();
            elem.button.label.remove();
            elem.button.element.id = "";
        })
    });
}; 

function closeAddon(allButtons){
    Object.keys(allButtons).forEach(function(type){
        console.log(allButtons[type]);
        allButtons[type].forEach(function(buttons){
            buttons.button.label.remove(); 
            buttons.button.element.id = "";
        })
    })
    document.getElementById("sidebarDivFirst").remove(); 
    allButtons = {};
}

function addAtributesToBox(){
    Object.keys(allButtons).forEach(function(type){
        allButtons[type].forEach(function(buttons){
            var attr = fillBoxes(buttons.button.element);
            var chld = buttons.button.box.childNodes.length-1;
            buttons.button.box.insertBefore(attr, buttons.button.box.childNodes[chld]);
            
        });
    })
}

// creating buttons object
createSidebar();
document.getElementById("allButtons").checked = true;
getButtons(nodeOfDownloadButtons);
getButtons(nodeOfBuyButtons);
addAtributesToBox();
showVisibleOnly();

// ------------------- buttons object is completely created

// toggling

function toggleVisibleBoxes(){
    var hideInvisible = document.getElementById("visibleOnPage");
    if (hideInvisible.checked){
        Object.keys(allButtons).forEach(function(type){
            allButtons[type].forEach(function(buttons){
                if (!buttons.button.box.className.includes("hide-non-visible")){
                    if (buttons.button.visible == false){
                        buttons.button.box.classList.add("hide-non-visible");
                    }
                }                 
            });
        })
    } else {
        var filters = document.getElementsByName("filter-buttons");
        filters.forEach(function(filter){
        if (filter.checked){
            if (filter.id == "allButtons") {
                showAll();
                showVisibleOnly(); 
            } else if (filter.id == "errorButtons"){
                showAll();
                showVisibleOnly();
                filterErrors();    
            } else if (filter.id == "allBuyButtons"){
                showAll();
                showVisibleOnly();
                allDownloadsBuys("download");
            } else if (filter.id == "allDownloadButtons"){
                showAll();
                showVisibleOnly();
                allDownloadsBuys("buy");
            }
        } 
    })
    }
}

function filterButtons(){
    var filters = document.getElementsByName("filter-buttons");
    filters.forEach(function(filter){
        if (filter.checked){
            if (filter.id == "allButtons") {
                showAll();
                showVisibleOnly();
                toggleVisibleBoxes(); 
            } else if (filter.id == "errorButtons"){
                showAll();
                showVisibleOnly();
                filterErrors();
                toggleVisibleBoxes();    
            } else if (filter.id == "allBuyButtons"){
                showAll();
                showVisibleOnly();
                allDownloadsBuys("download");
                toggleVisibleBoxes();
            } else if (filter.id == "allDownloadButtons"){
                showAll();
                showVisibleOnly();
                allDownloadsBuys("buy");
                toggleVisibleBoxes();
            }
        } 
    })
}

// listeners

var filteringButtons = document.getElementsByName("filter-buttons");
filteringButtons.forEach(function(filterButton){
    filterButton.addEventListener("change", filterButtons);
})

var showHideVisible = document.getElementById("visibleOnPage");
showHideVisible.addEventListener("change", toggleVisibleBoxes); 

document.getElementById("closeCross").addEventListener("click", function(){closeAddon(allButtons)});

window.addEventListener("hashchange", function(){
    showAll();
    showVisibleOnly();
    filterButtons();
});

var selects = document.querySelectorAll("select");
var btns = allButtonNodes(allButtons);
selects.forEach(function(select){
    select.addEventListener("change", function(){
        deleteAddonData(allButtons);
        allButtons = {};
        var newBtns = document.querySelectorAll("a[href*='download-thank-you.php'],a[href*='/download'],a[href*='play.google.com'],a[href*='apps.apple.com'],a[href*='ipm.store.avast.com'],a[href*='store.avast.com'],a[href*='ipm.store-sl.avast.com'],a[href*='store-nw.avast.com'],a[href*='store-sl.avast.com'],a[href*='ipm.store-ap.avast.com'],a[href*='store-cb.avast.com'],a[href*='ipm.store-cb.avast.com'],a[href*='shop.avg.com'],a[href*='checkout.hidemyass.com'],a[href*='/pricing']")  //document.querySelectorAll("a[href*='download-thank-you.php']:not([id]),a[href*='/download']:not([id]),a[href*='play.google.com']:not([id]),a[href*='apps.apple.com']:not([id]),a[href*='ipm.store.avast.com']:not([id]),a[href*='store.avast.com']:not([id]),a[href*='ipm.store-sl.avast.com']:not([id]),a[href*='store-nw.avast.com']:not([id]),a[href*='store-sl.avast.com']:not([id]),a[href*='ipm.store-ap.avast.com']:not([id]),a[href*='store-cb.avast.com']:not([id]),a[href*='ipm.store-cb.avast.com']:not([id]),a[href*='shop.avg.com']:not([id]),a[href*='checkout.hidemyass.com']:not([id]),a[href*='/pricing']:not([id])");
        getButtons(newBtns); 
        addAtributesToBox();
        showVisibleOnly();
        filterButtons();
    })
})
