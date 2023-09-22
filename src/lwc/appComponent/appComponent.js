import { LightningElement, api, wire } from 'lwc';
import SUBJECT_OBJECT from '@salesforce/schema/Subject__c'
import getSubjectAchievementRate from '@salesforce/apex/SubjectController.getSubjectAchievementRate'
export default class AppComponent extends LightningElement {
    name = '김가은';
    description =`Hi, My Name is Gaeun Kim.
     My major is Computer Science and think I chose my major well because it suit my aptitude.
     When studying my major, I usually feel interested.
      So for last 4 years in my University, I did my best and I received scholarship all the time.`;

    @api recordId;
    @api objectApiName;
    achievementRate;
    error;
    @wire(getSubjectAchievementRate, {recordId : '$recordId'})
    wiredData({data, error}) {
            console.log('Execute logic each time a new value is provisioned');
            if (data) {
                this.achievementRate = data.AchievementRate__c;
                this.error = undefined;
            } else if (error) {
                this.error = error;
                this.achievementRate = undefined;
            }
        }
}