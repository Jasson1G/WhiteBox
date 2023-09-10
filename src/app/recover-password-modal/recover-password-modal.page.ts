import { Component } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-recover-password-modal',
  templateUrl: 'recover-password-modal.page.html',
  styleUrls: ['recover-password-modal.page.scss'],
})
export class RecoverPasswordModalPage {
  username: string = '';
  newPassword: string = '';

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private storage: Storage,
    private toastController: ToastController
  ) {}

  ionViewWillEnter() {
    this.username = this.navParams.get('username') || '';
  }

  async recoverPassword() {
    // Verifica si el nombre de usuario existe en el almacenamiento
    const existingUsername = await this.storage.get('user.username');

    if (existingUsername === this.username) {
      // Obtiene la contraseña actual almacenada
      const currentPassword = await this.storage.get('user.password');

      if (currentPassword === this.newPassword) {
        // La nueva contraseña es igual a la actual
        this.presentToast('La nueva contraseña es igual a la contraseña actual.', 'danger');
      } else {
        // Cambia la contraseña en el almacenamiento
        await this.storage.set('user.password', this.newPassword);

        // Muestra un mensaje de éxito
        this.presentToast('La contraseña se ha cambiado exitosamente.', 'success');

        // Cierra la página modal y pasa cualquier dato necesario de vuelta a la página anterior si es necesario
        this.modalController.dismiss({
          newPassword: this.newPassword,
        });
      }
    } else {
      // El nombre de usuario no existe
      this.presentToast('Nombre de usuario no válido.', 'danger');
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color,
    });
    toast.present();
  }
}
