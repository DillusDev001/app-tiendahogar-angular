import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-loading',
  templateUrl: './custom-loading.component.html',
  styleUrl: './custom-loading.component.css'
})
export class CustomLoadingComponent implements OnInit {
  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  @Input() classMain: string = '';

  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor() { }

  /** ---------------------------------------- OnInit ----------------------------------------- **/
  ngOnInit(): void {

  }

}
