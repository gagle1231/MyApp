/**
 * Created by ge.Kim on 2023-08-31.
 */

({
    fnInit: function(component, event){
        var action = component.get("c.getAddress");
        action.setParams({
            recordId: component.get("v.recordId")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var mapAddress = response.getReturnValue();
                console.log(mapAddress);
                var mapMarkers = [{
                                 location: {
                                     Street: mapAddress.Street,
                                     City: mapAddress.City,
                                     Country: '대한민국'
                                 },
                                 title: 'Task 장소',
                                 description: 'Task 장소'
                }];
                component.set("v.mapMarkers", mapMarkers);
            }else{
                var mapMarkers = [{
                    location: {Country: '대한민국'},
                    title: 'Task 장소',
                    description: 'Task 장소'
                    }];
                component.set("v.mapMarkers", mapMarkers);
            }
        });
        $A.enqueueAction(action);
    }
});