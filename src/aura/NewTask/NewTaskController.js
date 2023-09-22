/**
 * Created by ge.Kim on 2023-08-31.
 */

({
    fnInit : function(component, event){
        var options = [
            {label: '온라인', value: '온라인'},
            {label: '오프라인', value: '오프라인'},
            {label: '선택x', value: '선택x'}
        ];
        component.set("v.options", options);

    },
    fnBtnAddClick: function(component, event, helper){
        var objTask = {};
        objTask.Subject__c = component.get("v.recordId");
        objTask.Name = component.find("taskName").get("v.value");
        objTask.Content__c = component.find("taskContent").get("v.value");
        objTask.Type__c = component.find("taskType").get("v.value");
        if(objTask.Type__c === "오프라인"){
            objTask.TaskLocation__c = {};
            objTask.TaskLocation__City__s = component.find("taskAddressCity").get("v.value");
            objTask.TaskLocation__Street__s = component.find("taskAddressStreet").get("v.value");
        }else if(objTask.Type__c === "온라인"){
            objTask.SourceLink__c = component.find("taskSourceLink");
        }


        var action = component.get("c.insertTask");
        action.setParams({
            "objTask": objTask
        });
        action.setCallback(this, (response) => {
            var state = response.getState();
            if(state === "SUCCESS"){
                helper.showToast("New Task", "새로운 Task가 추가되었습니다!", "success");
            }else{
                helper.showToast("Fail", "에러가 발생하였습니다.", "error");
            }
             var navEvt = $A.get("e.force:navigateToSObject");
                navEvt.setParams({
                  "recordId": component.get("v.recordId")
                });
                navEvt.fire();
        });
        $A.enqueueAction(action);
    }
});