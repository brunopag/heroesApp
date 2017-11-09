import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent implements OnInit {

  private heroe:any = {
    nombre:"",
    bio:"",
    casa:"Marvel"
  }

  id:string;

  constructor(private _heroesService:HeroesService,
              private router:Router,
              private activatedRoute:ActivatedRoute) {

                this.activatedRoute.params.subscribe(parametros =>{
                  console.log(parametros);
                  this.id = parametros['id'];

                  if(this.id !== "nuevo"){
                    this._heroesService.getHeroe(this.id)
                      .subscribe(
                        heroe =>{
                          this.heroe = heroe;
                          console.log(heroe)
                      })
                  }
                })
              }

  ngOnInit() {
  }

  guardar(){
    if(this.id === "nuevo"){
      //Nuevo registro
      console.log(this.heroe);
      this._heroesService.nuevoHeroe(this.heroe)
      .subscribe(data =>{
          this.router.navigate(['/heroe', data.name])
      },
      error=> console.error(error))
    }else{
      //Actualizacion de registro
      this._heroesService.actualizarHeroe(this.heroe, this.id)
      .subscribe(data =>{

      },
      error=> console.error(error))
    }
  }

  agregarHeroe(forma:NgForm){
    this.router.navigate(['/heroe', 'nuevo']);
    forma.reset({
      casa:"Marvel"
    })
  }

}
