sap.ui.define([
	"sap/ui/core/mvc/Controller",
], function (Controller) {
	"use strict";

	return Controller.extend("com.chlv.samples.controller.panel.DefaultModelPanel", {
		
		// Lifecycle Hooks
		// ------------------------------------------------------------------------------------------------------------------------
		
		onBeforeRendering:  function () {
			var bEnable = this.getView().getModel().getProperty("/enabled");
			
			// Set text toogle controls button
			this._setTextToggleControlsButton(bEnable);

			// Set binding element relativeAddressContainer
			var oRelativeAddressContainer = this.byId("relativeAddressContainer");
			oRelativeAddressContainer.bindElement("/address");
		},
		
		// Handlers
		// ------------------------------------------------------------------------------------------------------------------------
		
		onToggleEnabledControls: function () {
			var oModel = this.getView().getModel();
			var bNewEnabled = oModel.getProperty("/enabled") ? false : true;

			oModel.setProperty("/enabled", bNewEnabled);
			this._setTextToggleControlsButton(bNewEnabled);
		},
		
		// Private
		// ------------------------------------------------------------------------------------------------------------------------
		
		_setTextToggleControlsButton: function (bEnabled) {
			var oToggleControlsButton = this.byId("toggleControlsButton");

			if (bEnabled) {
				oToggleControlsButton.setText(this._getTextResourceBundle("textDisableControlsButton"));
			} else {
				oToggleControlsButton.setText(this._getTextResourceBundle("textEnableControlsButton"));
			}
		},

		_getTextResourceBundle: function (sKey, aArgs) {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			return oResourceBundle.getText(sKey, aArgs);
		}

	});

});