// Function definitions

function getTopLevelDomain_(url) {
  if (!url) return "direct";
  var a = document.createElement('a');
  a.href = url;
  try {
    return a.hostname.match(/^(www\.)?(.+?)(\/.*)?$/)[2];
  } catch (squelch) {
    return '';
  }
}

function getAllUrlParameters_(url){
	var params = {};
	var parser = document.createElement('a');
	parser.href = url.toLowerCase();
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
}

function getCookie_(name) {
  var cookies = '; ' + document.cookie
  var cvals = cookies.split('; ' + name + '=');
  if (cvals.length > 1) {
    return cvals.pop().split(';')[0];
  }
}

function containsKnownReferrer(ref){
  if (!knownReferrers.hasOwnProperty(ref)) {
    return "unknown";
  } else {
    return "known";
  }
}

function selectAffSource(){
  if (urlParametersArray.includes("affiliate")) {
    affSource = "avantgate";
    // console.log(affSource);
    return affSource;
  } else if (allUrlParameters.utm_source.toLowerCase().includes("a8")){
    affSource = "a8";
    // console.log(affSource);
    return affSource;
  } else if (Object.keys(affiliates).includes(allUrlParameters.utm_source)) {
    affSource = allUrlParameters.utm_source;
    // console.log(affSource);
    return affSource;
  } else {
    affSource = "other";
    // console.log(affSource);
    return affSource;
  }
}

function affiliateSegmentCode() {
  if (urlParametersArray.includes('affiliate')) {
      return affiliates[selectAffSource()];
  } else if (allUrlParameters.hasOwnProperty('utm_medium')) {
    if (allUrlParameters['utm_medium'].toLowerCase() == 'affiliate'){
      return affiliates[selectAffSource()]
    } else {
      return "";
    }
  } else {
    return "";
  }
}

/* check if utm_campaign is set */
function isCampaignSet() {
  if (allUrlParameters.hasOwnProperty('utm_campaign')){
    return allUrlParameters.utm_campaign;
  } else {
    return '(not set)';
  }
}

/* check if utm_medium is set */
function isMediumSet() {
  if (allUrlParameters.hasOwnProperty('utm_medium')){
    return allUrlParameters.utm_medium;
  } else {
    return '(not set)';
  }
}
/* check if utm_source is set */
function isSourceSet() {
  if (allUrlParameters.hasOwnProperty('utm_source')){
    return allUrlParameters.utm_source;
  } else {
    return '(not set)';
  }
}

function trSrcCode_(){
  var currentDate = new Date();
  var yearCode =  currentDate.getFullYear() - 2016;
  var monthCode = currentDate.getMonth();
  var trSrc = output.srcSegment + '_' + output.segmentCode + yearCode + monthSymbol[monthCode];
  //console.log("trSrc: " + trSrc);
  return trSrc;
}

function iniSrcCode_(){
  var iniSrc = "source=" + output.name + "|" + "medium=" + output.medium + "|" + "campaign=" + output.campaign + "|" + "segmentCode=" + output.segmentCode;
  //console.log("iniSrc: " + iniSrc);
  return iniSrc;
}

function iniSrc_trSrc(ini, tr){
  return trSrcCode_() + "||" + iniSrcCode_();
}

function isPpcSegmentCode(){
  if (allUrlParameters.hasOwnProperty('ppc')){
    return allUrlParameters.ppc.charAt(0); //if you want just first character e.g. "a"
  } else {
    return "";
  }
}

function referringDomainCheck(){
  if (referringDomain == "direct" && allUrlParameters.utm_source == "seznam") {
    return "seznam"
  } else {
    return referringDomain;
  }
}

// přidat check na existenci cookie!!!
function createCookie_(name, value, expiration, path, domain) {
  if (!getCookie_(name)) {
    var str = name + '=' + value + ';';
    if (expiration) str += 'Expires=' + expiration.toGMTString() + ';';
    if (path) str += 'Path=' + path + ';';
    if (domain) str += 'Domain=' + domain + ';';
    //console.log('has been created');
    document.cookie = str;
  } else {
    //console.log('has not been created');
  }
}

function setCookieExpiration_(){
  if(document.location.href.includes('secureline') || document.location.href.includes('vpn') || document.location.href.includes('hidemyass') ){ // if any VPN then 72 hours
    return 72;
  } else {
    return 2;
  }
}

function includes(str,arr) {
  if(arr.indexOf(str) >= 0){
    return true;
  } else {
    return false;
  }

}

function getPageId_(){
  if (dataLayer){
    for (i = 0; i < dataLayer.length; i++){
      if (dataLayer[i].hasOwnProperty("pageId")){
        return dataLayer[i].pageId;
      }
    }
  } else {
    return '0';
  }
}

function ppcSrcSegment_(){
  if (allUrlParameters.hasOwnProperty('ppc_code')){
    return allUrlParameters.ppc_code
  } else {
    return '001'
  }

}

// Variable definitions

var topLevelDomain = getTopLevelDomain_(document.location.hostname); // top level domain of landingpage, e.g. "avast.com"
var referringDomain = getTopLevelDomain_(document.referrer).split(".")[0]; // top level domain of the referrer if exist, e.g. "google.com"
var hostnameWithTLD = getTopLevelDomain_(document.referrer);
var allUrlParameters = getAllUrlParameters_(document.location.href); //returns all URL parameters as key:value
var sessionCookie = getCookie_('__utmzzses');
var urlParametersArray = Object.keys(allUrlParameters);
var trafficSource = "";
var output = {};
var trafficMedium = "";
var cookieExpiration = new Date(+new Date() + 1000 * 60 * 60 * setCookieExpiration_());

// If new affiliate becomes a partner, just add the line e.g. 'newaffiliate':'e'
var affiliates = {
    'avantgate':'a',
    'commissionjunction':'b',
    'indexa':'c',
    'a8':'d',
    'other':'z'
  }

var monthSymbol = ['a','b','c','d','e','f','g','h','i','j','k','l'];

/*

if new source is added, just add the new key: e.g.:
'newgoogle': {
    'name': 'newgoogle',
    'segmentCode': 'h', // or next letter in line
    'medium': 'organic',
    'srcSegment': '003',
    'campaign': isCampaignSet()

*/
var knownReferrers = {
    'google': {
        'name': 'google',
        'segmentCode': 'a',
        'medium': 'organic',
        'srcSegment': '003',
        'campaign': isCampaignSet()
    },
    'bing': {
        'name': 'bing',
        'segmentCode': 'b',
        'medium': 'organic',
        'srcSegment': '003',
        'campaign': isCampaignSet()
    },
    'yahoo': {
        'name': 'yahoo',
        'segmentCode': 'c',
        'medium': 'organic',
        'srcSegment': '003',
        'campaign': isCampaignSet()
    },
    'duckduckgo': {
        'name': 'duckduckgo',
        'segmentCode': 'd',
        'medium': 'organic',
        'srcSegment': '003',
        'campaign': isCampaignSet()
    },
    'yandex': {
        'name': 'yandex',
        'segmentCode': 'e',
        'medium': 'organic',
        'srcSegment': '003',
        'campaign': isCampaignSet()
    },
    'seznam': {
        'name': 'seznam',
        'segmentCode': 'f',
        'medium': 'organic',
        'srcSegment': '003',
        'campaign': isCampaignSet()
    },
    'baidu': {
        'name': 'baidu',
        'segmentCode': 'g',
        'medium': 'organic',
        'srcSegment': '003',
        'campaign': isCampaignSet()
    },
    // Organic ends

    'facebook': {
        'name': 'facebook',
        'segmentCode': 'a',
        'medium': 'social',
        'srcSegment': '004',
        'campaign': isCampaignSet()
    },
    't': {
        'name': 'twitter',
        'segmentCode': 'b',
        'medium': 'social',
        'srcSegment': '004',
        'campaign': isCampaignSet()
    },
    'twitter': {
        'name': 'twitter',
        'segmentCode': 'b',
        'medium': 'social',
        'srcSegment': '004',
        'campaign': isCampaignSet()
    },
    'instagram': {
        'name': 'instagram',
        'segmentCode': 'c',
        'medium': 'social',
        'srcSegment': '004',
        'campaign': isCampaignSet()
    },
    'linkedin': {
        'name': 'linkedin',
        'segmentCode': 'd',
        'medium': 'social',
        'srcSegment': '004',
        'campaign': isCampaignSet()
    },
    'pinterest': {
        'name': 'pinterest',
        'segmentCode': 'e',
        'medium': 'social',
        'srcSegment': '004',
        'campaign': isCampaignSet()
    },
    'youtube': {
        'name': 'youtube',
        'segmentCode': 'a',
        'medium': 'video',
        'srcSegment': '005',
        'campaign': isCampaignSet()
    },
    'vimeo': {
        'name': 'vimeo',
        'segmentCode': 'b',
        'medium': 'video',
        'srcSegment': '005',
        'campaign': isCampaignSet()
    },
    // Social ends

    'ppc': {
        'name': referringDomainCheck(),
        'segmentCode': isPpcSegmentCode(), // if PPC it has always a ppc parameter
        'medium': 'ppc',
        'srcSegment': ppcSrcSegment_(),
        'source': referringDomainCheck(),
        'campaign': isCampaignSet()
    },
    'affiliate': {
        'name': isSourceSet(),
        'medium': 'affiliate',
        'srcSegment': '002',
        'segmentCode': affiliateSegmentCode(),
        'campaign': isCampaignSet()
    },
    'email': {
        'name': 'email',
        'medium': 'email',
        'srcSegment': '006',
        'segmentCode': 'a',
        'campaign': isCampaignSet()
    },
    'reseller': {
        'name': 'reseller',
        'medium': isMediumSet(),
        'srcSegment': '007',
        'segmentCode': 'b',
        'campaign': isCampaignSet()
    },
    'customUTMs': {
        'name': isSourceSet(),
        'medium': isMediumSet(),
        'srcSegment': '007',
        'segmentCode': 'a',
        'source': isSourceSet(),
        'campaign': isCampaignSet()
    },
    'microsoft': {
        'name': 'microsoft',
        'medium': isMediumSet(),
        'srcSegment': '008',
        'segmentCode': 'c',
        'source': isSourceSet(),
        'campaign': isCampaignSet()
    },
    'forest': {
        'name': 'forest',
        'medium': 'referral',
        'srcSegment': '008',
        'segmentCode': 'b',
        'campaign': isCampaignSet()
    },
    'otherReferrer': {
        'name': hostnameWithTLD,
        'medium': 'referral',
        'srcSegment': '008',
        'segmentCode': 'a',
        'campaign': isCampaignSet()
    },
    'direct': {
        'name': 'direct',
        'medium': '(none)',
        'srcSegment': '999',
        'segmentCode': 'a',
        'campaign': isCampaignSet()
    },
    'fallback': {
        'name': '(Other)',
        'medium': '(none)',
        'srcSegment': '007',
        'segmentCode': 'z',
        'campaign': isCampaignSet()
    }
}


var unknownReferral = containsKnownReferrer(referringDomain);
var affiliateType = "";
var aquisitionSource = "";
var affSource = "";
var cookieValue__srcCookie = "";
var cookieValue__trSrc = "";


// Code starts here

  if (urlParametersArray[0].length > 0) { // If there at least one parameter in URL
    if (urlParametersArray.includes('ppc')){
      output = knownReferrers['ppc'];
      //console.log(output);
    } else if (urlParametersArray.includes('affiliate')){
      output = knownReferrers['affiliate'];
      //console.log(output);
    } else if (urlParametersArray.includes('utm_medium') || urlParametersArray.includes('utm_source') || urlParametersArray.includes('utm_campaign')) {
        if (allUrlParameters.utm_medium.toLowerCase() == 'affiliate'){
          output = knownReferrers['affiliate'];
          //console.log(output);
        } else if (allUrlParameters.utm_medium.toLowerCase() == 'social') {
          output = knownReferrers[referringDomain];
          //console.log(output);
        } else if (allUrlParameters.utm_medium.toLowerCase() == 'email') {
          output = knownReferrers['email'];
          //console.log(output);
        } else if (allUrlParameters.utm_source.toLowerCase() == 'reseller') { // is it reseller utm_medium=link&utm_source=reseller
          output = knownReferrers['reseller'];
          //console.log(output);
        } else if (allUrlParameters.utm_source.toLowerCase() == 'microsoft') { // is it reseller utm_medium=link&utm_source=reseller
          output = knownReferrers['microsoft'];
          //console.log(output);
        } else {
          output = knownReferrers['customUTMs'];
          //console.log(output);
          // console.log(trafficMedium);
        }
    } else {
      output = knownReferrers['fallback'];
    }
  } else if (unknownReferral == "known") { // Known referrer in knownReferrers object
      output = knownReferrers[referringDomain];
      //console.log(output);
  } else if (unknownReferral == "unknown") { // unknown referrer
      output = knownReferrers['otherReferrer'];
      //console.log(output);
  } else {
      output = knownReferrers['direct'];
      //console.log(output);
  }

cookieValue__srcCookie = iniSrc_trSrc(iniSrcCode_(),trSrcCode_());
//console.log(cookieValue__srcCookie);
createCookie_('__srcCookie', cookieValue__srcCookie, cookieExpiration, "/", topLevelDomain);

cookieValue__trSrc = trSrcCode_();
//console.log(cookieValue__trSrc);
createCookie_('__trSrc', cookieValue__trSrc, cookieExpiration, "/", topLevelDomain);
// return cookieValue__srcCookie;
createCookie_('pglpid', getPageId_(), cookieExpiration, "/", topLevelDomain);
