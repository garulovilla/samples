sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/base/Log"
], function(Controller, Log) {
	"use strict";
	
	return Controller.extend("com.chlv.samples.controller.BaseController", {
		
		// Lifecycle Hooks
		// ------------------------------------------------------------------------------------------------------------------------
		
		/**
		 * Lifecycle hook init
		 * @public
		 */
		onInit: function() {
			Log.info(`onInit - ${this.getView().getId()}`);
		},
		
		/**
		 * Lifecycle hook before rendering
		 * @public
		 */
		onBeforeRendering: function() {
			Log.info(`onBeforeRendering - ${this.getView().getId()}`);
		},
		
		/**
		 * Lifecycle hook after rendering
		 * @public
		 */
		onAfterRendering: function() {
			Log.info(`onAfterRendering - ${this.getView().getId()}`);
		},
		
		/**
		 * Lifecycle hook exit
		 * @public
		 */
		onExit: function() {
			Log.info(`onExit - ${this.getView().getId()}`);
		},
		
		/**
		 * Convenience method for getting the view model by name.
		 * @public
		 * @param {string} [sName] the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel : function (sName) {
			return this.getView().getModel(sName) || this.getOwnerComponent().getModel(sName);
		},
		
		/**
		 * Convenience method for setting the view model.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel : function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},
		
		/**
		 * Getter for the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle : function () {
			return this.getModel("i18n").getResourceBundle();
		},
		
		/**
		 * Get text from resource bundle
		 * @public
		 * @param {string} sKey Key of the text
		 * @param {array} aArgs Arguments
		 * @returns {string} Text
		 */
		getTextResourceBundle: function (sKey, aArgs) {
			return this.getModel("i18n").getResourceBundle().getText(sKey, aArgs);
		},
		
		/**
		 * Convenience method for accessing the router.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		}

	});
	
});