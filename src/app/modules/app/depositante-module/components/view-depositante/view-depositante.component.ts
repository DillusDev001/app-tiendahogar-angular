import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../../common/services/notification.service';
import { NetworkStatusService } from '../../../../../common/services/network-status.service';
import { deleteLocalStorageData, getLocalDataLogged, localStorageLogOut } from '../../../../../common/utils/storage.utils';
import { decodeJWT, decodeJWTUsuario, isTokenExpired } from '../../../../../common/utils/jwt.utils';
import { Usuario } from '../../../../../common/utils/app/usuario-module/usuario/usuario.interface';
import { goLogin } from '../../../../../common/utils/app/usuario-module/auth/auth.route';
import { DataLocalStorage } from '../../../../../common/interfaces/storage.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewContactoComponent } from '../view-contacto/view-contacto.component';
import { ViewCuentaBancariaComponent } from '../../../persona-module/components/view-cuenta-bancaria/view-cuenta-bancaria.component';
import { ViewBeneficiarioComponent } from '../../../persona-module/components/view-beneficiario/view-beneficiario.component';
import { ResponseEmitter } from '../../../../../common/interfaces/response.interface';
import { ViewPersonaComponent } from '../../../persona-module/components/view-persona/view-persona.component';

@Component({
  selector: 'app-view-depositante',
  templateUrl: './view-depositante.component.html',
  styleUrl: './view-depositante.component.css'
})
export class ViewDepositanteComponent implements OnInit {
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

    this.checkScreenSize();

    if (this.isSmallScreen) {
      this.isCollapsedPersona = false;
      this.isCollapsedCuentaBancaria = true;
      this.isCollapsedBeneficiario = true;
      this.isCollapsedContacto = true;
    }

    switch (this.type) {
      case 'nuevo':
        this.titleView = 'Agregar Depositante';
        break;

      case 'editar':
        this.titleView = 'Editar Depositante';
        break;

      case 'ver':
        this.titleView = 'Depositante';
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
  @ViewChild(ViewPersonaComponent) childPersona!: ViewPersonaComponent;
  @ViewChild(ViewCuentaBancariaComponent) childCuentaBancaria!: ViewCuentaBancariaComponent;
  @ViewChild(ViewBeneficiarioComponent) childBeneficiario!: ViewBeneficiarioComponent;
  @ViewChild(ViewContactoComponent) childContacto!: ViewContactoComponent;

  @Input() type: string = ''; // ver - editar - nuevo
  @Input() ci: string = '';

  @Output() response: EventEmitter<any> = new EventEmitter();

  formBusqueda = new FormGroup({
    busqueda: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required])
  });

  isSmallScreen!: boolean;

  isCollapsedPersona!: boolean;
  isCollapsedCuentaBancaria!: boolean;
  isCollapsedBeneficiario!: boolean;
  isCollapsedContacto!: boolean;

  titleView: string = '';

  //dataBusquedaUsuario = usuarioArrayBusqueda;

  /** ---------------------------------------- Methods ---------------------------------------- **/

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  tooglePersona() {
    if (this.isSmallScreen)
      this.isCollapsedPersona = !this.isCollapsedPersona
  }

  toogleCuentaBancario() {
    if (this.isSmallScreen)
      this.isCollapsedCuentaBancaria = !this.isCollapsedCuentaBancaria
  }

  toogleBeneficiario() {
    if (this.isSmallScreen)
      this.isCollapsedBeneficiario = !this.isCollapsedBeneficiario
  }

  toogleContacto() {
    if (this.isSmallScreen)
      this.isCollapsedContacto = !this.isCollapsedContacto
  }

  onClickCancel() {
    this.response.emit(
      {
        bool: false,
        data: null
      }
    );
  }

  onClickAceptar() {
    if (this.childPersona.childFormValid() && this.childCuentaBancaria.childFormValid() && this.childBeneficiario.childFormValid() && this.childContacto.childFormValid()) {
      this.isLoading = true;
    } else {
      this.showNotification('error', 'Complete los campos faltantes.');
    }
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/
  onResponseCI(event: ResponseEmitter) {
    this.ci = event.bool === true ? event.data.ci : '';
  }

  /** --------------------------------------- ShowNotification -------------------------------------- **/
  showNotification(type: 'success' | 'error' | 'warning' | 'info', msg: string) {
    this.notificationService.notify(type, msg);
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 1024;
  }
}