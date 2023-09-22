/**
 * Created by ge.Kim on 2023-09-04.
 */

({
    fnInit: function(component, event){
        var action = component.get("c.getTodo");
        action.setParams({
            recordId: component.get("v.recordId")
        });
        action.setCallback(this, (res) => {
            var state = res.getState();
            if(state === "SUCCESS"){
                var objTodo = res.getReturnValue();
                component.set("v.objTodo", objTodo);
                console.log(objTodo)
            }
        });
        $A.enqueueAction(action);
    },
    fnAddToEvent: function(component, event){
            var objTodo = component.get("v.objTodo");
            var newRecordEvent = $A.get("e.force:createRecord");
            var defaultFieldValues = {
                'Subject' : 'Task: '+ objTodo.Name,
                'StartDateTime' :objTodo.doDate__c,
                'EndDateTime' : objTodo.EndDateTime__c
            }
            console.log(objTodo.Task__r.Type__c)
            if(objTodo.Task__r.Type__c == '온라인'){
                defaultFieldValues.Location = objTodo.Task__r.SourceLink__c;
            }else if(objTodo.Task__r.Type__c == '오프라인'){
                 defaultFieldValues.Location = objTodo.Task__r.TaskLocation__Street__s;
            }
            newRecordEvent.setParams({
                "entityApiName": "Event",
                "defaultFieldValues": defaultFieldValues
            });
            newRecordEvent.fire();
        },
        fnEditBtnClick : function(component, event){
            var editRecordEvent = $A.get("e.force:editRecord");
            editRecordEvent.setParams({
                recordId: component.get("v.recordId")
            });
            editRecordEvent.fire();
        }
});