sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.chlv.samples.controller.panel.DynamicBindingPanel", {
		
		// Handlers
		// ------------------------------------------------------------------------------------------------------------------------
		
		onChangeDataModel: function () {
			this._updateModelData();
		},

		onBindingProperty: function () {
			var sModel = this.byId("bindingModel").getSelectedKey() || undefined,
				sPath = this.byId("bindingPath").getValue(),
				oBindingObject = this.byId("bindingObject"),
				oModel = this.getView().getModel(sModel),
				vObject = oModel.getObject(sPath);

			oBindingObject.setValue(JSON.stringify(vObject, null, "\t"));
		},

		onSubmitUpdateModelData: function () {
			this._updateModelData();
		},

		onToogleEditBindingValue: function () {
			var oInputBindingValue = this.byId("bindingObject"),
				oSaveButton = this.byId("save"),
				bNewEnabledValue = oInputBindingValue.getEnabled() ? false : true;

			oSaveButton.setEnabled(bNewEnabledValue);
			oInputBindingValue.setEnabled(bNewEnabledValue);
		},

		onSaveBindingObject: function () {
			var sModel = this.byId("bindingModel").getSelectedKey() || undefined,
				sPath = this.byId("bindingPath").getValue(),
				oBindingObject = this.byId("bindingObject"),
				oModel = this.getView().getModel(sModel),
				vData = JSON.parse(oBindingObject.getValue());

			oModel.setProperty(sPath, vData);
			this._updateModelData();
		},
		
		// Private
		// ------------------------------------------------------------------------------------------------------------------------

		_updateModelData: function () {
			var sModel = this.byId("bindingModel").getSelectedKey(),
				oModelDataTextArea = this.byId("modelData"),
				oModel = this.getView().getModel(sModel ? sModel : undefined);

			// Update text area
			oModelDataTextArea.setValue(JSON.stringify(oModel.getData(), null, "\t"));
		}

	});

});