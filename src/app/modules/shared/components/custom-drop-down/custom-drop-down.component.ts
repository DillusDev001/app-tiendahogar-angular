import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-drop-down',
  templateUrl: './custom-drop-down.component.html',
  styleUrl: './custom-drop-down.component.css'
})
export class CustomDropDownComponent {
  
   /** ---------------------------------- Variables de Inicio ---------------------------------- **/
   @Input() id: string = '';
   @Input() label: string = '';
   @Input() control!: FormControl;
   @Input() classMain: string = '';
   @Input() data!: any[];
 
   @Output() response = new EventEmitter<any>();
 
   inputFocus: boolean = false;
 
   _classMain: string[] = [];
   
   /** -------------------------------------- Constructor -------------------------------------- **/
   constructor() { }
 
   /** ---------------------------------------- OnInit ----------------------------------------- **/
   ngOnInit(): void {
     
   }

   onFocus(): void {
    this.inputFocus = true;
    this._classMain = ['border-color-primary', 'text-color-primary'];
    
  }
  onBlur(): void {
    this.inputFocus = false;
    if (this.control !== null) {
      if (this.control.errors && this.control.touched) {
        this._classMain = ['border-color-red', 'text-color-red'];
        
      } else if (!this.control.errors && this.control.touched) {
        this._classMain = ['border-color-gray', 'text-text-color-gray'];
      }
    }
  }

}
