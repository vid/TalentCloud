var LookupAPI = {};

LookupAPI.lookupMap = {};
LookupAPI.loadsInProgress = 0;
LookupAPI.deferredPopulates = [];
LookupAPI.deferredPopulateElements = [];

LookupAPI.loadLookupData = function() {
    //DivisionAPI.getDivisions(locale);
    //BranchAPI.getBranches(locale);
    var locales = ["en_CA", "fr_CA"];
    //var lookupTypes = ["department", "branch", "division", "province", "jobterm"];
    var lookupTypes = ["department", "province", "jobterm", "skill_level", "experience_level"];
    for(i in locales) {
        for (j in lookupTypes) {
            var locale = locales[i];
            var lookupType = lookupTypes[j];
            LookupAPI.getLookupData(lookupType, locale);
        }
    }
};


LookupAPI.getLookupData = function(lookupType, locale){    
    var lookup_URL = DataAPI.baseURL+"/"+locale+"/Lookup/"+lookupType;
    //console.log('Talent cloud url data:   ' + talentcloudData_URL);
    //var talentcloudData_URL = "/wiremock/mappings/GET_ContentByLocale.json";//TEMPORARY for bh.browse_job_seekers branch

    var lookupData_xhr = new XMLHttpRequest();
    if ("withCredentials" in lookupData_xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      lookupData_xhr.open("GET", lookup_URL);

    } else if (typeof XDomainRequest !== "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      lookupData_xhr = new XDomainRequest();
      lookupData_xhr.open("GET", lookup_URL);

    } else {

      // Otherwise, CORS is not supported by the browser.
      lookupData_xhr = null;

    }
    
    lookupData_xhr.addEventListener("progress",
    function(evt){
        DataAPI.talentcloudDataUpdateProgress(evt);
    },false);
    lookupData_xhr.addEventListener("load",
    function(evt){
        LookupAPI.addToLookupMap(lookupType, locale, lookupData_xhr.response);
        LookupAPI.loadsInProgress = LookupAPI.loadsInProgress - 1;
        if (LookupAPI.loadsInProgress == 0) {
            LookupAPI.processDeferredPopulates();
            LookupAPI.processDeferredPopulateElements();
        }
    },false);
    lookupData_xhr.addEventListener("error",DataAPI.transferFailed,false);
    lookupData_xhr.addEventListener("abort",DataAPI.transferAborted,false);

    LookupAPI.loadsInProgress = LookupAPI.loadsInProgress + 1;
    lookupData_xhr.send();
};

LookupAPI.addToLookupMap = function(lookupType, locale, response) {
    if (!LookupAPI.lookupMap[locale]) {
        LookupAPI.lookupMap[locale] = {};
    }
    if (!LookupAPI.lookupMap[locale][lookupType]) {
        LookupAPI.lookupMap[locale][lookupType] = {};
    }
    LookupAPI.lookupMap[locale][lookupType] = JSON.parse(response);
};

LookupAPI.getLocalizedLookupValue = function(lookupType, valueId) {
    var locale = TalentCloudAPI.getLanguageFromCookie();
    var elements = LookupAPI.lookupMap[locale][lookupType];
    for (i in elements) {
        if (elements[i].id == valueId) {
            return elements[i].value;
        }
    }
    return null;
}

// populates elements passed by element id
LookupAPI.populateDropdown = function(lookupType, elementId){
    if (LookupAPI.loadsInProgress > 0) {
        LookupAPI.deferPopulate(lookupType, elementId);
    } else {
        var selectElem = document.getElementById(elementId);    
        if(selectElem){        
            var locale = TalentCloudAPI.getLanguageFromCookie();
            var lookupList = LookupAPI.lookupMap[locale][lookupType];
            if (lookupList) {
                Utilities.clearSelectOptions(selectElem);
                for(var item in lookupList) {
                    var option = document.createElement("option");
                    option.value = lookupList[item].id;
                    option.innerHTML = lookupList[item].value;
                    selectElem.appendChild(option);
                }
            }
        }
    }
};

LookupAPI.deferPopulate = function(lookupType, elementId) {
    LookupAPI.deferredPopulates.push({lookupType : lookupType, elementId :elementId});
};

LookupAPI.processDeferredPopulates = function() {
    while (LookupAPI.deferredPopulates.length > 0) {
        var populate = LookupAPI.deferredPopulates.pop();
        LookupAPI.populateDropdown(populate.lookupType, populate.elementId);
    }
};

//Populates select elements passed directly
LookupAPI.populateDropdownElement = function(lookupType, element){
    if (LookupAPI.loadsInProgress > 0) {
        LookupAPI.deferPopulateElements(lookupType, element);
    } else {
        if(element){        
            var locale = TalentCloudAPI.getLanguageFromCookie();
            var lookupList = LookupAPI.lookupMap[locale][lookupType];
            if (lookupList) {
                Utilities.clearSelectOptions(element);
                for(var item in lookupList) {
                    var option = document.createElement("option");
                    option.value = lookupList[item].id;
                    option.innerHTML = lookupList[item].value;
                    element.appendChild(option);
                }
            }
        }
    }
};

LookupAPI.deferPopulateElements = function(lookupType, element) {
    LookupAPI.deferredPopulateElements.push({lookupType : lookupType, element :element});
};

LookupAPI.processDeferredPopulateElements = function() {
    while (LookupAPI.deferredPopulateElements.length > 0) {
        var populate = LookupAPI.deferredPopulateElements.pop();
        LookupAPI.populateDropdownElement(populate.lookupType, populate.element);
    }
};