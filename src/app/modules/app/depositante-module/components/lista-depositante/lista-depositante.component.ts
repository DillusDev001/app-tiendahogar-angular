import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../../common/services/notification.service';
import { NetworkStatusService } from '../../../../../common/services/network-status.service';
import { Router } from '@angular/router';
import { deleteLocalStorageData, getLocalDataLogged, localStorageLogOut } from '../../../../../common/utils/storage.utils';
import { decodeJWT, decodeJWTUsuario, isTokenExpired } from '../../../../../common/utils/jwt.utils';
import { Usuario } from '../../../../../common/utils/app/usuario-module/usuario/usuario.interface';
import { goLogin } from '../../../../../common/utils/app/usuario-module/auth/auth.route';
import { DataLocalStorage } from '../../../../../common/interfaces/storage.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { usuarioArrayBusqueda } from '../../../../../common/utils/app/usuario-module/usuario/usuario.array';
import { ResponseEmitter } from '../../../../../common/interfaces/response.interface';
import { Depositante, Methods } from '../../../../../common/utils/app/depositante-module/depositante/depositante.interface';
import { DepositanteService } from '../../../../../common/utils/app/depositante-module/depositante/depositante.service';
import { ApiResult } from '../../../../../common/interfaces/api.interface';
import { arraySimpleMenu_0, arraySimpleMenu_1 } from '../../../../../common/utils/local/menu/menu-simple.array';


@Component({
  selector: 'app-lista-depositante',
  templateUrl: './lista-depositante.component.html',
  styleUrl: './lista-depositante.component.css'
})
export class ListaDepositanteComponent implements OnInit {
  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private networkStatusService: NetworkStatusService,
    private depositanteService: DepositanteService
  ) {
    if (getLocalDataLogged() != null) {
      this.dataLocalStorage = getLocalDataLogged();
      if (this.dataLocalStorage.tokken != 'null') {
        const decodedToken = decodeJWT(this.dataLocalStorage.tokken);
        if (decodedToken != null) {
          if (!isTokenExpired(decodedToken)) {
            this.userLogeado = decodeJWTUsuario(this.dataLocalStorage.tokken) as Usuario

            // Obtener Lista de depositantes
            this.depositanteFindAll('ci', 'ASC');

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
  isLoading: boolean = true;

  // paginacion
  paginationArray: number[] = [];
  posPaginacion: number = 0;

  // ================  ================ //
  formBusqueda = new FormGroup({
    busqueda: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required])
  });

  dataBusquedaUsuario = usuarioArrayBusqueda;

  showViewDepositante: boolean = false;
  typeViewDepositante: string = '';

  dataDepositantes: Depositante[] = [];

  methodsDepositante = Methods;

  orderBy: string = 'ASC';
  icon: string = 'fa-solid fa-sort-up fa-lg';

  dataSimpleMenu_0 = arraySimpleMenu_0; // Eliminar
  dataSimpleMenu_1 = arraySimpleMenu_1; // Habilitar


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

  numberPaginacion(n: number) {
    this.posPaginacion = n
  }

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickAgregarDepositante() {
    this.typeViewDepositante = 'nuevo'
    this.showViewDepositante = true;
  }

  onClickSortSearch() {
    if (this.orderBy === 'ASC') {
      this.orderBy = 'DESC';
      this.icon = 'fa-solid fa-sort-down fa-lg';
    } else {
      this.orderBy = 'ASC';
      this.icon = 'fa-solid fa-sort-up fa-lg';
    }
  }

  onClickTableSort(index: number) {
    this.methodsDepositante.tableSortView(index)
    this.dataDepositantes = this.methodsDepositante.sortDepositante(this.methodsDepositante.getColumn(index),  this.methodsDepositante.getSort(index), this.dataDepositantes)
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  public depositanteFindAll(attribute: string, orderBy: string) {
    this.depositanteService.depositanteFindAll(attribute, orderBy).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.dataDepositantes = result.data;
      } else {
        this.showNotification('error', result.message);
      }
      this.isLoading = false;
    });
  }

  public depositanteFindBy(attribute: string, value: string, orderBy: string) {
    this.depositanteService.depositanteFindBy(attribute, value, orderBy).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {

      } else {

      }
    });
  }

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/
  onReciveResponseSimpleMenu(event: ResponseEmitter, index: number) {
    const action = event.data;

    switch (action) {
      case 'ver':
      case 'editar':
        
        break;

      case 'eliminar':
        
        break;

      case 'habilitar':
        this.isLoading = true;
        
        break;
    }
  }
  onReciveResponseDepositante(event: ResponseEmitter) {
    this.showViewDepositante = event.bool
  }

  /** --------------------------------------- ShowNotification -------------------------------------- **/
  showNotification(type: 'success' | 'error' | 'warning' | 'info', msg: string) {
    this.notificationService.notify(type, msg);
  }

}