/************************************************************************************
 * Description :
 *
 * Ver      Date           Author          Modification
 * ===================================================================================
   1.0      2023-08-30       ge.Kim          Create
*************************************************************************************/

public with sharing class SubjectController {
    @AuraEnabled
    public static Subject__c getSubject(String recordId){
        return [SELECT Name, StartDate__c, EndDate__c, isFinished__c FROM Subject__c WHERE Id = :recordId];
    }

    @AuraEnabled
    public static void convertState(String recordId){
        Subject__c objSubject = new Subject__c(Id = recordId);
        objSubject.isFinished__c = true;
        update objSubject;
    }

    @AuraEnabled(cacheable=true)
    public static Subject__c getSubjectAchievementRate(String recordId){
        Subject__c objSubject = [SELECT AchievementRate__c FROM Subject__c WHERE Id = :recordId];
        return objSubject;
    }

}