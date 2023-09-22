/************************************************************************************
 * Description :
 *
 * Ver      Date           Author          Modification
 * ===================================================================================
   1.0      2023-08-30       ge.Kim          Create
*************************************************************************************/

public with sharing class Task_tr extends TriggerHandler{
    private List<Task__c> listNew {get; set;}
    private List<Task__c> listOld {get; set;}
    private Map<Id, Task__c> mapNew {get; set;}
    private Map<Id, Task__c> mapOld {get; set;}

    public Task_tr(){
        listNew = (List<Task__c>)Trigger.new;
        listOld = (List<Task__c>)Trigger.old;
        mapNew = (Map<Id,Task__c>)Trigger.newMap;
        mapOld = (Map<Id,Task__c>)Trigger.oldMap;
    }

    public override void beforeInsert() {

    }

    public override void beforeUpdate() {

    }

}