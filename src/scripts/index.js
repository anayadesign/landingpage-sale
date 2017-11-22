var saleList = [{
  "name": "Ready to hang art",
  "galleryId": "30735",
  "galleryLink": "/gallery/id--b30735/ready-to-hang-art-posters.htm ",
  "saleType": "percentage",
  "saleTypeThreshold": true,
  "saleAmount": "XX% Off"
}, {
  "name": "Wood mount art",
  "galleryId": "444180",
  "galleryLink": "/gallery/id--b444180/wood-mount-art-posters.htm ",
  "saleType": "percentage",
  "saleTypeThreshold": false,
  "saleAmount": "XX% Off"
}, {
  "name": "Photos to art",
  "landingPageId": "p2a",
  "galleryLink": "/photostoart",
  "saleType": "dollar",
  "saleAmount": "$X.23"
},
{
  "name": "Popular framed art",
  "galleryId": "711808",
  "galleryLink": "/gallery/id--b711808/most-popular-framed-collections-posters.htm ",
  "saleType": "percentage",
  "saleAmount": "XX% Off"
},
{
  "name": "Canvas art",
  "galleryId": "266767",
  "galleryLink": "/gallery/id--b266767/canvas-art-gallery-posters.htm ",
  "saleType": "percentage",
  "saleTypeThreshold": false,
  "saleAmount": "XX% Off"
}, {
  "name": "Best Sellers",
  "galleryId": "155704",
  "galleryLink": "/gallery/id--b155704/best-sellers-posters.htm ",
  "saleType": "dollar",
  "saleAmount": "$X.24"
}, {
  "name": "Affordable art & photography",
  "galleryId": "1969415",
  "galleryLink": "/gallery/id--b1969415/affordable-art-and-photography-posters.htm ",
  "saleType": "dollar",
  "saleAmount": "$X.YZ"
}]
//var galleryId = "1822"
function loadProducts(galleryIdNum) {
  var galleryAmount = 3;
  var galleryZone = 3;
  var galleryCurrency = "USD";
  var apiEndpoint           = "https://ws-search.art.com/wcf/SearchService.svc/ajax/GetSearchResultInSimpleFormat?";
  //changes
  var apiDefineGallery      = "Refinements=" + galleryIdNum;
  var apiProductLimit       = "&RecordsPerPage=" + galleryAmount;
  var apiPageNumber         = "&PageNumber=1";
  var apiCustomerZoneId     = "&CustomerZoneId=" + galleryZone;
  //changes
  var apiDefineGallery2     = "&SortBy=P_c" + galleryIdNum;

  var apiCurrencyCode       = "&CurrencyCode=" + galleryCurrency;
  var apiLanguageId         = "&LanguageId=1";
  var apiFilterSpecialItems = "&FilterSpecialItems=false";

  var apiCall = apiEndpoint + apiDefineGallery + apiProductLimit + apiPageNumber + apiCustomerZoneId + apiDefineGallery2 + apiCurrencyCode + apiLanguageId + apiFilterSpecialItems;
  $.get(apiCall, function(data) {
    //return the gallery product data, with [galleryAmount] = # of products
    //console.log(data.ImageDetails);

    //for each image
    for (var i = 0; i < data.ImageDetails.length; i++) {
      //these are the image urls we want
      var productImages = data.ImageDetails[i].UrlInfo.GenericImageURL
      //these are where we want to put the images
      var theProductElements = $('.saleModule[data-galleryId="'+ galleryIdNum +'"] .saleProduct')
      //this is how we'll put them there
      var theProductImageTemplate = '<img src="'+ productImages + '" />'
      //Nike
      theProductElements.eq(i).html(theProductImageTemplate)

      //$('div[data-galleryId="'+ galleryIdNum +'"]').html(testTemplate);
      //match the list gallery id with the data-attribute on teh DOM
      // var testTemplate = '<img src="'+ productImages + '" />'
      // $('div[data-galleryId="'+ galleryIdNum +'"]').html(testTemplate);
    }
  });
}
function loadSaleAmounts(galleryIdNum, saleTypeName, saleAmountNum, saleTypeThreshold) {
  //console.log(saleAmountNum);
  var theSaleElements = $('.saleModule[data-galleryId="'+ galleryIdNum +'"] .saleInfo-amount');
  var theSaleElementsDesignator = $('.saleModule[data-galleryId="'+ galleryIdNum +'"] .saleInfo-amount .saleInfo-amount-designator');
  var theSaleElementsActual = $('.saleModule[data-galleryId="'+ galleryIdNum +'"] .saleInfo-amount .saleInfo-amount-actual');
  // condition if saleTypeName is Percentage or dollar
  if (saleTypeName === 'percentage' && saleTypeThreshold) {
    //is pergentage off with Up To
    var templateDesignatorText = 'Up to';
    var templateActualText = saleAmountNum;

    for (var i = 0; i < theSaleElements.length;i++) {
      theSaleElementsDesignator.eq(i).html(templateDesignatorText);
      theSaleElementsActual.eq(i).html(templateActualText);
    }
  } else if (saleTypeName === 'percentage' && !saleTypeThreshold) {
    //is percentage off without "up to"
    var templateActualText = saleAmountNum;

    for (var i = 0; i < theSaleElements.length;i++) {
      theSaleElementsDesignator.eq(i).remove();
      theSaleElementsActual.eq(i).html(templateActualText);
    }
  } else {
    //is dollar amount
    var templateDesignatorText = 'As low as';
    var templateActualText = saleAmountNum;

    for (var i = 0; i < theSaleElements.length;i++) {
      theSaleElementsDesignator.eq(i).html(templateDesignatorText);
      theSaleElementsActual.eq(i).html(templateActualText);
    }
  }
  //var testTemplate = saleAmountNum;
}

$(document).ready(function(){
  for(var i = 0; i < saleList.length; i++) {
    if(saleList[i].galleryId != undefined) {
      loadProducts(saleList[i].galleryId);
      //LoadSaleAmounts
      loadSaleAmounts(saleList[i].galleryId, saleList[i].saleType, saleList[i].saleAmount, saleList[i].saleTypeThreshold)

      //console.log("#" + i + " " + saleList[i].name);
    } else {
      loadSaleAmounts(saleList[i].landingPageId, saleList[i].saleType, saleList[i].saleAmount, saleList[i].saleTypeThreshold)
      //handle LP
      //console.log("#" + i + " " + saleList[i].name + " gallery is not defined")
    }
  }
})
