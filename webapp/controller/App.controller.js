sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
	"use strict";
	
	var iCounterPressMe = 0,
		iCounterClickMe = 0;
	
	return Controller.extend("com.chlv.samples.controller.App", {
		
		// Lifecycle hooks
		// --------------------------------------------------------------------------------
		
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
			
			// Set products model
			var oProductCollection = new JSONModel("model/ProductCollection.json");
			oProductCollection.setDefaultBindingMode("OneWay");
			oView.setModel(oProductCollection, "products");
			
			// Set formatting model
			var oFormattingModel = new JSONModel({
				gender: "F",
				firstName: "Leticia",
				lastName: "Ramírez",
				balance: 98765.123456789
			});
			oView.setModel(oFormattingModel, "formatting");
			
			// Set text toogle controls button
			this._setTextToogleControlsButton(oData.enabled);
			
			// Set binding element relativeAddressContainer
			var oRelativeAddressContainer = this.byId("relativeAddressContainer");
			oRelativeAddressContainer.bindElement("/address");
		},
		
		// Handlers
		// --------------------------------------------------------------------------------
		
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
		
		onProductSelectionChange: function (oEvent) {
			var oSelectedProduct = oEvent.getParameter("selectedItem"),
				oContext = oSelectedProduct.getBindingContext("products"),
				sPath = oContext.getPath(),
				oProductObject = this.getView().getModel("products").getObject(sPath),
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
		},
        
        // Private
		// --------------------------------------------------------------------------------
		
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
