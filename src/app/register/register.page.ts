import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  nombreCompleto: string = '';
  rut: string = '';
  username: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  async register() {
    // Verifica si el nombre de usuario ya existe en el almacenamiento
    const existingUsername = await this.storage.get('user.username');

    if (existingUsername === this.username) {
      // El nombre de usuario ya existe, muestra un mensaje emergente
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El nombre de usuario ya está registrado.',
        buttons: ['OK'],
      });

      await alert.present();
    } else {
      // El nombre de usuario no existe, procede con el registro
      const loading = await this.loadingController.create({
        message: 'Registrando...',
        translucent: true,
        cssClass: 'custom-loading',
      });

      await loading.present(); // Muestra la ventana emergente de carga

      // Guarda los datos en el almacenamiento (nombre completo, rut, nombre de usuario y contraseña)
      await this.storage.set('user.nombreCompleto', this.nombreCompleto);
      await this.storage.set('user.rut', this.rut);
      await this.storage.set('user.username', this.username);
      await this.storage.set('user.password', this.password);

      // Simula una espera de 1 segundo antes de redirigir
      setTimeout(() => {
        loading.dismiss(); // Cierra la ventana emergente de carga
        this.navCtrl.navigateRoot('/login'); // Redirige a la página de inicio de sesión
      }, 1000); // Tiempo de espera de 1 segundo
    }
  }
}
