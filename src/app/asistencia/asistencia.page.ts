import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage {
  username: string = '';

  constructor(private navCtrl: NavController,private storage: Storage,private route: ActivatedRoute) {}

    async ionViewWillEnter() {
      // Recupera el nombre de usuario del Local Storage
      this.username = await this.storage.get('user.username');
    }
  }


