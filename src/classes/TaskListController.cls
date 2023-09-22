/************************************************************************************
 * Description :
 *
 * Ver      Date           Author          Modification
 * ===================================================================================
   1.0      2023-08-29       ge.Kim          Create
*************************************************************************************/

public with sharing class TaskListController {
    @AuraEnabled
    public static List<Task__c> getTaskList(String recordId){
        List<Task__c> listTasks = new List<Task__c>();
        listTasks = [SELECT Id, Name, Content__c, isFinished__c FROM Task__c WHERE Subject__c = :recordId];
        return listTasks;
    }
}