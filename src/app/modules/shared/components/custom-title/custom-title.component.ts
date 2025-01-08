import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-title',
  templateUrl: './custom-title.component.html',
  styleUrl: './custom-title.component.css'
})
export class CustomTitleComponent {

  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  @Input() id!: string;
  @Input() label!: string;
  @Input() classMain!: string;

}
