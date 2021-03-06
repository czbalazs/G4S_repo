﻿jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.ui.core.format.NumberFormat");
jQuery.sap.require("sap.ui.netlife.G4S.util.Formatter");
sap.ui.controller("sap.ui.netlife.G4S.view.utanvet", {
	
	onBeforeRendering: function(){ // binding model synchronisation
		window.globalUtanvetView = this.getView(); 
        this.getView().addDelegate({ onAfterShow: function(evt) { 
        	var total = 0;
        	var yesterdayTotal = 0;
        	//var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" });   
        	$today = new Date();
        	$yesterday = new Date($today);
        	$yesterday.setDate($today.getDate() - 1);
			//yesterdayTotal = new sap.ca.ui.model.format.AmountFormat.FormatAmountShortWithCurrency(yesterdayTotal, HUF, preserve);
			var oNumberFormat = sap.ui.core.format.NumberFormat.getIntegerInstance({maxFractionDigits: 1, minFractionDigits: 0, groupingEnabled: true, groupingSeparator: " ",
				  decimalSeparator: "."});
        	var dd = $yesterday.getDate();
        	var mm = $yesterday.getMonth()+1; //January is 0!
        	
        	if(mm < 10){
        		mm = '0' + mm;
        	}
			
        	var yyyy = $yesterday.getFullYear();
        	var todayFilter = "$filter=Today eq '1' and DelStatus eq '222'"; // a mai sikeres csomagokat összegezzük
        	var lengthOfAddresses = 0;
        	
        	sap.ui.getCore().getModel().read("/Address", null, todayFilter, true, function(response) {
        		lengthOfAddresses = response.results.length;
				for(var i = 0; i < lengthOfAddresses ; i++){
					sap.ui.getCore().getModel().read("/Address(" + response.results[i].Id + ")" , null, {
						"$expand" : "Items"
					}, false, function(response) {
							for(var j = 0; j < response.Items.results.length; j++){
								total += response.Items.results[j].Price;
								globalUtanvetView.byId("total_id").setNumber(oNumberFormat.format(total));
							}	
						
					});
						}	
    		});
        	
        	
        	var yesterdayFilter = "$filter=DeliveryDate eq datetime'" + yyyy + "-" + mm + "-" + dd + "T00:00:00' and DelStatus eq '222'"; //a tegnapi sikeres csomagokat összegezzük
        	sap.ui.getCore().getModel().read("/Address", null, yesterdayFilter, true, function(response) {
        		lengthOfAddresses = response.results.length;
				for(var i = 0; i < lengthOfAddresses ; i++){
					sap.ui.getCore().getModel().read("/Address(" + response.results[i].Id + ")" , null, {
						"$expand" : "Items"
					}, false, function(response) {
							for(var j = 0; j < response.Items.results.length; j++){
								yesterdayTotal += response.Items.results[j].Price;
								globalUtanvetView.byId("yesterday").setNumber(oNumberFormat.format(yesterdayTotal));
							}	
						
					});
						}	
    		});
        	
        }});
	},
	
	

	handleNavButtonPress : function(evt) {
		this.nav.back("Master");
	},	
	

});