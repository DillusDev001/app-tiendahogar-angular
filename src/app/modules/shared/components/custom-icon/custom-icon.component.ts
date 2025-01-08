import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-icon',
  templateUrl: './custom-icon.component.html',
  styleUrl: './custom-icon.component.css'
})
export class CustomIconComponent {

  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  @Input() icon: string = '';
  @Input() classMain: string = '';

}
