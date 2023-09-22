/**
 * Created by ge.Kim on 2023-08-30.
 */

({
    fnInit : function(component, event, helper){
         var action = component.get("c.getSubjectAchievementRate");
         action.setParams({
             recordId: component.get("v.recordId")
         });
         action.setCallback(this, (response) => {
             const state = response.getState();
             if(state === "SUCCESS"){
                 var subject =  response.getReturnValue();
                 component.set("v.rate", subject.AchievementRate__c);
             }
         });
         $A.enqueueAction(action);
    }
});