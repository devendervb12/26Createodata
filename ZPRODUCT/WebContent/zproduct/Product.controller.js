sap.ui.controller("zproduct.Product", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zproduct.Product
*/
	onInit: function() {
		  var serviceURL = "proxy/http/122.180.87.238:8000/sap/opu/odata/SAP/ZGW_BATCH26_PRODUCT_SRV/";
           var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL); //2.0 OData 
           this.getView().setModel(oModel);
         
	},
	
	onItemSelection : function(oEvent){
			
		var prodID = oEvent.getSource().getTitle();		
		this.getView().byId("idVBox").setVisible(true);			
		this.getView().byId("SimpleFormChange354").bindElement("/ProductSet('"+prodID+"')");
		
	
	},
	onCreate : function(){
		// create a dialog box
          var oDialog = new sap.m.Dialog({
        	  title : "Create a Product",
        	  content : [
        		  new sap.m.Label({ text : "Product ID"}),
        		  new sap.m.Input(),
        		  new sap.m.Label({ text : "Name"}),
        		  new sap.m.Input(),
        		  new sap.m.Label({ text : "Category"}),
        		  new sap.m.Input(),
        		  new sap.m.Label({ text : "Description"}),
        		  new sap.m.Input(),
        		  new sap.m.Label({ text : "Supplier ID"}),
        		  new sap.m.Input()
        	  ],
        	  endButton : new sap.m.Button({ text : "Close",
        		  press : function(){ oDialog.close()}}),
        	  beginButton : new sap.m.Button({ text : "Save & Close",
        		press : function(oEvent){
                  debugger;  
               // collect the data
                  var data = {
	                		  ProductID : oEvent.getSource().getParent().getContent()[1].getValue(),
	                		  Name : oEvent.getSource().getParent().getContent()[3].getValue(),
	                		  Category : oEvent.getSource().getParent().getContent()[5].getValue(),
	                		  Description : oEvent.getSource().getParent().getContent()[7].getValue(),
	                		  SupplierID : oEvent.getSource().getParent().getContent()[9].getValue()
                         }
        			// send data to SAP
                  var oModel = this.getView().getModel();
                  
                  oModel.create("/ProductSet", data, {
                	  success : function(){
                		  sap.m.MessageToast.show("Data Created");
                		  
                	  },
                	  error : function(){
                		  sap.mMessageToast.show("Not Created");
                	  }
                  });
                  oEvent.getSource().getParent().close();
        		}.bind(this)
        	
        	  })	  
        	  
          });
          
          oDialog.open();
	}

});