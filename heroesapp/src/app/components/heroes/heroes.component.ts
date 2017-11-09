import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

  heroes:any;
  loading:boolean = true;

  constructor(private _heroesService:HeroesService) {

    this._heroesService.getHeroes()
    .subscribe(data=>{
      console.log(data);
      this.heroes = data;
      this.loading = false;
    })

  }

  ngOnInit() {
  }

  borraHeroe(key$:string){
    this._heroesService.borraHeroe(key$)
    .subscribe(respuesta=>{
      if(respuesta){
        console.error(respuesta)
      }else{
        delete this.heroes[key$]
      }

    })
  }

}
