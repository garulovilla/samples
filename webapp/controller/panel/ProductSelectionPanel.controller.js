sap.ui.define([
	"com/chlv/samples/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.chlv.samples.controller.panel.ProductSelectionPanel", {
		
		// Handlers
		// ------------------------------------------------------------------------------------------------------------------------
		
		onProductSelectionChange: function (oEvent) {
			var oSelectedProduct = oEvent.getParameter("selectedItem"),
				oContext = oSelectedProduct.getBindingContext("products"),
				sPath = oContext.getPath(),
				oProductObject = this.getModel("products").getObject(sPath),
				oProductSelected = this.byId("productSelected"),
				oProductSelectedDetailsContainer = this.byId("productSelectedDetailsContainer");

			// Set product selected data in TextArea
			oProductSelected.setValue(JSON.stringify(oProductObject, null, "\t"));

			// Set new binding context [sap.ui.base.ManagedObject]
			oProductSelectedDetailsContainer.setBindingContext(oContext, "products");

			// Set binding element [sap.ui.core.Element]
			// oProductSelectedDetailsContainer.bindElement({
			// 	path: sPath,
			// 	model: "products"
			// });
		}

	});

});