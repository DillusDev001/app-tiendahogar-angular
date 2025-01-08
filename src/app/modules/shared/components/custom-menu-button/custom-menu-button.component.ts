import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-menu-button',
  templateUrl: './custom-menu-button.component.html',
  styleUrl: './custom-menu-button.component.css'
})
export class CustomMenuButtonComponent implements OnInit {
  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() classMain: string = '';
  @Input() classSpan: string = '';
  @Input() selected: string = '';
  @Input() link: string = '';

  @Output() response = new EventEmitter<any>();

  _classMainSelected: string[] = ['rounded-sm', 'overflow-hidden', 'bg-color-primary', 'bg-opacity-10'];
  _classMainNotSelected: string[] = ['rounded-sm', 'overflow-hidden', 'bg-transparent', 'hover:bg-color-primary', 'hover:bg-opacity-10'];

  _classLineSelected: string[] = ['bg-color-primary']
  _classLineNotSelected: string[] = ['bg-transparent']

  _classSpanSelected: string[] = ['text-color-primary'];
  _classSpanNotSelected: string[] = ['text-color-primary-dark', 'hover:text-color-primary'];

  _classParraSelected: string[] = ['text-color-primary'];
  _classParraNotSelected: string[] = ['text-color-primary-dark', 'hover:text-color-primary'];

  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor() { }

  /** ---------------------------------------- OnInit ----------------------------------------- **/
  ngOnInit(): void {

  }

  onClick() {

  }

}
