/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.SliderRenderer");sap.m.SliderRenderer={};sap.m.SliderRenderer.CSS_CLASS="sapMSlider";
sap.m.SliderRenderer.render=function(r,s){var e=s.getEnabled(),t=s.getTooltip_AsString(),C=sap.m.SliderRenderer.CSS_CLASS;if(!s.getVisible()){return}r.write("<div");r.addClass(C);if(!e){r.addClass(C+"Disabled")}r.addStyle("width",s.getWidth());r.addStyle("visibility","hidden");r.writeClasses();r.writeStyles();r.writeControlData(s);if(t){r.writeAttributeEscaped("title",t)}r.write(">");r.write('<div');r.addClass(C+"Inner");if(!e){r.addClass(C+"InnerDisabled")}r.writeClasses();r.writeStyles();r.write(">");if(s.getProgress()){this.renderProgressIndicator(r,s)}this.renderHandle(r,s);r.write("</div>");if(s.getName()){this.renderInput(r,s)}r.write("</div>")};
sap.m.SliderRenderer.renderProgressIndicator=function(r,s){r.write("<div");r.writeAttribute("id",s.getId()+"-progress");r.addClass(sap.m.SliderRenderer.CSS_CLASS+"Progress");r.addStyle("width",s._sProgressValue);r.writeClasses();r.writeStyles();r.write("></div>")};
sap.m.SliderRenderer.renderHandle=function(r,s){var e=s.getEnabled(),v=s.getValue();r.write("<span");r.writeAttribute("id",s.getId()+"-handle");r.writeAttribute("title",v);r.addClass(sap.m.SliderRenderer.CSS_CLASS+"Handle");r.addStyle(sap.m.Slider._bRtl?"right":"left",s._sProgressValue);r.writeAccessibilityState(s,{role:"slider",orientation:"horizontal",valuemin:s.getMin(),valuemax:s.getMax(),valuenow:v,valuetext:v,live:"assertive",disabled:!e});r.writeClasses();r.writeStyles();if(e){r.writeAttribute("tabindex","0")}r.write("></span>")};
sap.m.SliderRenderer.renderInput=function(r,s){r.write('<input type="text" class="'+sap.m.SliderRenderer.CSS_CLASS+'Input"');if(!s.getEnabled()){r.write("disabled")}r.writeAttributeEscaped("name",s.getName());r.writeAttribute("value",s.getValue());r.write("/>")};
