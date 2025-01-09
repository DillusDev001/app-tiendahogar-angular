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
import { usuarioArrayBusqueda } from '../../../../../common/utils/app/usuario-module/usuario/usuario.array';
import { RiesgoService } from '../../../../../common/utils/app/riesgo-module/riesgo.service';
import { ApiResult } from '../../../../../common/interfaces/api.interface';
import { Riesgo } from '../../../../../common/utils/app/riesgo-module/riesgo.interface';
import { arraySector } from '../../../../../common/utils/local/arrays/common.array';

@Component({
  selector: 'app-view-ocupacion',
  templateUrl: './view-ocupacion.component.html',
  styleUrl: './view-ocupacion.component.css'
})
export class ViewOcupacionComponent implements OnInit {
  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private networkStatusService: NetworkStatusService,
    private riesgoService: RiesgoService
  ) {
    if (getLocalDataLogged() != null) {
      this.dataLocalStorage = getLocalDataLogged();
      if (this.dataLocalStorage.tokken != 'null') {
        const decodedToken = decodeJWT(this.dataLocalStorage.tokken);
        if (decodedToken != null) {
          if (!isTokenExpired(decodedToken)) {
            this.userLogeado = decodeJWTUsuario(this.dataLocalStorage.tokken) as Usuario

            this.riesgoFindAll()

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

  // ================  ================ //
  @Input() type: string = ''; // ver - editar - nuevo
  @Input() ci: string = '';

  @Output() response = new EventEmitter<any>();

  // para devolver el CI a View-Depositante cuando se encuentre
  @Output() responseCI = new EventEmitter<any>();

  formOcupacion = new FormGroup({
    ocupacion: new FormControl('', [Validators.required]),
    sector: new FormControl('', [Validators.required]),
    nota: new FormControl('', []),
    fec_mod: new FormControl('', []),
    user_mod: new FormControl('', []),
  });


  dataOcupacion: any[] = [];
  dataSector = arraySector;

  /** ---------------------------------------- Methods ---------------------------------------- **/

  /** ------------------------------------ Methods onClick ------------------------------------ **/

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  riesgoFindAll() {
    this.riesgoService.riesgoFindAll('ocupacion', 'ASC').subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        const dataResult = result.data as Riesgo[];

        dataResult.forEach(item => {
          this.dataOcupacion.push({
            value: item.ocupacion,
            data: item.ocupacion
          })
        });

      } else {
        this.showNotification('error', 'Error al cargar los datos de la ocupación.');
      }
    });
  }

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/

  /** --------------------------------------- ShowNotification -------------------------------------- **/
  showNotification(type: 'success' | 'error' | 'warning' | 'info', msg: string) {
    this.notificationService.notify(type, msg);
  }
}