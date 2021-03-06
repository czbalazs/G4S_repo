jQuery.sap.require("sap.ui.netlife.G4S.util.Formatter");
jQuery.sap.require("sap.ui.netlife.G4S.util.Grouper");
sap.ui.controller("sap.ui.netlife.G4S.view.depoMaster", {
	
	onInit: function(){
		window.globalDepo = this;
		this.getView().addDelegate({ onBeforeShow: function(evt) {
			sap.ui.getCore().getModel().updateBindings(true);
			sap.ui.getCore().getModel().forceNoCache(true)
				var lengthOfAddresses = 0;
				var total = 0;
				globalDepo.byId("list").removeAllItems();
				var paramurl = "$filter=Today eq '1'";
				sap.ui.getCore().getModel().read("/Address", null, paramurl, true, function(response) {
					lengthOfAddresses = response.results.length;
					//startOfIndex = response.results[0].Id;
					for(var i = 0; i <  lengthOfAddresses ; i++){
						sap.ui.getCore().getModel().read("/Address(" + response.results[i].Id + ")" , null, {
							"$expand" : "Items"
						}, true, function(response) {
							if(response.DelStatus != "222"){
								for(var j = 0; j < response.Items.results.length; j++){
									globalDepo.byId("list").addItem(new sap.m.ObjectListItem({icon: "sap-icon://shipping-status", number: response.Items.results[j].ProductId}));
								}		
							}
						});
							}
					
				});
				/*for(var i = 0; i < lengthOfAddresses; i++){
			sap.ui.getCore().getModel().read("/Address(" + i + ")" , null, {
				"$expand" : "Items"
			}, true, function(response) {
				for(var i = 0; i < response.results.length; i++){
					total += sap.ui.getCore().getModel().getProperty("/Items(" + response.Items.results[i].Id + ")/Price");
				}		
			});
				}*/
			
        }});
	
	},
	
	handleNavButtonPress : function(evt) {
		this.nav.back("Master");
	},



});