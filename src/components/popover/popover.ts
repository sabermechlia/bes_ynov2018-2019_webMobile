import { Component } from '@angular/core';
import { NavParams, LoadingController, Loading, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
//Local
import { DataBaseProvider } from '../../providers/data-dase/data-dase';
import { ImdbApiGlobal } from './../../models/imdbapi-global.model';
//Native
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})

export class PopoverComponent {

  loader: Loading;
  tab: ImdbApiGlobal[];
  constructor(private nav: NavParams,
    private maBase: DataBaseProvider,
    private FileChooser: FileChooser, private File: File,
    private filePath: FilePath,
    private shear: SocialSharing,
    private loadingCtrl: LoadingController,
    private view: ViewController,
    private alertCtrl: AlertController) {


  }
  Import() {
    this.FileChooser.open()
      .then(file => {
        this.filePath.resolveNativePath(file).then(resolvedFilePath => {
          let items;
          let path = resolvedFilePath.substring(0, resolvedFilePath.lastIndexOf('/'));
          let file = resolvedFilePath.substring(resolvedFilePath.lastIndexOf('/') + 1, resolvedFilePath.length);
          this.File.readAsText(path, file)
            .then(data => {
              let returnJson = JSON.parse(data);
              items = returnJson;
              this.AjouterDansMabase(items)
            }).catch(err => alert("Ficher Non Supporté !!"));
        }).catch(err => alert(JSON.stringify(err)));
      })
      .catch(e => console.log(e));
  }

  AjouterDansMabase(items) {
    this.presentLoading()
    let i=0;
    let Promises=[];
    for (let item of items)
    {
       Promises.push (this.maBase.db.executeSql('INSERT INTO `Film` (film) VALUES(\'' + item + '\')', []).then(()=>i++))
    }
    Promise.all(Promises).then(()=>alert(i+" Nouveau Favories")).catch(()=>{alert(i+" Nouveau Favories");this.view.dismiss()});
    this.loader.dismiss().then(()=>alert(i+" Nouveau Favories!"));
  }
  
  advanceSearch(): void
{
    let prompt = this.alertCtrl.create({
    title: 'shear',
    message: 'Select option ',
    inputs : [
    {
        type:'radio',
        label:'Export CSV',
        value:'CSV'
    },
    {
        type:'radio',
        label:'Export JSON',
        value:'JSON'
    }],
    buttons : [
    {
        text: "Cancel",
        handler: data => {
        console.log("cancel clicked");
        }
    },
    {
        text: "Search",
        handler: data => {
        console.log("search clicked" + data);
        this.Export(data);
        }
    }]});
    prompt.present();
}
  Export(type) {
    
    this.maBase.getAllIdFilm()
      .then(res => {
        let tabId: string[] = [];
        for (var i = 0; i < res.rows.length; i++) {
          let item = res.rows.item(i).film;
          tabId.push(item);
        }
        
        let jFile = JSON.stringify(tabId);
        let dir = 'TempFavMovieApp';
        let nameFile = 'Favories.'+type;
        
        let resul = this.File.createDir(this.File.externalRootDirectory, dir, true);
        resul.then(
          (data) => {
            this.File.writeFile(data.toURL(), nameFile, jFile, { replace: true })
            let racine = this.File.externalRootDirectory;

            this.shear.share('', '', racine + '/' + dir + '/' + nameFile, '');
           
          }
        ).catch(e => console.log(e))

      })
      .catch(e => console.log(e))





  }

  ionViewDidLoad() {
    this.maBase.initMaBase()
  }


  private presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

}
