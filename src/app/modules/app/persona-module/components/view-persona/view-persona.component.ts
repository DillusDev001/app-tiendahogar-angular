import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../../common/services/notification.service';
import { NetworkStatusService } from '../../../../../common/services/network-status.service';
import { deleteLocalStorageData, getLocalDataLogged, localStorageLogOut } from '../../../../../common/utils/storage.utils';
import { decodeJWT, decodeJWTUsuario, isTokenExpired } from '../../../../../common/utils/jwt.utils';
import { Usuario } from '../../../../../common/utils/app/usuario-module/usuario/usuario.interface';
import { goLogin } from '../../../../../common/utils/app/usuario-module/auth/auth.route';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { arrayCodePais, arrayExp, arrayNacionalidad } from '../../../../../common/utils/local/arrays/common.array';
import { DataLocalStorage } from '../../../../../common/interfaces/storage.interface';
import { PersonaService } from '../../../../../common/utils/app/persona-module/persona/persona.service';
import { Persona } from '../../../../../common/utils/app/persona-module/persona/persona.interface';
import { ApiResult } from '../../../../../common/interfaces/api.interface';
import { BeneficiarioService } from '../../../../../common/utils/app/persona-module/beneficiario/beneficiario.service';

@Component({
  selector: 'app-view-persona',
  templateUrl: './view-persona.component.html',
  styleUrl: './view-persona.component.css'
})
export class ViewPersonaComponent implements OnInit {
  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private networkStatusService: NetworkStatusService,
    private personaService: PersonaService,
    private beneficiarioService: BeneficiarioService
  ) {
    if (getLocalDataLogged() != null) {
      this.dataLocalStorage = getLocalDataLogged();
      if (this.dataLocalStorage.tokken != 'null') {
        const decodedToken = decodeJWT(this.dataLocalStorage.tokken);
        if (decodedToken != null) {
          if (!isTokenExpired(decodedToken)) {
            this.userLogeado = decodeJWTUsuario(this.dataLocalStorage.tokken) as Usuario
          } else {
            this.showNotification('error', 'Su sesión a expirado, inicie sesión nuevamente.')
            localStorageLogOut();
            goLogin(this.router)
          }
        } else {
          localStorageLogOut();
          goLogin(this.router)
        }
      } else {
        deleteLocalStorageData()
        goLogin(this.router);
      }
    } else {
      deleteLocalStorageData();
      goLogin(this.router);
    }
  }

  /** ---------------------------------------- OnInit ----------------------------------------- **/
  ngOnInit(): void {
    this.isOnline = this.networkStatusService.isOnline;
    this.networkStatusService.isOnline$.subscribe(status => {
      this.isOnline = status;
    });

    switch (this.type) {
      case 'nuevo':
        break;

      case 'editar':
        break;

      case 'ver':
        this.formPersona.disable();
        break;
    }
  }

  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  // ================ INICIO ================ //
  // Data Local Storeage - Variable
  isOnline!: boolean;

  dataLocalStorage: DataLocalStorage = {
    tokken: '',
    loggedDate: ''
  }

  // Usuario logeado
  userLogeado!: Usuario;

  // loading spinner
  isLoading: boolean = false;

  // 
  personaExist: boolean = false;

  // ================  ================ //
  @Input() type: string = ''; // ver - editar - nuevo
  @Input() ci: string = '';

  @Output() response = new EventEmitter<any>();

  // para devolver el CI a View-Depositante cuando se encuentre
  @Output() responseCI = new EventEmitter<any>();

  formPersona = new FormGroup({
    ci: new FormControl('', [Validators.required]),
    exp: new FormControl('', [Validators.required]),
    nombres: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    code: new FormControl('+591', [Validators.required]),
    celular: new FormControl('', [Validators.required]),
    nacionalidad: new FormControl('Boliviana', [Validators.required]),
    fec_nac: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', []),
    fec_mod: new FormControl('', []),
    user_mod: new FormControl('', []),
  });

  dataExp = arrayExp;
  dataCode = arrayCodePais;
  dataNacionalidad = arrayNacionalidad;

  // sugerencias para seleccionar en el ci
  dataSuggestionsCI: string[] = [];

  /** ---------------------------------------- Methods ---------------------------------------- **/
  resetFormPersona(val: string) {
    this.formPersona.reset({
      ci: val,
      exp: '',
      nombres: '',
      apellidos: '',
      code: '+591',
      celular: '',
      nacionalidad: 'Boliviana',
      fec_nac: '',
      direccion: '',
      descripcion: '',
      fec_mod: '',
      user_mod: ''
    });
  }

  setFormDiableSuggestion() {
    //this.formPersona.controls.ci.disable();
    this.formPersona.controls.exp.disable();
    this.formPersona.controls.nombres.disable();
    this.formPersona.controls.apellidos.disable();
    this.formPersona.controls.code.disable();
    this.formPersona.controls.celular.disable();
    this.formPersona.controls.nacionalidad.disable();
    this.formPersona.controls.fec_nac.disable();
    this.formPersona.controls.direccion.disable();
    this.formPersona.controls.descripcion.disable();
  }

  /** ------------------------------------ Methods onClick ------------------------------------ **/

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  suggestionFindBy(ci: string) {
    this.personaService.personaFindBy('ci', ci, 'ASC').subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        const dataResult = result.data as Persona[];
        this.dataSuggestionsCI = [];
        dataResult.forEach(item => {
          this.dataSuggestionsCI.push(item.ci)
        });
      } else {
        this.dataSuggestionsCI = [];
      }
    });
  }

  personaFindBy(ci: string) {
    this.personaService.personaFindBy('ci', ci, 'ASC').subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        const persona = result.data[0] as Persona;
        this.formPersona.setValue(persona);


      } else {
        this.dataSuggestionsCI = [];
      }
    });
  }

  beneficiarioFindOne(ci: string) {
    this.beneficiarioService.beneficiarioFindOne(ci).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.personaExist = true;
        this.formPersona.controls.descripcion.setValue(result.data[0].descripcion);
      } else {
        this.personaExist = false;
      }
    });
  }

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/
  onTextChange(value: string) {
    this.ci = value;
    this.responseCI.emit({ bool: true, data: { ci: this.ci } });

    if (value.length >= 3) {
      this.formPersona.enable();
      this.resetFormPersona(value);
      this.suggestionFindBy(value);
    } else {
      this.dataSuggestionsCI = [];
    }
  }

  onSuggestionSelected(suggestion: string) {
    this.formPersona.controls.ci.setValue(suggestion);

    this.dataSuggestionsCI = [];

    this.ci = suggestion;
    this.responseCI.emit({ bool: true, data: { ci: suggestion } });

    

    this.personaFindBy(suggestion);
    this.setFormDiableSuggestion()
  }

  /** ---------------------------------------- Child Emiter --------------------------------------- **/
  childFormValid(): boolean {
    return this.formPersona.valid;
  }

  childPersonaEmmit(): Persona {
    const data = {
      ci: this.formPersona.value.ci,
      exp: this.formPersona.value.exp,
      nombres: this.formPersona.value.nombres,
      apellidos: this.formPersona.value.apellidos,
      code: this.formPersona.value.code,
      celular: this.formPersona.value.celular,
      nacionalidad: this.formPersona.value.nacionalidad,
      fec_nac: this.formPersona.value.fec_nac,
      direccion: this.formPersona.value.direccion,
      descripcion: this.formPersona.value.descripcion,
      user_mod: this.userLogeado.usuario,
    } as Persona;

    return data;
  }

  childEmiterGetCI(): string {
    return this.ci;
  }

  childEmiter() {
    return { ci: this.ci, child: 'Persona' };
  }

  /** --------------------------------------- ShowNotification -------------------------------------- **/
  showNotification(type: 'success' | 'error' | 'warning' | 'info', msg: string) {
    this.notificationService.notify(type, msg);
  }
}