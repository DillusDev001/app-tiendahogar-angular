import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-status-indicator',
  templateUrl: './custom-status-indicator.component.html',
  styleUrl: './custom-status-indicator.component.css'
})
export class CustomStatusIndicatorComponent {
  
  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  @Input() status: number = 0;

}