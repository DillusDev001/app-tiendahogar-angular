import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../../common/services/notification.service';
import { NetworkStatusService } from '../../../../../common/services/network-status.service';
import { deleteLocalStorageData, getLocalDataLogged, localStorageLogOut } from '../../../../../common/utils/storage.utils';
import { decodeJWT, decodeJWTUsuario, isTokenExpired } from '../../../../../common/utils/jwt.utils';
import { Usuario } from '../../../../../common/utils/app/usuario-module/usuario/usuario.interface';
import { goLogin } from '../../../../../common/utils/app/usuario-module/auth/auth.route';
import { DataLocalStorage } from '../../../../../common/interfaces/storage.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contacto } from '../../../../../common/utils/app/depositante-module/contacto/contacto.interface';

@Component({
  selector: 'app-view-contacto',
  templateUrl: './view-contacto.component.html',
  styleUrl: './view-contacto.component.css'
})
export class ViewContactoComponent implements OnInit {
  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private networkStatusService: NetworkStatusService
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
        deleteLocalStorageData();
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
        this.formContacto.disable();
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

  // ================  ================ //
  @Input() type: string = ''; // ver - editar - nuevo
  @Input() ci: string = '';

  @Output() response = new EventEmitter<any>();

  formContacto = new FormGroup({
    nombre_contacto: new FormControl('', [Validators.required]),
    celular_contacto: new FormControl('', [Validators.required]),
    fec_mod: new FormControl('', []),
    user_mod: new FormControl('', []),
  });

  //dataBusquedaUsuario = usuarioArrayBusqueda;

  /** ---------------------------------------- Methods ---------------------------------------- **/

  /** ------------------------------------ Methods onClick ------------------------------------ **/

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/

  /** ---------------------------------------- Child Emiter --------------------------------------- **/
  childFormValid(): boolean {
    return this.formContacto.valid;
  }

  childContactoEmmit(): Contacto {
    const data = {
      ci: this.ci,
      nombre_contacto: this.formContacto.value.nombre_contacto,
      celular_contacto: this.formContacto.value.celular_contacto,
      user_mod: this.userLogeado.usuario,
    } as Contacto;

    return data;
  }

  childEmiter() {
    return { ci: this.ci, child: 'Contacto' };
  }

  /** --------------------------------------- ShowNotification -------------------------------------- **/
  showNotification(type: 'success' | 'error' | 'warning' | 'info', msg: string) {
    this.notificationService.notify(type, msg);
  }
}