sap.ui.define([
	"com/chlv/samples/controller/BaseController",
	"sap/m/MessageToast"
], function (BaseController, MessageToast) {
	"use strict";
	
	var iCounterPressMe = 0,
		iCounterClickMe = 0;
	
	return BaseController.extend("com.chlv.sample.controller.panel.CounterPanel", {
		
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
			var sMessage = this.getTextResourceBundle("messagePressedButton", [
				oPressedButton.getText(),
				iCounter
			]);

			// Show message
			MessageToast.show(sMessage);
		}
	});

});