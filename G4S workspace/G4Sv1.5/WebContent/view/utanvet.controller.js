﻿jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
sap.ui.controller("sap.ui.demo.myFiori.view.utanvet", {
	
	onBeforeRendering: function(){ // binding model synchronisation
		window.globalUtanvetView = this.getView(); 
        this.getView().addDelegate({ onAfterShow: function(evt) { 
        	var total = 0;
        	sap.ui.getCore().getModel().read("/Item", null, {
    		}, true, function(response) {
    			for(var i = 0; i < 5000; i++){
    				total += sap.ui.getCore().getModel().getProperty("/Item(" + response.results[i].Id + ")/Price");	
    				globalUtanvetView.byId("total_id").setNumber(total);
    			}		
    		});
        }});
	},

	handleNavButtonPress : function(evt) {
		this.nav.back("Master");
	},

	close: function(){
		sap.ui.getCore().getModel().read("/Courier", null, {
		}, true, function(response) {
			sap.m.MessageBox.confirm(bundle.getText("UtanvetDialogMsg"), function(
					oAction) {			
				if (sap.m.MessageBox.Action.OK === oAction){
					var summa = globalUtanvetView.byId("sum").getValue();
					sap.ui.getCore().getModel().setProperty("/Courier(" + "48" + ")/Sum", summa);	
					sap.ui.getCore().getModel().submitChanges();
					sap.ui.getCore().getModel().updateBindings(true);
					sap.ui.getCore().getModel().forceNoCache(true);
					globalUtanvetView.byId("sum").setValue();
				}
			},
			   
			   bundle.getText("UtanvetDialogTitle")
			);
				
		});
	},
	
	

});