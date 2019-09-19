sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.chlv.samples.controller.panel.CompositeBindingPanel", {
		
		// Formatter
		// --------------------------------------------------------------------------------

		formatName: function (sGender, sFirstName, sLastName) {
			var sTitle = "Mrs.";

			if (sGender === "M") {
				sTitle = "Mr.";
			}

			if (!sLastName) {
				return sTitle + " " + sFirstName;
			}

			return sTitle + " " + sFirstName + " " + sLastName;
		},

		formatBirthday: function (iDay, iMonth, iYear) {
			var aPrefix = ["", "", ""];

			if (iYear >= 0 && iYear <= 99) {
				aPrefix[0] = "19";
			}

			if (iMonth >= 1 && iMonth <= 9) {
				aPrefix[1] = "0";
			}

			if (iDay >= 1 && iDay <= 9) {
				aPrefix[2] = "0";
			}

			return aPrefix[0] + iYear + "/" + aPrefix[1] + iMonth + "/" + aPrefix[2] + iDay;
		},

		formatContactName: function (sFirstName, sLastName, sAlias, sPhone) {
			if (sAlias) {
				return `${sFirstName} ${sLastName} (${sAlias}) - ${sPhone}`;
			}
			return `${sFirstName} ${sLastName} - ${sPhone}`;
		}
		
	});

});