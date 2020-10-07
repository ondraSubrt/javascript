function picker(json_file, publicId, containerName){
    var mktTags = [];
    var mkt_types = ['awct', 'flc', 'bzi', 'qpx', 'uslt', 'sp', 'gclidw', 'img', 'abtGeneric', 'ta', 'adm',
    'asp', 'awc', 'awj', 'baut', 'bb', 'bsa', 'cts', 'csm', 'mpm', 'mpr', 'cegg', 'crto',
    'dstag', 'fls', 'm6d', 'ela', 'gcs', 'ts', 'hjtc', 'infinity', 'sca', 'k50Init',
    'll', 'ljs', 'ms', 'messagemate', 'mf', 'ndcr', 'nudge', 'okt', 'omc', 'pa', 'pc',
    'pntr', 'placedPixel', 'pijs', 'qcm', 'fxm', 'scjs', 'scp', 'sfc', 'sfl', 'sfr', 'svw',
    'shareaholic', 'tdlc', 'tdsc', 'tc', 'tdc', 'twitter_website_tag', 'uspt', 'vei', 'veip',
    'vdc', 'xpsh', 'yieldify', 'zone', 'html', 'cvt_1039428_1453', 'cvt_1039428_1500'];
    var tagArray = json_file.tag; // upravit cestu na exportované kontejnery
    var pushObj = {};
    for (var i = 0; i < tagArray.length; i++){
        for (var j = 0; j < mkt_types.length; j++){
            if (tagArray[i].type == mkt_types[j]){
                if (tagArray[i].type == "html" && tagArray[i].name.match(/facebook|yahoo|pixel|capterra|sklik|A8FLY|Bing|Demandbase|Dstillery|Optimizely|Outbrain|Sales Force|Set Cookie|Softonic|Spiceworks|Twitter|Yandex/gi)){
                    //console.log(tagArray[i].name);   
                    var htmlObj = {
                        'gtm': publicId,
                        'publicId': containerName,
                        'name': tagArray[i].name,
                        'type': "html",
                        'parameters': {
                            'script': tagArray[i].parameter[0].value
                        } 
                    }
                    mktTags.push(htmlObj)
                } else {
                    //console.log(tagArray[i].name);
                    /* START awct tags ---------------------------------------------- */
                    if(tagArray[i].type == "awct"){
                        for (var k = 0; k < tagArray[i].parameter.length; k++){
                            if (tagArray[i].parameter[k].key == "conversionId"){
                                var conversionID = tagArray[i].parameter[k].value;
                            }
                            if (tagArray[i].parameter[k].key == "conversionLabel"){
                                var conversionLabel = tagArray[i].parameter[k].value;
                            }  
                        } 
                        pushObj = {
                            'gtm': publicId,
                            'publicId': containerName,
                            'name': tagArray[i].name,
                            'type': "ads",
                            'parameters': {
                                'conversionID': conversionID,
                                'conversionLabel': conversionLabel
                            } 
                        }  
                    mktTags.push(pushObj)   
                    /* END awct tags ---------------------------------------------- */                   
                    /* START sp tags ---------------------------------------------- */
                    } else if (tagArray[i].type == "sp"){
                        for (var k = 0; k < tagArray[i].parameter.length; k++){
                            if (tagArray[i].parameter[k].key == "conversionId"){
                                var conversionID = tagArray[i].parameter[k].value;
                            }
                        } 
                        pushObj = {
                            'gtm': publicId,
                            'publicId': containerName,
                            'name': tagArray[i].name,
                            'type': "ads",
                            'parameters': {
                                'conversionID': conversionID
                            } 
                        }  
                    mktTags.push(pushObj)   
                    /* END sp tags ---------------------------------------------- */   
                    /* START baut tags ---------------------------------------------- */
                    } else if (tagArray[i].type == "baut"){
                        for (var k = 0; k < tagArray[i].parameter.length; k++){
                            if (tagArray[i].parameter[k].key == "tagId"){
                                var tagID = tagArray[i].parameter[k].value;
                            }
                        } 
                        pushObj = {
                            'gtm': publicId,
                            'publicId': containerName,
                            'name': tagArray[i].name,
                            'type': "bing",
                            'parameters': {
                                'tagId': tagID
                            } 
                        }  
                    mktTags.push(pushObj)   
                    /* END baut tags ---------------------------------------------- */   
                    /* START bzi tags ---------------------------------------------- */
                    } else if (tagArray[i].type == "bzi"){
                        for (var k = 0; k < tagArray[i].parameter.length; k++){
                            if (tagArray[i].parameter[k].key == "id"){
                                var id = tagArray[i].parameter[k].value;
                            }
                        } 
                        pushObj = {
                            'gtm': publicId,
                            'publicId': containerName,
                            'name': tagArray[i].name,
                            'type': "linkedIn",
                            'parameters': {
                                'id': id
                            } 
                        }  
                    mktTags.push(pushObj)   
                    /* END bzi tags ---------------------------------------------- */   
                    /* START flc tags ---------------------------------------------- */
                    } else if (tagArray[i].type == "flc"){
                        for (var k = 0; k < tagArray[i].parameter.length; k++){
                            if (tagArray[i].parameter[k].key == "groupTag"){
                                var groupTag = tagArray[i].parameter[k].value;
                            }
                            if (tagArray[i].parameter[k].key == "activityTag"){
                                var activityTag = tagArray[i].parameter[k].value;
                            }
                            if (tagArray[i].parameter[k].key == "advertiserId"){
                                var advertiserId = tagArray[i].parameter[k].value;
                            }
                        } 
                        pushObj = {
                            'gtm': publicId,
                            'publicId': containerName,
                            'name': tagArray[i].name,
                            'type': "DCM",
                            'parameters': {
                                'groupTag': groupTag,
                                'activityTag': activityTag,
                                'advertiserId': advertiserId
                            } 
                        }  
                    mktTags.push(pushObj)   
                    /* END flc tags ---------------------------------------------- */   
                    /* START img tags ---------------------------------------------- */
                    } else if (tagArray[i].type == "img"){
                        for (var k = 0; k < tagArray[i].parameter.length; k++){
                            if (tagArray[i].parameter[k].key == "url"){
                                var url = tagArray[i].parameter[k].value;
                            }
                        } 
                        pushObj = {
                            'gtm': publicId,
                            'publicId': containerName,
                            'name': tagArray[i].name,
                            'type': "image",
                            'parameters': {
                                'url': url
                            } 
                        }  
                    mktTags.push(pushObj)   
                    /* END img tags ---------------------------------------------- */   
                    /* START uslt tags ---------------------------------------------- */
                    } else if (tagArray[i].type == "uslt"){
                        for (var k = 0; k < tagArray[i].parameter.length; k++){
                            if (tagArray[i].parameter[k].key == "url"){
                                var url = tagArray[i].parameter[k].value;
                            }
                        } 
                        pushObj = {
                            'gtm': publicId,
                            'publicId': containerName,
                            'name': tagArray[i].name,
                            'type': "upsellit",
                            'parameters': {
                                'url': url
                            } 
                        }  
                    mktTags.push(pushObj)   
                    /* END uslt tags ---------------------------------------------- */   
                    /* START qpx tags ---------------------------------------------- */
                    } else if (tagArray[i].type == "qpx"){
                        for (var k = 0; k < tagArray[i].parameter.length; k++){
                            if (tagArray[i].parameter[k].key == "pixel_id"){
                                var pixel_id = tagArray[i].parameter[k].value;
                            }
                        } 
                        pushObj = {
                            'gtm': publicId,
                            'publicId': containerName,
                            'name': tagArray[i].name,
                            'type': "quora",
                            'parameters': {
                                'pixel_id': pixel_id
                            } 
                        }  
                    mktTags.push(pushObj);   
                    /* END qpx tags ---------------------------------------------- */   
                    /* START cvt_1039428_1453 - reddit tags ---------------------------------------------- */
                    } else if (tagArray[i].type == "cvt_1039428_1453"){
                        for (var k = 0; k < tagArray[i].parameter.length; k++){
                            if (tagArray[i].parameter[k].key == "id"){
                                var id = tagArray[i].parameter[k].value;
                            }
                        } 
                        pushObj = {
                            'gtm': publicId,
                            'publicId': containerName,
                            'name': tagArray[i].name,
                            'type': "reddit",
                            'parameters': {
                                'id': id
                            } 
                        }  
                    mktTags.push(pushObj);   
                    /* END cvt_1039428_1453 - reddit tags ---------------------------------------------- */   
                    /* START cvt_1039428_1500 - facebook tags ---------------------------------------------- */
                    } else if (tagArray[i].type == "cvt_1039428_1500"){
                        for (var k = 0; k < tagArray[i].parameter.length; k++){
                            if (tagArray[i].parameter[k].key == "pixelId"){
                                var pixelId = tagArray[i].parameter[k].value;
                            }
                        } 
                        pushObj = {
                            'gtm': publicId,
                            'publicId': containerName,
                            'name': tagArray[i].name,
                            'type': "facebook",
                            'parameters': {
                                'pixelId': pixelId
                            } 
                        }  
                    mktTags.push(pushObj);   
                    /* END cvt_1039428_1500 - facebook tags ---------------------------------------------- */   
                    } else {
                        pushObj = {
                            'gtm': publicId,
                            'publicId': containerName,
                            'name': tagArray[i].name,
                            'type': tagArray[i].type
                        }
                        mktTags.push(pushObj);
                    }                                     
                }   
            }
        }
    }  
return mktTags;
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const fs = require('fs'),
    path = require('path'),
    {google} = require('googleapis'),
    gtm_ids = ["GTM-596DMHZ", "GTM-KVL44ZQ", "GTM-NRXZHWS", "GTM-PQL2XC", "GTM-W4ZLWTS", 
    "GTM-K53WCHZ", "GTM-N4XFCLC", "GTM-P4J5LNG", "GTM-PZ48F8", "GTM-WJ6HXT2", "GTM-K6Z7XWM", 
    "GTM-N82JSCH", "GTM-PLLVGVQ", "GTM-T4D4D4X", "GTM-WZLVDCV", "GTM-KDR423C", "GTM-NND769W", 
    "GTM-PMT5LP4", "GTM-W4S4Q6S"], // GTM-596DMHZ", "GTM-KVL44ZQ", "GTM-NRXZHWS", "GTM-PQL2XC", "GTM-W4ZLWTS", "GTM-K53WCHZ", "GTM-N4XFCLC", "GTM-P4J5LNG", "GTM-PZ48F8", "GTM-WJ6HXT2", "GTM-K6Z7XWM", "GTM-N82JSCH", "GTM-PLLVGVQ", "GTM-T4D4D4X", "GTM-WZLVDCV", "GTM-KDR423C", "GTM-NND769W", "GTM-PMT5LP4", "GTM-W4S4Q6S add to array
    auth = new google.auth.GoogleAuth({
        keyFile: './credentials.json',
        scopes: ['https://www.googleapis.com/auth/tagmanager.edit.containers', 'https://www.googleapis.com/auth/tagmanager.readonly']
    }),
    gtm = google.tagmanager({
        version: 'v2',
        auth
    });

(async () => {
    let gtmContainersJSON = await gtm.accounts.containers.list({
        parent: 'accounts/46794940'
    });
    let gtmContainerIds = [];
    for (var k = 0; k < gtmContainersJSON.data.container.length; k++) {
        
            gtmContainerIds.push({
                'accountId': gtmContainersJSON.data.container[k].accountId,
                'containerId': gtmContainersJSON.data.container[k].containerId,
                'publicId': gtmContainersJSON.data.container[k].publicId,
                'containerName': gtmContainersJSON.data.container[k].name
            });    
            sleep(1000);
            if (gtm_ids.includes(gtmContainerIds[k].publicId)){
                try {
                let gtmLiveContainer = await gtm.accounts.containers.versions.live({
                    parent: 'accounts/' + gtmContainerIds[k].accountId + '/containers/' + gtmContainerIds[k].containerId
                }); 
                await fs.promises.writeFile(path.join(__dirname, gtmContainerIds[k].publicId + '.json'),JSON.stringify(gtmLiveContainer.data, null, '\t'))
                } catch (error) {
                    console.error(error);
                }
        }    
    }
    
    console.log(gtmContainerIds);

    let allMarketingTags = [];
    for (let gtms = 0; gtms < gtmContainerIds.length; gtms++){
        if (gtm_ids.includes(gtmContainerIds[gtms].publicId)){
            let jsonString = await fs.promises.readFile(path.join(__dirname, gtmContainerIds[gtms].publicId + '.json'), 'utf-8'),
            json = JSON.parse(jsonString);
            allMarketingTags = allMarketingTags.concat(picker(json, gtmContainerIds[gtms].publicId, gtmContainerIds[gtms].containerName));
            console.log(allMarketingTags.length);
        }
    }  
    var out = JSON.stringify(allMarketingTags);
    // writefile.js
    fs.writeFile('parse_all.txt', out, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
        // success case, the file was saved
        console.log('saved!');
        console.log("length of the array: " + allMarketingTags.length);

    })
})();

