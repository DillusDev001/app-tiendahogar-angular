import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NotificationService } from '../../../../common/services/notification.service';
import { NetworkStatusService } from '../../../../common/services/network-status.service';
import { deleteLocalStorageData, getLocalDataLogged, localStorageLogOut } from '../../../../common/utils/storage.utils';
import { decodeJWT, decodeJWTUsuario, isTokenExpired } from '../../../../common/utils/jwt.utils';
import { goLogin } from '../../../../common/utils/app/usuario-module/auth/auth.route';
import { Usuario } from '../../../../common/utils/app/usuario-module/usuario/usuario.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataLocalStorage } from '../../../../common/interfaces/storage.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
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

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeUrl = this.router.url;
        this.updateSelectedMenuItemFromUrl();
      }
    });
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
  // Active URL showing
  activeUrl!: string;

  // SideBar
  open: boolean = false;

  menuSelected: string = 'Inicio';

  title: string = this.menuSelected;

  booleanServicios: boolean = false;
  booleanMantenimieto: boolean = false;

  currentYear: number = new Date().getFullYear();

  /** ---------------------------------------- Methods ---------------------------------------- **/
  updateSelectedMenuItemFromUrl() {
    const currentUrl = this.router.url;

    switch (currentUrl) {
      case '/index/inicio':
        this.menuSelected = 'Inicio';
        this.title = 'Inicio';
        break;

      case '/index/depositantes':
        this.menuSelected = 'Depositantes';
        this.title = 'Depositantes';
        break;

      case '/index/contratos':
        this.menuSelected = 'Contratos';
        this.title = 'Contratos';
        break;

      case '/index/asesores':
        this.menuSelected = 'Asesores';
        this.title = 'Asesores';
        break;

      case '/index/usuarios':
        this.menuSelected = 'Usuarios';
        this.title = 'usuarios';
        break;

      case '/index/mantenimiento':
        this.menuSelected = 'Mantenimiento';
        this.title = 'Mantenimiento';
        break;

      case '/index/riesgo':
        this.menuSelected = 'Riesgo';
        this.title = 'Riesgo';
        break;
    }
  }

  scrollSelectedItemIntoView() {
    setTimeout(() => {
      const selectedItem = document.querySelector('.custom-menu-button.selected');
      if (selectedItem) {
        selectedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }, 0); // Usamos setTimeout para asegurarnos de que el elemento esté renderizado antes de hacer scroll
  }

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickSideBar(sw: boolean) {
    this.open = sw;
  }

  onClickSetMenuSelected(eventTitle: string) {
    if (this.isOnline) {
      if (this.menuSelected !== eventTitle) {
        this.title = eventTitle;
        this.menuSelected = eventTitle;

        switch (eventTitle) {
          case 'Inicio':
            //goInicio(this.router);
            break;

          case 'Artículos':
            //goShared(this.router);
            break;
        }
        this.scrollSelectedItemIntoView();
        this.open = false;
      }
    }

    this.scrollSelectedItemIntoView();
    this.open = false;
  }

  onClickCerrarSesion() {
    if (localStorageLogOut()) {
      goLogin(this.router);
    }
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/

  /** --------------------------------------- ShowNotification -------------------------------------- **/
  showNotification(type: 'success' | 'error' | 'warning' | 'info', msg: string) {
    this.notificationService.notify(type, msg);
  }

}