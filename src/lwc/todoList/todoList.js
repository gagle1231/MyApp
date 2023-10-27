import { LightningElement, wire, track, api } from 'lwc';
import getTodoList from '@salesforce/apex/TodoController.getTodoList';
import getTodo from '@salesforce/apex/TodoController.getTodo';
export default class TodoList extends LightningElement {
    todoList;
    @track selectedObj;

    @wire(getTodoList)
    getValues({data, error}){
        if(data){
            console.log(data);
            this.todoList = data;
        }else if(error){
            error;
        }
    }

    handleClick(event){
        const id = event.detail;
        console.log('todoList: selected recordId: '+ id);
        getTodo({recordId: id}).then((data) => {
            console.log(data);
            this.selectedObj = data;
        }).catch((error) => {
            console.log(error);
        })
    }

}