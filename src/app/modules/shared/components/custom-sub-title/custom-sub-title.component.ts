import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-sub-title',
  templateUrl: './custom-sub-title.component.html',
  styleUrl: './custom-sub-title.component.css'
})
export class CustomSubTitleComponent {

  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  @Input() id!: string;
  @Input() label!: string;
  @Input() classMain!: string;

}
