import { EventEmitter, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DBProviderService {

  registros = [];
  registros$ = new EventEmitter();
  constructor( private storage: Storage ) {
    this.traerRegistros();
  }

  async traerRegistros(){

    this.registros = await this.storage.get('registros');

    this.registros$.emit(this.registros);
  }

  guardarRegistro( post ){

    if ( !this.registros ) {
      this.registros = [];
    }

    this.registros.unshift( post );
    this.storage.set('registros', this.registros);
  }

  editarRegistro( index: number, post ){

    const arrayTemp = [];

    this.registros.forEach( ( e, i ) => {
      if ( i === index ) {
        arrayTemp.push(post);
      } else {
        arrayTemp.push(e);
      }
    });

    this.registros = arrayTemp;

    this.registros$.emit( this.registros );

    this.storage.set('registros', this.registros);
  }

  eliminarRegistro( index: number ) {

    const arrayTemp = [];

    this.registros.length === 0 ? this.registros = null :
    this.registros.forEach( (e, i ) => {

      if ( index !== i ) {
        arrayTemp.push(e);
      }

    });

    this.registros = arrayTemp;

    this.storage.set('registros', this.registros);

    this.registros$.emit(this.registros);
  }

  eliminarTodos() {
    this.storage.clear();
    this.registros = null;
    this.registros$.emit(this.registros);
  }

}
