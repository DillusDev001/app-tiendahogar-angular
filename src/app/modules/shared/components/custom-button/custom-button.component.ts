import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.css'
})
export class CustomButtonComponent implements OnInit {
  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() icon: string = '';
  @Input() classMain: string = '';
  @Input() classSpan: string = '';
  @Input() valid: boolean = false;

  @Output() response = new EventEmitter<any>();

  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor() { }

  /** ---------------------------------------- OnInit ----------------------------------------- **/
  ngOnInit(): void {

  }

  getMainClass(type: string): string[] {
    switch (type) {
      case 'accept':
        return [
          'bg-color-btn-accept',
          'text-color-text',
          'hover:bg-color-btn-accept-hover',
          'border',
          'border-color-gray',
          !this.valid ? 'cursor-not-allowed' : ''
        ];

      case 'cancel':
        return [
          'color-btn-cancel',
          'text-color-text',
          'hover:bg-color-btn-cancel-hover',
          'border',
          'border-colorß-gray',
          !this.valid ? 'cursor-not-allowed' : ''
        ];
      default: return [''];
    }
  }

  getClassIcon(type: string): string[] {
    switch (type) {
      case 'accept':
        return [
          'text-color-text-btn',
        ];

      case 'cancel':
        return [
          'text-color-text-btn',
        ];
      default: return [''];
    }
  }

}
