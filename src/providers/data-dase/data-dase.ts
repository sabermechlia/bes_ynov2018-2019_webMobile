import { Injectable } from '@angular/core';

import { omdbApiService } from '../omdbservices/omdbservices';
import { ImdbApiGlobal } from '../../models/imdbapi-global.model';
import { ToastController, LoadingController, Loading , Platform} from 'ionic-angular';
//Native
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DATA_BASE_FILE_NAME: string = 'data.db';

@Injectable()
export class DataBaseProvider {
  loader: Loading;
  public db: SQLiteObject;
  resultat: ImdbApiGlobal;
  tab: ImdbApiGlobal[] = [];
  respence: boolean;
  tabId: string[] = [];
  constructor(public sqlite: SQLite,
    private omdbApiService: omdbApiService,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    private platform: Platform) {


  }
 
  public initMaBase(): void {
    
    this.sqlite.create({
      name: DATA_BASE_FILE_NAME,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        this.CreateTables();
      })
      .catch(e => console.log(e));
     
  }
  public delateMaBase() {
    this.sqlite.deleteDatabase({
      name: DATA_BASE_FILE_NAME,
      location: 'default'
    })
  }
  private CreateTables(): void {

    this.db.executeSql('CREATE TABLE IF NOT EXISTS `Film` ( `idFilm` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `film` INTEGER NOT NULL UNIQUE )', [])
      .then(() => {


        this.db.executeSql('CREATE TABLE IF NOT EXISTS `Serie` ( `idSerie` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `serie` TEXT NOT NULL )', [])
          .then(() => {

          })
          .catch();
      })
      .catch();

  }
  public InsertIntoFilm(idFilms: string) {
    
    this.db.executeSql('INSERT INTO `Film` (film) VALUES(\'' + idFilms + '\')', [])
      .then(() => {
  

        this.presentToast('Film bien ajouter');

      })
      .catch(e => {
        
        this.presentToast("Film existe déjà")



      });
     

  }
  public InsertIntoSerie() {

  }
  public getAllIdFilm(): Promise<any> {
    return this.db.executeSql('SELECT * FROM Film ORDER BY idFilm DESC', [])
      .then()
      .catch(e => console.log(e))


  }
  /*
  *return ALL FILM si le tableau de ImdbApiGlobal est vide si non un mise ajour du tableau
  *@param:tableau 
  */ 
  public SelectAllFilm(tableau: ImdbApiGlobal[]): ImdbApiGlobal[] {
    if (this.db) {

      this.db.executeSql('SELECT * FROM Film ORDER BY idFilm DESC', [])
        .then(res => {
          for (var i = 0; i < res.rows.length; i++) {
            if (res.rows.item(i)!="undefined") {
              this.omdbApiService.getResutatByimdbID(res.rows.item(i).film)
                .then(resultatFetched => {
                  if (tableau) {
                   
                    let trouve = false;
                    let j = 0;
                    while (!trouve && tableau.length > 0 && j < tableau.length) {
                      if (resultatFetched.imdbID === tableau[j].imdbID)
                        trouve = true;
                      j++;
                    }
                    if (!trouve) {
                      this.resultat = resultatFetched;
                      this.tab.push(this.resultat);
                    }
                  }
                  else {
                    this.resultat = resultatFetched;
                    this.tab.push(this.resultat);
                  }



                }
                );
            }
          }
        }
        )
        .catch();
    }
    return this.tab;
  }
  /*return un film de type ImdbApiGlobal by idmdb
  *@param:id
  */
  public getFilmById(id: string): ImdbApiGlobal {

    this.db.executeSql('SELECT * FROM Film WHERE film = \'' + id + '\'', [])
      .then(res => {
        this.omdbApiService.getResutatByimdbID(res.rows.item(0).film)
          .then(resultatFetched => {
            this.resultat = resultatFetched;
          })

      })
      .catch()
    return this.resultat;
  }
  /*return true si un film est dans le favoris 
  *@param: id
  */ 
  public isAddedFilm(id: string): Promise<boolean> {

    this.respence = false;
    console.log("id: " + id + "  " + this.respence);
    return this.db.executeSql('SELECT * FROM Film WHERE film = \'' + id + '\'', [])
      .then(res => {
        if (res.rows.length > 0)
          this.respence = true;
        console.log("id: " + id + "  " + this.respence);

        return this.respence;
      })


  }
  public deleteFav(id: string) {
    return this.db.executeSql('DELETE  FROM Film WHERE film = \'' + id + '\'', [])
      .then(() => {
        this.presentToast("Film supprime")
      }
      )
  }

  public SelectAllSerie() {

  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
