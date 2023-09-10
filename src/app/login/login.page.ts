import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RecoverPasswordModalPage } from '../recover-password-modal/recover-password-modal.page';
import { ModalController } from '@ionic/angular'; 
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  private loading: HTMLIonLoadingElement | null = null;

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private loadingController: LoadingController,
    private router: Router,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  async login() {
    // Mostrar un mensaje de carga
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      translucent: true,
      cssClass: 'custom-loading',
    });

    await loading.present();

    // Obtener los datos almacenados
    const storedUsername = await this.storage.get('user.username');
    const storedPassword = await this.storage.get('user.password');

    // Simula una espera de 2 segundos antes de verificar las credenciales
    setTimeout(async () => {
      // Verificar las credenciales
      if (this.username === storedUsername && this.password === storedPassword) {
        // Credenciales válidas, redirigir al home
        this.navCtrl.navigateRoot('/home'); 
      } else {
        // Credenciales inválidas, mostrar un mensaje de error como Toast
        const toast = await this.toastController.create({
          message: 'Credenciales incorrectas. Por favor, inténtelo de nuevo.',
          duration: 3000,
          position: 'bottom',
          color: 'danger',
        });
        toast.present();
      }

      loading.dismiss(); // Cierra el mensaje de carga después de verificar las credenciales
    }, 2000); // Espera 2 segundos (ajusta el tiempo según tu necesidad)
  }

  goToRegister() {
    this.showLoading();
    setTimeout(() => {
      this.router.navigate(['/register']);
      this.dismissLoading();
    }, 2000);
  }

  async showLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...',
      translucent: true,
      cssClass: 'custom-loading',
    });
    await this.loading.present();
  }

  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null; 
    }
  }

  async openRecoverPasswordModal() {
    const modal = await this.modalController.create({
      component: RecoverPasswordModalPage,
    });
    await modal.present();
  }
}
