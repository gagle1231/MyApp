
public with sharing class ReportController {
    public Task__c objTask {get; set;}
    public ReportController(){
        String recordId =  ApexPages.currentPage().GetParameters().get('recordId');
        objTask = [SELECT Name, CreatedDate, CreatedBy.Name, Summary__c FROM Task__c WHERE Id = :recordId];
    }
}