import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { arrayCiudad } from '../../common/utils/local/arrays/common.array';
import { ResponseEmitter } from '../../common/interfaces/response.interface';

@Component({
  selector: 'app-index-shared',
  templateUrl: './index-shared.component.html',
  styleUrl: './index-shared.component.css'
})
export class IndexSharedComponent {

  // ================  ================ //
  formBusqueda = new FormGroup({
    busqueda: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required]),
    selected: new FormControl('', [Validators.required]),
  });

  data = arrayCiudad;

  selected: string = 'Menu 1';
  tabSelected: string = 'Tab 1';

  onResponseDotMenu(event: ResponseEmitter) {
    const action = event.data;

    console.log(action);
  }

  onClickMenuButton(val: string) {
    this.selected = val;
  }

  onClickTabButton(val: string) {
    this.tabSelected = val;
  }
}
