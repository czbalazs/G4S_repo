/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.App");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.m.NavContainer");sap.m.NavContainer.extend("sap.m.App",{metadata:{library:"sap.m",properties:{"homeIcon":{type:"any",group:"Misc",defaultValue:null},"backgroundColor":{type:"string",group:"Appearance",defaultValue:null},"backgroundImage":{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},"backgroundRepeat":{type:"boolean",group:"Appearance",defaultValue:false},"backgroundOpacity":{type:"float",group:"Appearance",defaultValue:1}},events:{"orientationChange":{deprecated:true}}}});sap.m.App.M_EVENTS={'orientationChange':'orientationChange'};
sap.m.App.prototype.init=function(){sap.m.NavContainer.prototype.init.apply(this,arguments);this.addStyleClass("sapMApp");jQuery.sap.initMobile({viewport:!this._debugZoomAndScroll,statusBar:"default",hideBrowser:true,preventScroll:!this._debugZoomAndScroll,rootId:this.getId()});jQuery(window).bind("resize",jQuery.proxy(this._handleOrientationChange,this))};
sap.m.App.prototype.onBeforeRendering=function(){if(sap.m.NavContainer.prototype.onBeforeRendering){sap.m.NavContainer.prototype.onBeforeRendering.apply(this,arguments)}jQuery.sap.initMobile({homeIcon:this.getHomeIcon()})};
sap.m.App.prototype.onAfterRendering=function(){if(sap.m.NavContainer.prototype.onAfterRendering){sap.m.NavContainer.prototype.onAfterRendering.apply(this,arguments)}var r=this.getDomRef().parentNode;if(r&&!r._sapui5_heightFixed){r._sapui5_heightFixed=true;while(r&&r!==document.documentElement){var $=jQuery(r);if($.attr("data-sap-ui-root-content")){break}if(!r.style.height)r.style.height="100%";r=r.parentNode}}};
sap.m.App.prototype.exit=function(){jQuery(window).unbind("resize",this._handleOrientationChange);if(this._sInitTimer){jQuery.sap.clearDelayedCall(this._sInitTimer)}};
sap.m.App.prototype._handleOrientationChange=function(){var $=jQuery(window);var i=$.width()>$.height();if(this._oldIsLandscape!==i){this.fireOrientationChange({landscape:i});this._oldIsLandscape=i}};
sap.m.App.prototype.setBackgroundOpacity=function(o){if(o>1||o<0){jQuery.sap.log.warning("Invalid value "+o+" for App.setBackgroundOpacity() ignored. Valid values are: floats between 0 and 1.");return this}this.$("BG").css("opacity",o);return this.setProperty("backgroundOpacity",o,true)};
