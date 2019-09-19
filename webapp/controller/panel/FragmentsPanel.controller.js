sap.ui.define([
	"com/chlv/samples/controller/BaseController",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter"
], function (BaseController, Fragment, Filter) {
	"use strict";

	return BaseController.extend("com.chlv.samples.controller.panel.FragmentsPanel", {
		
		// Lifecycle Hooks
		// ------------------------------------------------------------------------------------------------------------------------
		
		onInit: function() {
			// Set new Text control with local rocket id
			this.byId("localContainer").addItem(
				new sap.m.Text({ text: `#${this.byId("localRocket").getId()}` })
			);
			
			// Set binding element relativeAddressContainer from Address Fragment
			this.byId("relativeAddressContainer").bindElement("/address");
			this.byId(Fragment.createId("relativeAddressFragment", "relativeAddressContainer")).bindElement("/address");
		},
		
		// Handlers
		// ------------------------------------------------------------------------------------------------------------------------
		
		onFragmentInstantiation: function(iMode) {
    		var oContainerInstantiation = this.byId("programmaticallyContainer" + iMode);
			var sId = "";
			
			if(!oContainerInstantiation) {
				return;
			}
			
			switch(iMode) {
				case 0:
					break;
				case 1:
					sId = "myFragment";
					break;
				case 2:
					sId = this.getView().getId();
					break;
				case 3:
					sId = this.createId("myFragment");
					break;
			}
			
			Fragment.load({
				name: "com.chlv.samples.view.fragment.Rocket",
				id: sId
			}).then(function(oContent) {
				oContainerInstantiation.addItem(oContent);
				oContainerInstantiation.addItem(new sap.m.Text({ text: `#${oContent.getId()}` }));
			});
		},
		
		onOpenHelloDialog: function () {
			var oView = this.getView(),
				oHelloDialog = this.byId("helloDialog");
				
			if (!oHelloDialog) {
				Fragment.load({
					id: oView.getId(),
					name: "com.chlv.samples.view.fragment.HelloDialog",
					controller: this
				}).then(function (oDialog) {
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				oHelloDialog.open();
			}
		},

		onCloseHelloDialog: function () {
			this.byId("helloDialog").close();
		},
		
		onValueHelpRequest: function() {
			var oView = this.getView(),
				oCategoryFilterDialog = this.byId(Fragment.createId("productsTableWithCategoryFilter", "categoryFilterDialog"));
				
			if (!oCategoryFilterDialog) {
				Fragment.load({
					id: this.createId("productsTableWithCategoryFilter"),
					name: "com.chlv.samples.view.fragment.CategoryFilterSelectDialog",
					controller: this
				}).then(function (oDialog) {
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				oCategoryFilterDialog.open();
			}
		},
		
		handleSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("text", sap.ui.model.FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},
		
		handleClose: function(oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem"),
				oInput = this.byId(Fragment.createId("productsTableWithCategoryFilter", "categoryFilterInput"));
			
			if (oSelectedItem) {
				oInput.setValue(oSelectedItem.getTitle());
			}

			if (!oSelectedItem) {
				oInput.resetProperty("value");
			}
			
			this._updateFilters(oInput.getValue());
		},
		
		// Private
		// ------------------------------------------------------------------------------------------------------------------------
		
		_updateFilters: function(sCategory) {
			var aFilters = [];
			
			if (sCategory && sCategory.length > 0) {
				var filter = new Filter("Category", sap.ui.model.FilterOperator.EQ, sCategory);
				aFilters.push(filter);
			}

			// Update select binding
			var oSelect = this.byId(Fragment.createId("productsTableWithCategoryFilter", "products"));
			var oItemAggregation = oSelect.getBinding("items");
			oItemAggregation.filter(aFilters, "Application");
		}
	});

});