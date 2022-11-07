import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {



  // url = localStorage.getItem('EMPRESA')

    // Headers
    httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json' })
    }



 // injetando o HttpClient
 constructor(private httpClient: HttpClient) { }


   // Obtem todos os carros
   listarAtivos(datas:any): Observable<any[]> {

 /// console.log("UUUUUUUUUUUUUUUU", datas)


    return this.httpClient.post<any[]>(localStorage.getItem('EMPRESA')+'/venda/estado', JSON.stringify(datas), this.httpOptions)

  }









   // salva um carro
reporProduto(car: any): Observable<any> {
  console.log("SALVAR", car._id)

    return this.httpClient.post<any>(localStorage.getItem('EMPRESA')+'/venda/repor', JSON.stringify(car), this.httpOptions)


  }


//     // deleta um carro
//     deleteCar(car: any) {
//       console.log("ffffffffffffffff")
//       return this.httpClient.delete<any>(localStorage.getItem('EMPRESA')+'/livrocaixa/'+car, this.httpOptions)
//     }

//     atualizar(_id: any,car: any): Observable<any> {
//       console.log("ATUALIZAR", _id)
//       return this.httpClient.put<any>(localStorage.getItem('EMPRESA')+'/livrocaixa/'+_id, JSON.stringify(car), this.httpOptions)
//     }










}
