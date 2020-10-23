import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DBProviderService } from '../../services/dbprovider.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  registros = [];

  constructor( public _DB: DBProviderService,
               private alertController: AlertController ) {
  }

  eliminarRegistro( index: number ) {
    this._DB.eliminarRegistro( index );
  }

  async editarRegistro( index: number, post ) {
    const alert = await this.alertController.create({
      header: 'Editar',
      mode: 'ios',
      inputs: [
        {
          value: post.titulo,
          label: 'Titulo',
          name: 'titulo',
          type: 'text',
          placeholder: 'Nuevo titulo'
        },
        {
          value: post.texto,
          label: 'Post',
          name: 'texto',
          type: 'textarea',
          placeholder: 'Nuevo texto'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Modificar',
          handler: ( postModificado ) => {
            this._DB.editarRegistro( index, postModificado );
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarTodos(){

    this._DB.eliminarTodos();
  }

}
