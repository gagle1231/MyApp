/**
 * Created by ge.Kim on 2023-08-31.
 */

({
    fnInit: function(component, event, action){
        var action = component.get("c.getTask");
        action.setParams({
            recordId: component.get("v.recordId")
        });
        action.setCallback(this, (response) => {
            var state = response.getState();
            if(state === "SUCCESS"){
                var objTask = response.getReturnValue();
                component.set("v.objTask", objTask);

                var todoList = objTask.To_do_list__r;
                component.set("v.listTodo", todoList);
            }
        });
        $A.enqueueAction(action);
    },
    fnChangeState: function(component, event){
        var id = event.target.id;
        console.log(id);
        var action = component.get("c.changeState");
        action.setParams({recordId: id});
        action.setCallback(this, (response) => {
            var state = response.getState();
            $A.get('e.force:refreshView').fire();
        });
        $A.enqueueAction(action);
    },
    fnEditRecord : function(component, event, helper){
            var editRecordEvent = $A.get("e.force:editRecord");
            editRecordEvent.setParams({
            "recordId": component.get("v.recordId")
            });
            editRecordEvent.fire();
    },
    fnAddToDo: function(component, event){
        var newRecordEvent = $A.get("e.force:createRecord");
        newRecordEvent.setParams({
            "entityApiName": "Todo__c",
            "defaultFieldValues": {
                    'Task__c' : component.get("v.recordId")
                }
        });
        newRecordEvent.fire();
    },
    fnDeleteRecord: function(component, event, helper){
        component.find("recordHandler").deleteRecord($A.getCallback(function(deleteResult) {
        if (deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT") {
            helper.showToast("삭제 완료", "task가 삭제되었습니다.", "success");
        } else if (deleteResult.state === "INCOMPLETE") {
            console.log("User is offline, device doesn't support drafts.");
        } else if (deleteResult.state === "ERROR") {
            console.log('Problem deleting record, error: ' + JSON.stringify(deleteResult.error));
        } else {
            console.log('Unknown problem, state: ' + deleteResult.state + ', error: ' + JSON.stringify(deleteResult.error));
        }
    }));
    },
    handleRecordUpdated: function(component, event, helper) {
        var eventParams = event.getParams();
        if(eventParams.changeType === "CHANGED") {
           console.log('수정됨');// record is changed
        } else if(eventParams.changeType === "LOADED") {
           console.log('로딩중');// record is loaded in the cache
        } else if(eventParams.changeType === "REMOVED") {
             var homeEvent = $A.get("e.force:navigateToObjectHome");
                homeEvent.setParams({
                    "scope": "Task__c"
                });
                homeEvent.fire();
        } else {
            // there’s an error while loading, saving, or deleting the record
        }
    },
    fnFinishTask: function(component, event, helper) { //Task의 완료 상태 변경
        var action = component.get("c.changeFinishState");
        action.setParams({recordId: component.get("v.recordId")});
        action.setCallback(this, (res) => {
            var state = res.getState();
            if(state === "SUCCESS"){
                var isFinished = res.getReturnValue();
                if(isFinished){
                    helper.showToast("Task 완료", "Task가 완료되었습니다! 수고하셨어요.", "success");
                }else{
                    helper.showToast("Task 완료 취소", "Task 완료를 취소하였습니다.", "info");
                }
                $A.get("e.force:refreshView").fire();
            }else{
                helper.showToast("에러 발생", "에러가 발생하였습니다.", "error");
            }
        });
        $A.enqueueAction(action);
    }
});