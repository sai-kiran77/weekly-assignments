import { Component } from '@angular/core';
import data from '../utils/data'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'table';
  dataArray = data;
  faTrash = faTrash;
  faEdit = faEdit;
  statusKeys = ['PENDING', 'DISPATCHED', 'DELIVERED', 'COMPLETED', 'CANCELLED']
  statusObj: {
    [key: string]: {
      color: string;
      showEdit: boolean;
      showDelete: boolean;
    }
  } = {
      'PENDING': {
        color: 'orange',
        showEdit: true,
        showDelete: true
      },
      'DISPATCHED': {
        color: 'lightblue',
        showEdit: true,
        showDelete: true
      },
      'DELIVERED': {
        color: 'lightgreen',
        showEdit: false,
        showDelete: true
      },
      'COMPLETED': {
        color: 'green',
        showEdit: false,
        showDelete: true
      },
      'CANCELLED': {
        color: 'red',
        showEdit: false,
        showDelete: false
      }
    }

  statusFunc(status: number) {
    return this.statusObj[this.statusKeys[status]]
  }
}
