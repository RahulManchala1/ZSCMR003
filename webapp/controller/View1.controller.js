/*
* PD Confidential.(Indefinite)
*
* Process: "List of Forecasting Information for KD Table (ZSCMRE003)"
* Function: "List of Forecasting Information for KD Table (cds_zmsd_zma038f01)"
*
* Date Affiliation Name Change Management Number and Details
*----------------------------------------------------------------------*
* 2026/09/29 Deloitte USI  Venkata Rahul Manchala  Newly developed ZSCMRE003 SAP S/4HANA
*/
 
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.mm.zscmr003.controller.View1", {
               /**
         * Initializes the controller lifecycle.
         * Attaches a lifecycle event interceptor to the SmartFilterBar initialization trigger,
         * dynamically computes a future-pointing date range spanning from the day after the 
         * start of the current month to the end of the year 9999, and pre-populates the target filter parameters.
         * @param {sap.ui.base.Event} oEvent - The initialization lifecycle step trigger payload.
         * @returns {void} No return value
         */
        onInit: function (oEvent) {
            // MessageToast.show("Custom handler invoked.");
            const oSmartFilterBar = this.byId("listReportFilter");
            
            if (oSmartFilterBar) {
                // Ensure initialization routines execute only after structural filter layouts finish assembling
                oSmartFilterBar.attachInitialized(function () {
                    const oDateRange = oSmartFilterBar.getControlByKey("duedat");
                    
                    if (oDateRange) {
                        const oToday = new Date();
                        const oStartDate = new Date(
                            oToday.getFullYear(),
                            oToday.getMonth(),
                            1
                        );
                        
                        // Dynamically offset start threshold to target the subsequent calendar day
                        const oNextday = new Date(oStartDate);
                        oNextday.setDate(oStartDate.getDate() + 1);

                        // Define absolute upper timeline boundary limits targeting December 31, 9999
                        const oEndDate = new Date(9999, 11, 31);
                        const oLastDate = new Date(oEndDate);
                        oLastDate.setDate(oLastDate.getDate() + 1);
                        
                        // Internal localized formatting routine to map Date structures to clean ISO string slices
                        const fnFormatDate = function (oDate) {
                            return oDate.toISOString().split("T")[0]; // Yields standard YYYY-MM-DD strings
                        };

                        // Structure the criteria properties block matching standard dynamic query schemas
                        const oJSONData = {
                            duedat: {
                                low: fnFormatDate(oNextday),
                                high: fnFormatDate(oLastDate)
                            }
                            // duedat: oStartDate
                        };
                        
                        // Bind parameters back to update the global workspace state parameters smoothly without erasing user settings
                        oSmartFilterBar.setFilterData(oJSONData, true);
                    }
                });
            }
        }

    });
});