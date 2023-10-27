/**
 * Created by ge.Kim on 2023-09-05.
 */

import { LightningElement, api } from 'lwc';
export default class Tile extends LightningElement {
  @api todo;

  tileClick(event) {
    event.target.style += 'background-color: red;';
    console.log(this.todo.Id);
    const customEvent = new CustomEvent('view', {
      detail: this.todo.Id
    });
    this.dispatchEvent(customEvent);
  }
  handleMouseOver(event){
      const e = event.target;
      e.style.cssText = 'text-decoration:underline;';
  }
  handleMouseOut(event){
      const e = event.target;
      e.style['text-decoration'] = 'none';
  }
}