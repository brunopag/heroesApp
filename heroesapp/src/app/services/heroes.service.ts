import { Injectable } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HeroesService {

  heroesUrl:string = "https://heroesapp-85340.firebaseio.com/heroes.json";
  heroeUrl:string = "https://heroesapp-85340.firebaseio.com/heroes/"

  constructor(private http:Http) { }

  nuevoHeroe(heroe:Heroe){
    //Convierte el heroe en un json valido
    let body = JSON.stringify(heroe);
    //Configura el header de la peticion http
    let headers = new Headers({
      'Content-Type':'application-json'
    })
      //Retornar el resultado de la peticion POST HTTP
      return this.http.post(this.heroesUrl, body, {headers})
      .map(res=>{
        console.log(res.json());
        return res.json();
      })
  }

  actualizarHeroe(heroe:Heroe, key$:string){
    //Convierte el heroe en un json valido
    let body = JSON.stringify(heroe);
    //Configura el header de la peticion http
    let headers = new Headers({
      'Content-Type':'application-json'
    })

    let url = this.heroeUrl + key$ + ".json";

      //Retornar el resultado de la peticion POST HTTP
      return this.http.put(url, body, {headers})
      .map(res=>{
        console.log(res.json());
        return res.json();
      })
  }

  getHeroe(key$:string){
    let url = this.heroeUrl + key$ + ".json";
    console.log(url);
    return this.http.get(url).map( res =>  res.json() );
  }

  getHeroes(){
    return this.http.get(this.heroesUrl).map( res =>  res.json() );
  }

  borraHeroe(key$:string){
    let url = this.heroeUrl + key$ + ".json";
    return this.http.delete(url).map( res =>  res.json() );
  }

}
