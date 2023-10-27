/************************************************************************************
 * Description :
 *
 * Ver      Date           Author          Modification
 * ===================================================================================
   1.0      2023-09-04       ge.Kim          Create
*************************************************************************************/

public with sharing class TodoController {

    @AuraEnabled(Cacheable=true)
    public static Todo__c getTodo(String recordId){
        Todo__c[] objTodo = [SELECT Name, doDate__c, isFinished__c, EndDateTime__c, Task__r.Type__c, Task__r.Name, Task__r.SourceLink__c, Task__r.TaskLocation__Street__s FROM Todo__c WHERE Id = :recordId];
        return objTodo[0];
    }

    @AuraEnabled(cacheable=true)
    public static List<Todo__c> getTodoList(){
        return [SELECT Id, Name, Content__c FROM Todo__c];
    }
}