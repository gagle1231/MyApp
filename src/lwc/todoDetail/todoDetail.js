/**
 * Created by ge.Kim on 2023-09-05.
 */

import { LightningElement, api, wire } from 'lwc';

export default class TodoDetail extends LightningElement {
    @api todo;
    @api todoId;
    //DOM에 Insert 되었을 때 호출되는 함수

    connectedCallback(){
        console.log('connectedCallback 실행');
        console.log('TodoDetail:' + this.todo);
    }


}