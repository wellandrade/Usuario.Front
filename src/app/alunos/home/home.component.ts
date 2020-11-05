import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public modal: MatDialog) { }

  ngOnInit(): void {
  }

  abrirModal(): void {

    const dialogRef = this.modal.open(ModalComponent, {
      width: '500px'
    });

  }

}
