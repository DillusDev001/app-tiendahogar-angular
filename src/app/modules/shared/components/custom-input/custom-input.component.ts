import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css'
})
export class CustomInputComponent implements OnInit {

  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = ''
  @Input() type: string = '';
  @Input() autocomplete!: string;
  @Input() icon: string = '';
  @Input() control!: FormControl;
  @Input() classMain: string = '';
  @Input() classSpan: string = '';
  @Input() classIcon: string = '';
  @Input() classInput: string = '';
  @Input() suggestions: string[] = []; // Lista de sugerencias

  @Output() response = new EventEmitter<any>();

  @Output() textChange = new EventEmitter<string>();
  @Output() suggestionSelected = new EventEmitter<string>();


  isPassword!: boolean;
  isHidden: boolean = true;
  inputFocus: boolean = false;

  _classMain: string[] = [];
  _classLabel: string[] = [];
  _classIcon: string[] = [];
  _classInput: string[] = [];

  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor() { }

  /** ---------------------------------------- OnInit ----------------------------------------- **/
  ngOnInit(): void {
    if (this.type === 'password') this.isPassword = true;
  }

  showOrHiddenPassword() {
    this.inputFocus = true;

    this.isHidden = !this.isHidden;

    if (this.isHidden) {
      this.type = 'password';
    }
    else {
      this.type = 'text';
    }
  }

  onFocus(): void {
    this.inputFocus = true;
    this._classMain = ['border-color-primary'];
    this._classLabel = ['text-color-primary'];
    this._classIcon = ['text-color-primary'];
    this._classInput = ['text-color-text'];
  }
  onBlur(): void {
    this.inputFocus = false;
    if (this.control !== null) {
      if (this.control.errors && this.control.touched) {
        this._classMain = ['border-color-red', 'text-color-red'];
        this._classLabel = ['text-color-red'];
        this._classIcon = ['text-color-red'];
        this._classInput = ['text-color-red'];
      } else if (!this.control.errors && this.control.touched) {
        this._classMain = ['border-color-gray', 'text-text-color-gray'];
        this._classLabel = ['text-color-gray'];
        this._classIcon = ['text-color-gray'];
        this._classInput = ['text-color-gray'];
      }
    }
  }

  onTextChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.textChange.emit(inputValue);
  }

  selectSuggestion(suggestion: string) {
    this.suggestionSelected.emit(suggestion);
  }
}
