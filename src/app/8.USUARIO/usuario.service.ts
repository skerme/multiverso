import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {



  // url = localStorage.getItem('EMPRESA')

    // Headers
    httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json' })
    }



 // injetando o HttpClient
 constructor(private httpClient: HttpClient) { }


   // Obtem todos os carros
   listar(email: string): Observable<any[]> {

    //  console.log("yyyyyAAAAAAAAAAAAAASSSSSSSSSSSSSSSS", email)


    return this.httpClient.get<any[]>(localStorage.getItem('EMPRESA')+'/users/usuario/'+email)

  }


   // Obtem todos os carros
   listarAtivo(): Observable<any[]> {
    return this.httpClient.get<any[]>(localStorage.getItem('EMPRESA')+'/users/estado/'+'1')

  }




   // salva um carro
   saveCar(car: any): Observable<any> {
//console.log("SALVAR", car._id)

    return this.httpClient.post<any>(localStorage.getItem('EMPRESA')+'/users', JSON.stringify(car), this.httpOptions)

  }


    // deleta um carro
    deleteCar(car: any) {
    //  console.log("ffffffffffffffff")
      return this.httpClient.delete<any>(localStorage.getItem('EMPRESA')+'/users/'+car, this.httpOptions)
    }

    atualizar(_id: any,car: any): Observable<any> {
    ///  console.log("ATUALIZAR", _id)
      return this.httpClient.put<any>(localStorage.getItem('EMPRESA')+'/users/'+_id, JSON.stringify(car), this.httpOptions)
    }










}
