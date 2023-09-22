/**
 * Created by ge.Kim on 2023-09-05.
 */

import { LightningElement, api } from 'lwc';

export default class TodoDetail extends LightningElement {
    @api todoId;
    todo;
}