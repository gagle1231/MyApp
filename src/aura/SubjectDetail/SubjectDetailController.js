/**
 * Created by ge.Kim on 2023-08-30.
 */

({
    fnInit: function(component, event, helper){
        var action = component.get("c.getSubject");
        action.setParams({
            recordId: component.get("v.recordId")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var returnValue = response.getReturnValue();
                component.set("v.objSubject", returnValue);
                console.log(returnValue.Name);
            }
        });
        $A.enqueueAction(action);
    },
    fnConvertState: function(component, event, handler){
        var action = component.get("c.convertState");
                action.setParams({
                    recordId: component.get("v.recordId")
                });
                action.setCallback(this, (response) => {
                    var state = response.getState();
                    if(state === "SUCCESS"){
                         var resultsToast = $A.get("e.force:showToast");
                                resultsToast.setParams({
                                    "title": "Subject 완료!",
                                    "message": "목표를 하나 더 달성하셨네요, 축하드립니다. 🎉",
                                    "type": "success"
                                });
                         resultsToast.fire();
                         $A.get('e.force:refreshView').fire();
                    }else{

                    }
                });
        $A.enqueueAction(action);
    }
});