import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StorageService } from './services/storage.service';
import { Storage } from '@ionic/storage';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],

  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule],
  providers: [
    // Otras declaraciones de providers
    Storage, // Añade el servicio Storage aquí
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}