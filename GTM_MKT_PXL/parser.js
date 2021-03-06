const fs = require('fs'),
    path = require('path');
(async () => {
	let jsonString = await fs.promises.readFile(path.join(__dirname, 'GTM-PZ48F8.json'), 'utf-8'),
		json = JSON.parse(jsonString);
    // Tady si dělej co chceš
    //console.dir(json,{depth:null})
    
    

    /*console.log(json.containerVersion.tag.filter((tag)=>{
        return tag.type === "awct"
    }));*/
    var mktTags = [];
    function picker(json_file){
        var mkt_types = ['awct', 'flc', 'bzi', 'qpx', 'uslt', 'sp', 'gclidw', 'img', 'abtGeneric', 'ta', 'adm',
        'asp', 'awc', 'awj', 'baut', '	bb', 'bsa', 'cts', 'csm', 'mpm', 'mpr', 'cegg', 'crto',
        'dstag', 'fls', 'm6d', 'ela', 'gcs', 'ts', 'hjtc', 'infinity', 'sca', 'k50Init',
        'll', 'ljs', 'ms', 'messagemate', 'mf', 'ndcr', 'nudge', 'okt', 'omc', 'pa', 'pc',
        'pntr', 'placedPixel', 'pijs', 'qcm', 'fxm', 'scjs', 'scp', 'sfc', 'sfl', 'sfr', 'svw',
        'shareaholic', 'tdlc', 'tdsc', 'tc', 'tdc', 'twitter_website_tag', 'uspt', 'vei', 'veip',
        'vdc', 'xpsh', 'yieldify', 'zone', 'html', 'cvt_1039428_1453', 'cvt_1039428_1500'];
        var tagArray = json_file.containerVersion.tag;
        var pushObj = {};
        for (var i = 0; i < tagArray.length; i++){
            for (var j = 0; j < mkt_types.length; j++){
                if (tagArray[i].type == mkt_types[j]){
                    if (tagArray[i].type == "html" && tagArray[i].name.match(/facebook|yahoo|pixel|capterra|sklik|A8FLY|Bing|Demandbase|Dstillery|Optimizely|Outbrain|Sales Force|Set Cookie|Softonic|Spiceworks|Twitter|Yandex/gi)){
                        //console.log(tagArray[i].name);   
                        var htmlObj = {
                            'name': tagArray[i].name,
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
                                'name': tagArray[i].name,
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
                                'name': tagArray[i].name,
                                'parameters': {
                                    'conversionID': conversionID
                                } 
                            }  
                        mktTags.push(pushObj)   
                        /* END sp tags ---------------------------------------------- */   
                        /* START bzi tags ---------------------------------------------- */
                        } else if (tagArray[i].type == "bzi"){
                            for (var k = 0; k < tagArray[i].parameter.length; k++){
                                if (tagArray[i].parameter[k].key == "id"){
                                    var id = tagArray[i].parameter[k].value;
                                }
                            } 
                            pushObj = {
                                'name': tagArray[i].name,
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
                                'name': tagArray[i].name,
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
                                'name': tagArray[i].name,
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
                                'name': tagArray[i].name,
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
                                'name': tagArray[i].name,
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
                                'name': tagArray[i].name,
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
                                'name': tagArray[i].name,
                                'parameters': {
                                    'pixelId': pixelId
                                } 
                            }  
                        mktTags.push(pushObj);   
                        /* END cvt_1039428_1500 - facebook tags ---------------------------------------------- */   
                        } else {
                            pushObj = {
                                'name': tagArray[i].name
                            }
                            mktTags.push(pushObj);
                        }                                     
                    }   
                }
            }
        }  
    return mktTags;
    };
    var out = JSON.stringify(picker(json));
    // writefile.js
    fs.writeFile('parse.txt', out, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
        // success case, the file was saved
        console.log('saved!');
    
    console.log("length of the array: " + mktTags.length);
    
});
    
    /*for (let index = 0; index < mktTags.length; index++) {
        console.log(mktTags[index].name)
    }*/

    
})();
