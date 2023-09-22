/**
 * Created by ge.Kim on 2023-09-05.
 */

import { LightningElement, api } from 'lwc';
export default class Tile extends LightningElement {
  @api todo;
  tileClick() {
    const event = new CustomEvent('titlelick', {
      detail: this.todo.fields.Id.value
    });
    // Fire the event from c-tile
    this.dispatchEvent(event);
  }
}