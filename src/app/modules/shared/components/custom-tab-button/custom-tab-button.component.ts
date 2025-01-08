import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-tab-button',
  templateUrl: './custom-tab-button.component.html',
  styleUrl: './custom-tab-button.component.css'
})
export class CustomTabButtonComponent implements OnInit {
  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() classMain: string = '';
  @Input() classSpan: string = '';
  @Input() selected: string = '';
  @Input() link: string = '';

  @Output() response = new EventEmitter<any>();

  _classMainSelected: string[] = [ 'bg-color-primary', 'bg-opacity-10', 'border-color-primary', 'border-opacity-30'];
  _classMainNotSelected: string[] = [ 'bg-transparent', 'cursor-pointer', 'border-color-gray-lite', 'hover:bg-color-primary', 'hover:bg-opacity-20'];

  _classSpanSelected: string[] = ['text-primary-900'];
  _classSpanNotSelected: string[] = ['text-color-primary-dark'];

  _classParraSelected: string[] = ['text-color-primary-dark'];
  _classParraNotSelected: string[] = ['text-color-primary-dark'];

  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor() { }

  /** ---------------------------------------- OnInit ----------------------------------------- **/
  ngOnInit(): void {

  }

  onClick() {

  }

}