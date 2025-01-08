import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../../common/services/notification.service';
import { NetworkStatusService } from '../../../../../common/services/network-status.service';
import { deleteLocalStorageData, getLocalDataLogged, localStorageLogOut } from '../../../../../common/utils/storage.utils';
import { decodeJWT, decodeJWTUsuario, isTokenExpired } from '../../../../../common/utils/jwt.utils';
import { goLogin } from '../../../../../common/utils/app/usuario-module/auth/auth.route';
import { Usuario } from '../../../../../common/utils/app/usuario-module/usuario/usuario.interface';
import { DataLocalStorage } from '../../../../../common/interfaces/storage.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { arrayBanco, arrayMoneda, arrayTipoCuenta } from '../../../../../common/utils/local/arrays/common.array';

@Component({
  selector: 'app-view-cuenta-bancaria',
  templateUrl: './view-cuenta-bancaria.component.html',
  styleUrl: './view-cuenta-bancaria.component.css'
})
export class ViewCuentaBancariaComponent implements OnInit {
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
        this.formCuentaBancaria.disable();
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

  formCuentaBancaria = new FormGroup({
    banco: new FormControl('', [Validators.required]),
    nro_cuenta: new FormControl('', [Validators.required]),
    moneda: new FormControl('Bolivianos', [Validators.required]),
    tipo_cuenta: new FormControl('Caja de Ahorros', [Validators.required]),
  });

  dataBanco = arrayBanco;
  dataModena = arrayMoneda
  dataTipoCuenta = arrayTipoCuenta;

  /** ---------------------------------------- Methods ---------------------------------------- **/

  /** ------------------------------------ Methods onClick ------------------------------------ **/

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/

  /** ---------------------------------------- Child Emiter --------------------------------------- **/
  childFormValid(): boolean{
    return this.formCuentaBancaria.valid;
  }

  childEmiter() {
    return { ci: this.ci, child: 'Cuenta-Bancaria' };
  }

  /** --------------------------------------- ShowNotification -------------------------------------- **/
  showNotification(type: 'success' | 'error' | 'warning' | 'info', msg: string) {
    this.notificationService.notify(type, msg);
  }
}