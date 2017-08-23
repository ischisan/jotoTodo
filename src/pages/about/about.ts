import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styles: [`
		.about-card {
			max-width: 300px;
			text-align: center;
		}
  `]
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

}
