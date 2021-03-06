jQuery.sap.declare("sap.ui.demo.myFiori.Component");
sap.ui.core.UIComponent.extend("sap.ui.demo.myFiori.Component", {

	createContent : function() {
		window.usr;
		window.pw;
		/*window.globalpw = 0;
		sap.ca.ui.dialog.confirmation.open({
            question : 'You have selected "Reject", Submit?',
            noteMandatory : true,//default value: false; if adding note is mandatory, the Conform button won't be accepted before the user adds the note.
            title : "Submit Decision", 
            confirmButtonLabel : "Submit"
        }, globalpw = this.sNote);*/
		// create root view
		oView = sap.ui.view({
			id : "app",
			viewName : "sap.ui.demo.myFiori.view.App",
			type : "JS",
			viewData : { component : this }
		});
		  var headers ={};
	       headers.Authorization = "Access-Control-Allow-Origin: *";
	       headers.setHeader = "X-Requested-With: JSONHttpRequest";
	       headers.setHeader = "Content-type: application/x-www-form-urlencoded";
		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : "i18n/messageBundle.properties"
		});
		oView.setModel(i18nModel, "i18n");
		
		

		

		
//		// Using OData model to connect against a real service
//		var url = "/proxy/http/<server>:<port>/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
		//var url = "http://office.netlife.hu:8181/futarfioriodataprovider/courierdata.svc/";
		//window.url = "http://sapes1.sapdevcenter.com/sap/opu/odata/sap/ZCD204_EPM_DEMO_SRV/";
		

		
		//oView.setModel(oModel);
		
		// Using a local model for offline development
		//var oModel = new sap.ui.model.json.JSONModel("model/mock.json");
		
		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone : jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
			listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel, "device");

		// done
		return oView;
	},
	

	

});