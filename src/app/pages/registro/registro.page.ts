import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DBProviderService } from '../../services/dbprovider.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  opciones = {
    allowSlidePrev : false,
    allowSlideNext : false,
  };
  constructor( private _DB: DBProviderService,
               private navCtrl: NavController ) { }

  ngOnInit() {
  }

  onClick( post ){
    this._DB.guardarRegistro( post );
    this.navCtrl.navigateRoot('/tabs');
  }

}
