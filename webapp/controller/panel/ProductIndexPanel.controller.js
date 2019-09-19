sap.ui.define([
	"com/chlv/samples/controller/BaseController",
	"sap/m/MessageToast"
], function (BaseController, MessageToast) {
	"use strict";

	return BaseController.extend("com.chlv.samples.controller.panel.ProductIndexPanel", {
		
		// Handlers
		// ------------------------------------------------------------------------------------------------------------------------
		
		onChangeProductIndex: function (oEvent) {
			var sIndex = oEvent.getParameter("value");

			// If index is empty return
			if (!sIndex) {
				return;
			}

			var oModel = this.getModel("products");
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
			sMessage = this.getTextResourceBundle("messageDisplayingDetails", [oProduct.ProductId, sIndex]);
			MessageToast.show(sMessage);
		}

	});

});