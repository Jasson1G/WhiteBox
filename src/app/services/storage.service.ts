import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  // Ejemplo de método para almacenar un valor en el almacenamiento local
  setItem(key: string, value: any): Promise<void> {
    return this.storage.set(key, value);
  }

  // Ejemplo de método para obtener un valor del almacenamiento local
  getItem(key: string): Promise<any> {
    return this.storage.get(key);
  }

  // Otros métodos para manejar el almacenamiento local según tus necesidades
}
