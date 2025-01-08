import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../../common/services/notification.service';
import { NetworkStatusService } from '../../../../../common/services/network-status.service';
import { deleteLocalStorageData, getLocalDataLogged, localStorageLogOut } from '../../../../../common/utils/storage.utils';
import { decodeJWT, decodeJWTUsuario, isTokenExpired } from '../../../../../common/utils/jwt.utils';
import { goLogin } from '../../../../../common/utils/app/usuario-module/auth/auth.route';
import { Usuario } from '../../../../../common/utils/app/usuario-module/usuario/usuario.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataLocalStorage } from '../../../../../common/interfaces/storage.interface';
import { usuarioArrayBusqueda } from '../../../../../common/utils/app/usuario-module/usuario/usuario.array';

@Component({
  selector: 'app-lista-asesor',
  templateUrl: './lista-asesor.component.html',
  styleUrl: './lista-asesor.component.css'
})
export class ListaAsesorComponent implements OnInit {
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

  // paginacion
  paginationArray: number[] = [1, 2, 3, 4, 5, 6];
  posPaginacion: number = 6;

  // ================  ================ //
  formBusqueda = new FormGroup({
    busqueda: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required])
  });

  dataBusquedaUsuario = usuarioArrayBusqueda;

  /** ---------------------------------------- Methods ---------------------------------------- **/
  anteriorPaginacion() {
    if ((this.posPaginacion - 1) > 0) {
      this.posPaginacion = this.posPaginacion - 1;
      //this.showListaNext(this.posPaginacion - 1);
    }
  }

  siguientePaginacion() {
    if ((this.posPaginacion + 1) <= this.paginationArray.length) {
      this.posPaginacion = this.posPaginacion + 1;
      //this.showListaNext(this.posPaginacion + 1);
    }
  }

  /** ------------------------------------ Methods onClick ------------------------------------ **/

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/

  /** --------------------------------------- ShowNotification -------------------------------------- **/
  showNotification(type: 'success' | 'error' | 'warning' | 'info', msg: string) {
    this.notificationService.notify(type, msg);
  }

}