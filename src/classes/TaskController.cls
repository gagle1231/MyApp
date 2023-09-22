
public with sharing class TaskController {

    @AuraEnabled
    public static Task__c getTask(String recordId){
        Task__c objTask = [SELECT Name, Content__c, isFinished__c, (SELECT Id, Name, isFinished__c FROM To_do_list__r) FROM Task__c WHERE Id = :recordId];
        return objTask;
    }

    @AuraEnabled
    public static void changeState(String recordId){
        Todo__c objTodo = [SELECT Id, isFinished__c FROM Todo__c WHERE Id = :recordId LIMIT 1];
        Boolean boolState = objTodo.isFinished__c;
        objTodo.isFinished__c = !boolState;
        update objTodo;
    }

    @AuraEnabled
    public static Map<String, String> getAddress(String recordId){
        Map<String, String> mapAddress = new Map<String, String>();
        Task__c objTask = [SELECT TaskLocation__City__s, TaskLocation__Street__s FROM Task__c WHERE Id = :recordId];
        if(objTask != null){
            mapAddress.put('City', objTask.TaskLocation__City__s);
            mapAddress.put('Street', objTask.TaskLocation__Street__s);
        }
        return mapAddress;
    }

    @AuraEnabled
    public static void insertTask(Task__c objTask){
        if(objTask != null){
            insert objTask;
        }
    }
//    @AuraEnabled
//    public static void deleteTask(String recordId){
//        Task__c objTask = new Task__c(Id = recordId);
//        delete objTask;
//    }

    @AuraEnabled
    public static Boolean changeFinishState(String recordId){
        Task__c objTask = [SELECT isFinished__c FROM Task__c WHERE Id = :recordId];
        Boolean boolIsFinished = objTask.isFinished__c;
        objTask.isFinished__c = !boolIsFinished;
        update objTask;
        return !boolIsFinished;
    }
}