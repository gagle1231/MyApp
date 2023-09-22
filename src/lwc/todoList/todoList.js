import { LightningElement, wire, track } from 'lwc';
import getTodoList from '@salesforce/apex/TodoController.getTodoList';
export default class TodoList extends LightningElement {
    todoList;
    @wire(getTodoList)
    getValues(values){
        this.todoList = values.data;
    }
}