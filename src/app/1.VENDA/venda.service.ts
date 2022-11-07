import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

//  url = localStorage.getItem('EMPRESA');

// Headers
httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json' })
}




constructor(private httpClient: HttpClient) { }




   // salva um carro
   vender(car: any): Observable<any> {
    console.log("SALVAR", car._id)

        return this.httpClient.post<any>(localStorage.getItem('EMPRESA')+'/venda', JSON.stringify(car), this.httpOptions)
      }


   // Obtem todos os carros
   listarVendedorTotal(datas:any): Observable<any[]> {
    return this.httpClient.post<any>(localStorage.getItem('EMPRESA')+'/venda/totalVendedor', JSON.stringify(datas), this.httpOptions)
  }




 // Obtem todos os carros
 listarFormaPagamentoTotal(datas:any): Observable<any[]> {
  return this.httpClient.post<any>(localStorage.getItem('EMPRESA')+'/venda/totalPorFormaDePagamento', JSON.stringify(datas), this.httpOptions)

  
}




}
