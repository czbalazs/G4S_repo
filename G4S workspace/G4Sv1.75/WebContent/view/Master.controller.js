jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
sap.ui.controller("sap.ui.demo.myFiori.view.Master", {

	onInit: function(evt){
		var Base64 = {

				// private property
				_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

				// public method for encoding
				encode : function (input) {
					var output = "";
					var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
					var i = 0;

					input = Base64._utf8_encode(input);

					while (i < input.length) {

						chr1 = input.charCodeAt(i++);
						chr2 = input.charCodeAt(i++);
						chr3 = input.charCodeAt(i++);

						enc1 = chr1 >> 2;
						enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
						enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
						enc4 = chr3 & 63;

						if (isNaN(chr2)) {
							enc3 = enc4 = 64;
						} else if (isNaN(chr3)) {
							enc4 = 64;
						}

						output = output +
						this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
						this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

					}

					return output;
				},

				// public method for decoding
				decode : function (input) {
					var output = "";
					var chr1, chr2, chr3;
					var enc1, enc2, enc3, enc4;
					var i = 0;

					input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

					while (i < input.length) {

						enc1 = this._keyStr.indexOf(input.charAt(i++));
						enc2 = this._keyStr.indexOf(input.charAt(i++));
						enc3 = this._keyStr.indexOf(input.charAt(i++));
						enc4 = this._keyStr.indexOf(input.charAt(i++));

						chr1 = (enc1 << 2) | (enc2 >> 4);
						chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
						chr3 = ((enc3 & 3) << 6) | enc4;

						output = output + String.fromCharCode(chr1);

						if (enc3 != 64) {
							output = output + String.fromCharCode(chr2);
						}
						if (enc4 != 64) {
							output = output + String.fromCharCode(chr3);
						}

					}

					output = Base64._utf8_decode(output);

					return output;

				},

				// private method for UTF-8 encoding
				_utf8_encode : function (string) {
					string = string.replace(/\r\n/g,"\n");
					var utftext = "";

					for (var n = 0; n < string.length; n++) {

						var c = string.charCodeAt(n);

						if (c < 128) {
							utftext += String.fromCharCode(c);
						}
						else if((c > 127) && (c < 2048)) {
							utftext += String.fromCharCode((c >> 6) | 192);
							utftext += String.fromCharCode((c & 63) | 128);
						}
						else {
							utftext += String.fromCharCode((c >> 12) | 224);
							utftext += String.fromCharCode(((c >> 6) & 63) | 128);
							utftext += String.fromCharCode((c & 63) | 128);
						}

					}

					return utftext;
				},

				// private method for UTF-8 decoding
				_utf8_decode : function (utftext) {
					var string = "";
					var i = 0;
					var c = c1 = c2 = 0;

					while ( i < utftext.length ) {

						c = utftext.charCodeAt(i);

						if (c < 128) {
							string += String.fromCharCode(c);
							i++;
						}
						else if((c > 191) && (c < 224)) {
							c2 = utftext.charCodeAt(i+1);
							string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
							i += 2;
						}
						else {
							c2 = utftext.charCodeAt(i+1);
							c3 = utftext.charCodeAt(i+2);
							string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
							i += 3;
						}

					}

					return string;
				}

			};
		//var url = "http://sapes1.sapdevcenter.com/sap/opu/odata/sap/ZCD204_EPM_DEMO_SRV/"; 
		
		var tok  = window.usr + ':' + window.pw;
		var hash = Base64.encode(tok);
		var auth = "Basic " + hash;
		
		$.sap.require("jquery.sap.storage");
		//var UI5Storage =  $.sap.storage(jQuery.sap.storage.Type.local);
		window.UI5Storage.remove("Auth");
		window.UI5Storage.put("Auth",auth);
		
		
		var url = "http://office.netlife.hu:8181/futarfioriodataprovider/courierdata.svc/";
		var oModel = new sap.ui.model.odata.ODataModel(url, true, null, null, {Authorization: auth});
		this.getView().setModel(oModel);
		sap.ui.getCore().setModel(oModel);
	},
	onBeforeRendering: function(){
		sap.ui.getCore().getModel().setDefaultCountMode("none");
		window.globalMaster = this;
		this.getView().addDelegate({ onAfterShow: function(evt) {
			sap.ui.getCore().getModel().updateBindings(true);
			sap.ui.getCore().getModel().forceNoCache(true);
        	// $("#signature").jSignature();
			var leadas = 0;
			var lezartLeadas = 0;
			var lezartFelvetel = 0;
			var felvetel = 0;
			var bevet = 0;
			var aktualis = 0;
			var depo = 0;
			globalMaster.getView().getModel().read("/Address", null, {
			}, true, function(response) {	
				for(var i = 0; i < response.results.length; i++){
						if(response.results[i].PicType == 'D' && (response.results[i].DelStatus == '999' || response.results[i].DelStatus == '555' || response.results[i].DelStatus == '111')){
							leadas++;
						}
						if(response.results[i].PicType == 'D' && !(response.results[i].DelStatus == '999' || response.results[i].DelStatus == '555' || response.results[i].DelStatus == '111')){
							lezartLeadas++;
						}
						if(response.results[i].PicType == 'U' && (response.results[i].DelStatus == '999' || response.results[i].DelStatus == '555' || response.results[i].DelStatus == '111')){
							felvetel++;
						}
						if(response.results[i].PicType == 'U' && !(response.results[i].DelStatus == '999' || response.results[i].DelStatus == '555' || response.results[i].DelStatus == '111')){
							lezartFelvetel++;
						}
						if(response.results[i].DelStatus == '999' ){
							aktualis++;
						}
				}
				globalMaster.getView().byId("leadTile").setNumber(leadas);
				globalMaster.getView().byId("leadLezartTile").setNumber(lezartLeadas);
				globalMaster.getView().byId("felvetTile").setNumber(felvetel);
				globalMaster.getView().byId("felvetLezartTile").setNumber(lezartFelvetel);
				globalMaster.getView().byId("aktualisTile").setNumber(aktualis);
			});			
			globalMaster.getView().getModel().read("/Item", null, {
			}, true, function(response) {	
				for(var i = 0; i < response.results.length; i++){
						if(response.results[i].PickupStatus == 'M'){
							bevet++;
						}
					
				}
				globalMaster.getView().byId("bevetTile").setNumber(bevet);
				
				var lengthOfAddresses = 0;
				sap.ui.getCore().getModel().read("/Address", null, {
				}, true, function(response) {
					lengthOfAddresses = response.results.length;
					for(var i = 1; i <= lengthOfAddresses; i++){
						sap.ui.getCore().getModel().read("/Address(" + i + ")" , null, {
							"$expand" : "Items"
						}, true, function(response) {
							if(response.DelStatus != "222"){
								for(var i = 0; i < response.Items.results.length; i++){
									depo++;
									globalMaster.getView().byId("depoTile").setNumber(depo);
								}		
							}
						});
						
				}
					
					
				});
			
				
			});
			
        }});
	
	},
	
	handleBevetelezesPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		if(globalMaster.getView().byId("bevetTile").getNumber() >= 1){
			this.nav.to("bevetMaster", context);
		}
	},
	
	handleFelvetelPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		if(globalMaster.getView().byId("felvetTile").getNumber() >= 1){
			this.nav.to("felvetelMaster", context);
		}
	},
	
	handleAktualisPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		if(globalMaster.getView().byId("aktualisTile").getNumber() >= 1){
			this.nav.to("aktualisMaster", context);
		}
	},
	
	handleLeadasPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		if(globalMaster.getView().byId("leadTile").getNumber() >= 1){
			this.nav.to("leadasMaster", context);
		}
	},
	
	handleUtanvetPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("utanvet", context);
	},
	
	handleLezartFelvetelPress: function(evt){
		var context = evt.getSource().getBindingContext();
		if(globalMaster.getView().byId("felvetLezartTile").getNumber() >= 1){
			this.nav.to("lezartFelvetelMaster", context);
		}
	},
	
	handleLezartLeadasPress: function(evt){
		var context = evt.getSource().getBindingContext();
		if(globalMaster.getView().byId("leadLezartTile").getNumber() >= 1){
			this.nav.to("lezartLeadasMaster", context);
		}
	},
	
	handleDepoPress: function(evt){
		var context = evt.getSource().getBindingContext();
		if(globalMaster.getView().byId("depoTile").getNumber() >= 1){
			this.nav.to("depoMaster", context);
		}
	},	 
	
	   /*handlePhonePress: function(){
		   var b = this.getView().byId("phoneLink").getHref();
		   document.location.href = b;
		},*/

	handlePosPress: function(){
		navigator.geolocation.getCurrentPosition(function onSuccess(position){
			var lat = position.coords.latitude;
			var long = position.coords.longitude; 
			alert('Latitude: '          + position.coords.latitude          + '\n' +
			          'Longitude: '         + position.coords.longitude         + '\n' +
			          'Altitude: '          + position.coords.altitude          + '\n' +
			          'Accuracy: '          + position.coords.accuracy          + '\n' +
			          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
			          'Heading: '           + position.coords.heading           + '\n' +
			          'Speed: '             + position.coords.speed             + '\n' +
			          'Timestamp: '         + position.timestamp                + '\n');
		});
	},
	
	logoff: function(){
		window.UI5Storage.remove("Auth");
		window.loggedin = false;
		this.nav.to("login");
	}

});