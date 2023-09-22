/************************************************************************************
 * Description :
 *
 * Ver      Date           Author          Modification
 * ===================================================================================
   1.0      2023-08-30       ge.Kim          Create
*************************************************************************************/

public with sharing class SubjectAchievementController {
    @AuraEnabled
    public static Subject__c getSubjectAchievementRate(String recordId){
        Subject__c objSubject = [SELECT AchievementRate__c FROM Subject__c WHERE Id = :recordId];
        return objSubject;
    }

}