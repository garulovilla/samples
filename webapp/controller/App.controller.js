sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
	"use strict";
	
	var iCounterPressMe = 0,
		iCounterClickMe = 0;
	
	return Controller.extend("com.chlv.samples.controller.App", {
		
		onInit: function () {
			var oView = this.getView();
			
			// Data for default model
			var oData = {
				enabled: true,
				firstName: "Firstname",
				lastName: "Lastname",
				gender: "M",
				birthday: "1990/01/01",
				address: {
					street: "Street",
					zip: "00000",
					city: "City",
					country: "Country",
					number: "0-00-00-00"
				}
			};

			// Set default model
			var oModel = new JSONModel(oData);
			oModel.setDefaultBindingMode("OneWay");
			oView.setModel(oModel);
			
			// Set text toogle controls button
			this._setTextToogleControlsButton(oData.enabled);
		},
		
		onPress: function (oEvent) {
			var iCounter = 0;
			var sCounterId = "";
			var oPressedButton = oEvent.getSource();
			var sRelativeId = this.getView().getLocalId(oPressedButton.getId());
			// var sRelativeId = oPressedButton.getId().split("--")[2]; // Get relative id

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
		},
		
		onToogleEnabledControls: function () {
			var oModel = this.getView().getModel();
			var bNewEnabled = oModel.getProperty("/enabled") ? false : true;
			oModel.setProperty("/enabled", bNewEnabled);
			this._setTextToogleControlsButton(bNewEnabled);
		},
		
		_setTextToogleControlsButton: function (bEnabled) {
			var oToogleControlsButton = this.byId("toogleControlsButton");

			if (bEnabled) {
				oToogleControlsButton.setText(this._getTextResourceBundle("textDisableControlsButton"));
			} else {
				oToogleControlsButton.setText(this._getTextResourceBundle("textEnableControlsButton"));
			}
		},
		
		_getTextResourceBundle: function (sKey, aArgs) {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			return oResourceBundle.getText(sKey, aArgs);
		}
		
	});
});