sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("com.chlv.samples.controller.panel.ProductIndexPanel", {
		
		// Handlers
		// ------------------------------------------------------------------------------------------------------------------------
		
		onChangeProductIndex: function (oEvent) {
			var sIndex = oEvent.getParameter("value");

			// If index is empty return
			if (!sIndex) {
				return;
			}

			var oModel = this.getView().getModel("products");
			var oProduct = oModel.getObject("/" + sIndex);
			var oProductDetailsContainer = this.byId("productDetailsContainer");
			var oProductObjectTextArea = this.byId("productObject");
			var sMessage = "";

			// Check if product exist
			if (!oProduct) {
				oProductDetailsContainer.unbindElement("products");
				oProductObjectTextArea.setValue("");
				sMessage = this._getTextResourceBundle("messageProductNotFound");
				MessageToast.show(sMessage);
				return;
			}

			// Update text area value
			oProductObjectTextArea.setValue(JSON.stringify(oProduct, null, "\t"));

			// Set new bind element [sap.ui.core.Element]
			oProductDetailsContainer.bindElement("products>/" + sIndex);

			// Show message
			sMessage = this._getTextResourceBundle("messageDisplayingDetails", [oProduct.ProductId, sIndex]);
			MessageToast.show(sMessage);
		},
		
		// Private
		// ------------------------------------------------------------------------------------------------------------------------
		
		_getTextResourceBundle: function (sKey, aArgs) {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			return oResourceBundle.getText(sKey, aArgs);
		}

	});

});