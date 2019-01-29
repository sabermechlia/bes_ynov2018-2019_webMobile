import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchmoviePage } from './searchmovie';

@NgModule({
  declarations: [
    SearchmoviePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchmoviePage),
  ],
})
export class SearchmoviePageModule {}
