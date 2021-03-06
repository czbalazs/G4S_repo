jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
sap.ui.controller("sap.ui.demo.myFiori.view.login", {
	
	onInit: function(){
		$.sap.require("jquery.sap.storage");
		window.UI5Storage =  $.sap.storage(jQuery.sap.storage.Type.local);
		var a = window.UI5Storage.get("Auth");
		if(UI5Storage.get("Auth") != null){
			window.loggedin = true;
		}
	},
	
	onBeforeRendering: function(){ // binding model synchronisation
		window.globalLogin = this;
        this.getView().addDelegate({ onAfterShow: function(evt) {     	     
		     if(window.loggedin === true){
		    	 globalLogin.nav.to("Master");
		     }
        }});
       
	},	
	
	actLogin: function(evt){
		window.usr = this.getView().byId("inpLogin").getValue();
		window.pw = this.getView().byId("inpPWD").getValue();
		this.nav.to("Master");
	}

});