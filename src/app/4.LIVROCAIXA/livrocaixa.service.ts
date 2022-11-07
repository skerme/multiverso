import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivrocaixaService {



  // url = localStorage.getItem('EMPRESA')

    // Headers
    httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json' })
    }



 // injetando o HttpClient
 constructor(private httpClient: HttpClient) { }


   // Obtem todos os carros
   listar(): Observable<any[]> {
    return this.httpClient.get<any[]>(localStorage.getItem('EMPRESA')+'/livrocaixa')

  }

   // Obtem todos os carros
   listarAtivos(datas:any): Observable<any[]> {
    return this.httpClient.post<any[]>(localStorage.getItem('EMPRESA')+'/livrocaixa/estado/',JSON.stringify(datas), this.httpOptions)


  }



       // Obtem todos os carros
  listarQuantidadeDeDocumentos(): Observable<any[]> {
        return this.httpClient.get<any[]>(localStorage.getItem('EMPRESA')+'/estatistica/quantidadeDocumentos')

      }



       // Obtem todos os carros
       getUltimoDocumento(datas:any): Observable<any[]> {
     ///   console.log("ttttttttttttttt")
        return this.httpClient.post<any[]>(localStorage.getItem('EMPRESA') +'/estatistica/getUltimoDocumento',JSON.stringify(datas), this.httpOptions)


      //  return this.httpClient.get<any[]>(localStorage.getItem('EMPRESA')+'/estatistica/getUltimoDocumento')

      }




   // Obtem todos os carros
   listarAtivosAberturaCaixa(datas:any): Observable<any[]> {
    return this.httpClient.post<any[]>(localStorage.getItem('EMPRESA')+'/livrocaixa/aberturacaixa/', JSON.stringify(datas), this.httpOptions )

  }








   // salva um carro
   saveCar(car: any): Observable<any> {
console.log("SALVArrrrrrrrrrrrrrrrrrrrrrrR", car)

    return this.httpClient.post<any>(localStorage.getItem('EMPRESA')+'/livrocaixa', JSON.stringify(car), this.httpOptions)

  }

   // salva um carro
   saveCarAberturaCaixa(car: any): Observable<any> {
    console.log("SALVArrrrrrrrrrrrrrrrrrrrrrrR", car)

        return this.httpClient.post<any>(localStorage.getItem('EMPRESA')+'/livrocaixa', JSON.stringify(car), this.httpOptions)

      }




    // deleta um carro
    deleteCar(car: any) {
      console.log("ffffffffffffffff")
      return this.httpClient.delete<any>(localStorage.getItem('EMPRESA')+'/livrocaixa/'+car, this.httpOptions)
    }

    atualizar(_id: any,car: any): Observable<any> {
      console.log("ATUALIZAR", _id)
      return this.httpClient.put<any>(localStorage.getItem('EMPRESA')+'/livrocaixa/'+_id, JSON.stringify(car), this.httpOptions)
    }











}
