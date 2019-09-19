sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";
	
	var iCounterPressMe = 0,
		iCounterClickMe = 0;
	
	return Controller.extend("com.chlv.sample.controller.panel.CounterPanel", {
		
		// Handlers
		// ------------------------------------------------------------------------------------------------------------------------
		
		onPress: function (oEvent) {
			var iCounter = 0;
			var sCounterId = "";
			var oPressedButton = oEvent.getSource();
			var sRelativeId = this.getView().getLocalId(oPressedButton.getId());

			// Check which button was pressed and add 1 to counter
			switch (sRelativeId) {
				case "pressMeButton":
					iCounter = ++iCounterPressMe;
					sCounterId = "pressMeCounter";
					break;
				case "clickMeButton":
					iCounter = ++iCounterClickMe;
					sCounterId = "clickMeCounter";
					break;
				default:
					return;
			}

			// Show counter
			var oInputCounter = this.byId(sCounterId);
			oInputCounter.setValue(iCounter);

			// Get message from resource bundle
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			var sMessage = oResourceBundle.getText("messagePressedButton", [
				oPressedButton.getText(),
				iCounter
			]);

			// Show message
			MessageToast.show(sMessage);
		}
	});

});