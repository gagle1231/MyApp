public with sharing class ReportController {
    public Task__c objTask {get; set;}

    public ReportController(){
        String recordId =  ApexPages.currentPage().GetParameters().get('recordId');
        objTask = [SELECT Name, Content__c, CreatedDate, CreatedBy.Name, Summary__c FROM Task__c WHERE Id = :recordId];
    }

    @AuraEnabled
    public static String doSavePdf(String recordId, String pageName){
        String result;
        String vfPageUrl;
        try{
            vfPageUrl = '/apex/' + pageName +'?recordId=' + recordId;
            PageReference templatePageReference = new PageReference(vfPageUrl);

            Blob templateBLOB;
            if (Test.isRunningTest()) {
                templateBLOB = Blob.valueOf('Unit test');
            } else {
                templateBLOB = templatePageReference.getContentAsPDF();
            }

            Integer highestVersionNumber = 0;
            List<ContentVersion> existingVersions = [
                    SELECT Title
                    FROM ContentVersion
                    WHERE Title LIKE 'Quote__V%'
                    AND FirstPublishLocationId =:recordId
                    ORDER BY Title DESC
                    LIMIT 1
            ];
            if (!existingVersions.isEmpty()) {
                String lastVersionTitle = existingVersions[0].Title;
                Integer lastVersionNumber = Integer.valueOf(lastVersionTitle.substring(8));
                highestVersionNumber = Math.max(highestVersionNumber, lastVersionNumber);
            }

            Integer nextVersionNumber = highestVersionNumber + 1;

            String pdfName = 'Quote__V' + nextVersionNumber;
            ContentVersion objContentVersion = new ContentVersion();
            objContentVersion.Title = pdfName;
            objContentVersion.VersionData = templateBLOB;
            objContentVersion.PathOnClient = pdfName + '.pdf';
            objContentVersion.FirstPublishLocationId = recordId;

            insert objContentVersion;

            result = 'success';

        } catch (Exception e) {
            System.debug('PrfPDFGenerator line : ' + e.getLineNumber());
            System.debug('PrfPDFGenerator message : ' + e.getMessage());
            System.debug('PrfPDFGenerator cause : ' + e.getCause());
            result = 'error';
        }

        return result;
    }

}