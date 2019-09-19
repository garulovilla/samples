sap.ui.define([
	"com/chlv/samples/controller/BaseController",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (BaseController, MessageToast, JSONModel) {
	"use strict";

	const DEFAULT_EXPANDED_PANEL = "LAST";

	var iCounterPressMe = 0,
		iCounterClickMe = 0;

	return BaseController.extend("com.chlv.samples.controller.App", {

		// Lifecycle hooks
		// ------------------------------------------------------------------------------------------------------------------------

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
				firstName: "Gretchen",
				lastName: "Berg",
				balance: 98765.123456789,
				birthday: {
					day: 1,
					month: 1,
					year: 85
				},
				purchase: {
					creation: {
						date: "20190621",
						time: "235900"
					}
				},
				contacts: [{
					id: 1,
					firstName: "Gretchen",
					lastName: "Berg",
					alias: "Mom",
					group: "Family",
					phone: "123-123-123"
				}, {
					id: 2,
					firstName: "Joni",
					lastName: "Bartlett",
					alias: "Dad",
					group: "Family",
					phone: "234-234-234"
				}, {
					id: 3,
					firstName: "Dillon",
					lastName: "Randall",
					alias: "",
					group: "Work",
					phone: "345-345-345"
				}, {
					id: 4,
					firstName: "Rebekah",
					lastName: "Cochran",
					alias: "Boss",
					group: "Work",
					phone: "456-456-456"
				}]
			});
			oView.setModel(oFormattingModel, "formatting");

			// Get all the names of the panels and set a new JSON model with name "panels"
			this._setPanelsModel();

			// Set models model
			this._setModelsModel();
		},

		// Handlers
		// ------------------------------------------------------------------------------------------------------------------------
		
		onExpandPanel: function (oEvent) {
			var sPanelId = oEvent.getParameter("selectedItem").getKey(),
				oPanelsModel = this.getModel("panels"),
				aPanels = oPanelsModel.getObject("/panels"),
				oPanelToExpand = this.byId(sPanelId);

			// Close all panels
			aPanels.forEach(function (panel) {
				this.byId(panel.id).setExpanded(false);
			}.bind(this));

			// Open selectd panel
			oPanelToExpand.setExpanded(true);
		},

		// Private
		// ------------------------------------------------------------------------------------------------------------------------

		_setPanelsModel: function () {
			var aControls = this.byId("page").getContent();
			var oModel = new JSONModel({
				panels: this._getPanels(aControls)
			});

			this.setModel(oModel, "panels");
			this._expandDefaultPanel();
		},

		_expandDefaultPanel: function () {
			var oPanelsModel = this.getModel("panels"),
				aPanels = oPanelsModel.getObject("/panels"),
				oPanelToExpand = null;

			switch (DEFAULT_EXPANDED_PANEL) {
				case "":
				case "NONE":
					break;
				case "FIRST":
					oPanelToExpand = aPanels[0] || null;
					break;
				case "LAST":
					oPanelToExpand = aPanels[aPanels.length - 1] || null;
					break;
				default:
					oPanelToExpand = aPanels.find(function (oPanel) {
						return oPanel.id.endsWith(DEFAULT_EXPANDED_PANEL);
					});
					break;
			}

			if (oPanelToExpand) {
				var oPanel = this.byId(oPanelToExpand.id);

				oPanelsModel.setProperty("/selected", oPanelToExpand.id);
				oPanel.setExpanded(true);
			}
		},

		_getPanels: function (aControls) {
			var aPanels = [],
				oView = this.getView();

			for (var oControl of aControls) {
				var oMetadata = oControl.getMetadata();

				if (oMetadata.getName() === "sap.m.Panel") {
					var oPanel = {};
					oPanel.id = oView.getLocalId(oControl.getId());
					oPanel.text = oControl.getHeaderText();
					aPanels.push(oPanel);
				} else if (oMetadata.getName() === "sap.ui.core.mvc.XMLView") {
					aPanels = aPanels.concat(this._getPanels(oControl.getContent()));
				}
			}

			return aPanels;
		},

		_setModelsModel: function () {
			var oModel = new JSONModel({
				selected: "",
				info: this._getModels()
			});

			this.setModel(oModel, "models");
		},

		_getModels: function () {
			/* eslint-disable sap-no-ui5base-prop */

			var oModels = this.getView().oModels,
				aModels = [];

			for (var sModelName in oModels) {
				if ({}.hasOwnProperty.call(oModels, sModelName)) {
					var oNewModel = {};
					var oModelProperties = oModels[sModelName];
					oNewModel.key = sModelName === "undefined" ? "" : sModelName;
					oNewModel.description = sModelName === "undefined" ? "default" : sModelName;
					oNewModel.bindingMode = oModelProperties.sDefaultBindingMode;
					aModels.push(oNewModel);
				}
			}

			return aModels;

			/* eslint-enable sap-no-ui5base-prop */
		}

	});
});