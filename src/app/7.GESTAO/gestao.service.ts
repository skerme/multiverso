import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestaoService {



  // //url = localStorage.getItem('EMPRESA')

    // Headers
    httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json' })
    }



 // injetando o HttpClient
 constructor(private httpClient: HttpClient) { }





  listar(datas:any): Observable<any[]> {
    return this.httpClient.post<any>( localStorage.getItem('EMPRESA')+'/venda/getPorValorTotalDaVenda', JSON.stringify(datas), this.httpOptions)


  }




   // Obtem todos os carros
   obterDescontoTotalPeriodo(datas:any): Observable<any[]> {
    return this.httpClient.post<any[]>(localStorage.getItem('EMPRESA')+'/venda/getAllValorTotalDesconto', JSON.stringify(datas), this.httpOptions)

  }

   // Obtem todos os carros
   obterQuantidadeVendidaItensAtacadoVarejo(datas:any): Observable<any[]> {
    return this.httpClient.post<any[]>(localStorage.getItem('EMPRESA')+'/venda/obterQuantidadeVendidaItensAtacadoVarejo', JSON.stringify(datas), this.httpOptions)

  }




   // salva um carro
   getQuantidadeVendidaCodigoTamanho(car: any): Observable<any> {
 console.log("SALVAR", car)

    return this.httpClient.post<any>(localStorage.getItem('EMPRESA')+'/venda/getQuantidadeVendidaCodigoTamanho', JSON.stringify(car), this.httpOptions)

  }




    // Obtem todos os carros
    obterCustoVendaTotalPeriodo(datas:any): Observable<any[]> {
    //  console.log("ffffffffffffffSHELDON4444")
      return this.httpClient.post<any[]>(localStorage.getItem('EMPRESA')+'/venda/getAllValorPrecoCompra', JSON.stringify(datas), this.httpOptions)

    }


    // Obtem todos os carros
    obterDespesaTotalPeriodo(datas:any): Observable<any[]> {
         return this.httpClient.post<any[]>(localStorage.getItem('EMPRESA')+'/livrocaixa/getAllDespesaTotalPeriodo', JSON.stringify(datas), this.httpOptions)

    }


    // Obtem todos os carros
    getquantidadeItensVendidos(datas:any): Observable<any[]> {
  //   console.log("ffffffffffffffSHELDON4444")
      return this.httpClient.post<any[]>(localStorage.getItem('EMPRESA')+'/venda/getquantidadeItensVendidos', JSON.stringify(datas), this.httpOptions)

    }


            // Obtem todos os carros
            getEstoqueQuantidadeItens(): Observable<any[]> {

                      return this.httpClient.get<any[]>(localStorage.getItem('EMPRESA') +'/produto/getEstoqueQuantidadeItens')

                    }



            // Obtem todos os carros
            getEstoquePrecoDecusto(): Observable<any[]> {
      //        console.log("ffffffffffffffSHELDON4444")
              return this.httpClient.get<any[]>(localStorage.getItem('EMPRESA')+'/produto/getEstoquePrecoDecusto')

            }





        // Obtem todos os carros
        getPvvarejo(): Observable<any[]> {
 //         console.log("ffffffffffffffSHELDON4444")
          return this.httpClient.get<any[]>(localStorage.getItem('EMPRESA')+'/produto/getPvVarejo')

        }



    // Obtem todos os carros
    getPvAtacado(): Observable<any[]> {
  //    console.log("ffffffffffffffSHELDON4444")
      return this.httpClient.get<any[]>(localStorage.getItem('EMPRESA')+'/produto/getPvAtacado')

    }



}
