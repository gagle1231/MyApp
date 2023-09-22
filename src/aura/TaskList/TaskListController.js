/**
 * Created by ge.Kim on 2023-08-29.
 */

({
    getInit : function (component, event, helper){
        var action = component.get("c.getTaskList");
        action.setParams({
            recordId: component.get("v.recordId")
        });
        action.setCallback(this, function(response){
           var state = response.getState();
           if(state == "SUCCESS"){
               var returnValue = response.getReturnValue();
               component.set("v.taskList", returnValue);
               console.log(returnValue);
           }
        });
        $A.enqueueAction(action);
    },
    createTask : function (component, event, helper) {
        var createRecordEvent = $A.get("e.force:createRecord");
        var defaultField = {Subject__c: component.get("v.recordId")}
        createRecordEvent.setParams({
            "entityApiName": "NewTask",
            "defaultFieldValues": defaultField
        });
        createRecordEvent.fire();
    },
    gotoRecordPage : function (component, event, helper) {
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
          "url": '/'+event.target.value,
        });
        urlEvent.fire();
    }

});