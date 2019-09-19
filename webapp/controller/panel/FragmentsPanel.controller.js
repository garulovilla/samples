sap.ui.define([
	"com/chlv/samples/controller/BaseController",
	"sap/ui/core/Fragment"
], function (BaseController, Fragment) {
	"use strict";

	return BaseController.extend("com.chlv.samples.controller.panel.FragmentsPanel", {
		
		// Lifecycle Hooks
		// ------------------------------------------------------------------------------------------------------------------------
		
		onInit: function() {
			BaseController.prototype.onInit.apply(this, arguments);
			
			// Set new Text control with local rocket id
			this.byId("localContainer").addItem(
				new sap.m.Text({ text: `#${this.byId("localRocket").getId()}` })
			);
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
		}
	});

});