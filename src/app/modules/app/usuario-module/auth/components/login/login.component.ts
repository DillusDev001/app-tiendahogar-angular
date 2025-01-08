import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../../../common/services/notification.service';
import { Router } from '@angular/router';
import { NetworkStatusService } from '../../../../../../common/services/network-status.service';
import { deleteLocalStorageData, getLocalDataLogged, localStorageLogOut, setLocalDataLogged } from '../../../../../../common/utils/storage.utils';
import { DataLocalStorage } from '../../../../../../common/interfaces/storage.interface';
import { Usuario } from '../../../../../../common/utils/app/usuario-module/usuario/usuario.interface';
import { goLogin } from '../../../../../../common/utils/app/usuario-module/auth/auth.route';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../../common/utils/app/usuario-module/auth/auth.service';
import { ApiResult } from '../../../../../../common/interfaces/api.interface';
import { formatDate } from '@angular/common';
import { decodeJWT, decodeJWTUsuario, isTokenExpired } from '../../../../../../common/utils/jwt.utils';
import { catchError, of, timeout } from 'rxjs';
import { goDashBoard } from '../../../../../../common/router/dashboard.route';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService,
    private networkStatusService: NetworkStatusService
  ) {
    if (getLocalDataLogged() != null) {
      this.dataLocalStorage = getLocalDataLogged();
      if (this.dataLocalStorage.tokken != 'null') {
        const decodedToken = decodeJWT(this.dataLocalStorage.tokken);
        if (decodedToken != null) {
          if (!isTokenExpired(decodedToken)) {
            goDashBoard(this.router)
          } else {
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
  formLogin = new FormGroup({
    usuario: new FormControl('dillus.lab.bo@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('mudanzas*123', [Validators.required])
  });

  /** ---------------------------------------- Methods ---------------------------------------- **/

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickLogin() {
    if (this.formLogin.valid && this.isOnline) {
      this.isLoading = true;

      const usuario = String(this.formLogin.controls.usuario.value);
      const password = String(this.formLogin.controls.password.value);

      this.authFindOne(usuario, password);
    }
  }

  onClickRegistrarse() { }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  authFindOne(usuario: string, password: string) {
    this.authService.authFindOne(usuario, password).pipe(
      timeout(10000), // tiempo máximo de espera en milisegundos
      catchError(error => {
        if (error.name === 'TimeoutError') {
          // Manejar el error de tiempo de espera
          this.showNotification('error', 'La conexión ha tardado demasiado.');
          this.isLoading = false;
        } else {
          // Manejar otros errores, como la falta de conexión
          this.showNotification('error', 'Error de conexión.');
          this.isLoading = false;
        }
        // Devolver un Observable vacío o algún valor predeterminado
        return of(null);
      })
    )
      .subscribe({
        next: result => {
          if (result) {
            result as ApiResult;

            if (result.boolean) {
              const usuario = decodeJWTUsuario(result.data[0]) as Usuario

              if (usuario.estado === 1) {
                this.dataLocalStorage.tokken = result.data[0];
                this.dataLocalStorage.loggedDate = formatDate(Date.now(), 'dd/MM/y, h:mm a', 'es');
                setLocalDataLogged(this.dataLocalStorage);

                goDashBoard(this.router);
              } else {
                this.showNotification('error', 'El usuario fue eliminado.');
                this.isLoading = false;
              }
            } else {
              this.showNotification('error', result.message);
              this.isLoading = false;
            }
          }
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