sap.ui.define([
	"com/chlv/samples/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.chlv.samples.controller.panel.DefaultModelPanel", {
		
		// Lifecycle Hooks
		// ------------------------------------------------------------------------------------------------------------------------
		
		onBeforeRendering:  function () {
			BaseController.prototype.onBeforeRendering.apply(this, arguments);
			
			var bEnable = this.getModel().getProperty("/enabled");
			
			// Set text toogle controls button
			this._setTextToggleControlsButton(bEnable);

			// Set binding element relativeAddressContainer
			var oRelativeAddressContainer = this.byId("relativeAddressContainer");
			oRelativeAddressContainer.bindElement("/address");
		},
		
		// Handlers
		// ------------------------------------------------------------------------------------------------------------------------
		
		onToggleEnabledControls: function () {
			var oModel = this.getModel();
			var bNewEnabled = oModel.getProperty("/enabled") ? false : true;

			oModel.setProperty("/enabled", bNewEnabled);
			this._setTextToggleControlsButton(bNewEnabled);
		},
		
		// Private
		// ------------------------------------------------------------------------------------------------------------------------
		
		_setTextToggleControlsButton: function (bEnabled) {
			var oToggleControlsButton = this.byId("toggleControlsButton");

			if (bEnabled) {
				oToggleControlsButton.setText(this.getTextResourceBundle("textDisableControlsButton"));
			} else {
				oToggleControlsButton.setText(this.getTextResourceBundle("textEnableControlsButton"));
			}
		}

	});

});