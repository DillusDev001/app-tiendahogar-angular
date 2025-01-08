import { Component } from '@angular/core';
import { NotificationService } from '../../../../common/services/notification.service';
import { CustomNotification } from '../../../../common/interfaces/notification.interface';

@Component({
  selector: 'app-custom-notification',
  templateUrl: './custom-notification.component.html',
  styleUrl: './custom-notification.component.css'
})
export class CustomNotificationComponent {

  notification: CustomNotification | null = null;
  ngClass: string = '';

  constructor(private notificationService: NotificationService) {
    // Escucha los mensajes emitidos por el servicio
    this.notificationService.notification$.subscribe((notification) => {
      this.notification = notification;

      this.ngClass = this.getNotificationType(notification.type)

      // Oculta la notificación automáticamente después de 3 segundos
      setTimeout(() => (this.notification = null), 3000);
    });
  }

  getNotificationType(type: string): string {
    switch (type) {
      case 'success':
        return 'bg-color-success text-light';

      case 'error':
        return 'bg-color-error text-light';

      case 'warning':
        return 'bg-color-warning text-light';

      case 'info':
        return 'bg-color-info text-light';

      default:
        return 'bg-light text-dark';
    }
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'success': return 'fa-regular fa-circle-check fa-xl';
      case 'error': return 'fa-regular fa-circle-xmark fa-xl';
      case 'warning': return 'fa-solid fa-triangle-exclamation fa-xl';
      case 'info': return 'fa-solid fa-circle-info fa-xl';
      default: return '';
    }
  }
}