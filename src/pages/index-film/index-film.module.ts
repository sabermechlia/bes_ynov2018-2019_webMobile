import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndexFilmPage } from './index-film';

@NgModule({
  declarations: [
    IndexFilmPage,
  ],
  imports: [
    IonicPageModule.forChild(IndexFilmPage),
  ],
})
export class IndexFilmPageModule {}
