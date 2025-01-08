import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-dot-menu',
  templateUrl: './custom-dot-menu.component.html',
  styleUrl: './custom-dot-menu.component.css'
})
export class CustomDotMenuComponent implements OnInit {

  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  @Input() classMain: string = '';
  @Input() classIcon: string = '';
  @Input() data: any[] = [];

  @Output() response = new EventEmitter<any>();

  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor() { }

  /** ---------------------------------------- OnInit ----------------------------------------- **/
  ngOnInit(): void {

  }

  // Menu
  isDropdownOpen: boolean = false;

  onMouseEnter() {
    this.isDropdownOpen = true;
  }

  onMouseLeave() {
    this.isDropdownOpen = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = true;
  }

  onClickItemMenu(index: number) {
    this.response.emit(
      {
        bool: true,
        data: this.data[index]['value'],
      }
    );
    this.isDropdownOpen = false;
  }

}
