///////////////////////

import {  HostListener, OnInit, ViewChild } from '@angular/core';



import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

//////////////////////////////////////////////////////////








import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';

import { Router } from '@angular/router';
import { Registro } from './4.LIVROCAIXA/registro';
import { GestaoService } from './7.GESTAO/gestao.service';
import { VendaService } from './1.VENDA/venda.service';
import { HistoricoService } from './3.HISTORICO/historico.service';
import { LivrocaixaService } from './4.LIVROCAIXA/livrocaixa.service';
import { ProdutoService } from './2.PRODUTO/produto.service';
import { EstatisticaService } from './estatistica.service';
import { timestamp } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {


 TOTALEVENTOSLAVAJATOBEBIDAS1=0
 TOTALEVENTOSLAVAJATOBEBIDAS2=0
 TOTALEVENTOSLAVAJATOBEBIDAS3=0
////////////////

CUSTODACOMPRA=0

TOTALENTRADAESTOQUE: number=0

valor_predicoes: any

totalItensEstoque: number=0

historicoProduto: any[]=[]


quantidadeEntradaNoPeriodo: any[]=[]

listaDespesas: any[]=[]


valorAberturaCaixa: number=0
empresa: String=''

   //ngx-bootrstrap 3333333333/total 5
  bsRangeValue: Date[];

  step = 0;



  resolucao: number=( window.innerWidth)

  quantidadeDeAcessos: number=0
  ultimoacesso: any=[{"_id":"622a8d714ed49f7a91635310","descricao":"","valor":'',"data":"","estado":1,"perfil":"","__v":0}]


  quantidadeDeItensVendidosPeriodo: number=0

  totalPrecoCompra: number=0
  totalPvVarejo: number=0
  totalPvAtavado: number=0





  vendaPorVendedor:any[]=[]

  vendaPorForma: any[]=[{"_id":null,"pix":0,"dinheiro":0,"debito":0,"credito":0}]

  itensVendidos:any[]=[]


  panelOpenState = false;

  valorRCB: number = 0;
  desconto: number=0;
  valorCMV: number=0;
  valorDESPESA: number=0;
  QuantidadeVendidaItensAtacadoVarejo: any[]=[]



///////////////////////////para fazer a tabela

  displayedColumns1 = [
    'codigo',
    // 'tamanho',
    'descricao',
    'quantidade',
    'comprar',
    'custocompra',
     'inicial',
     'entrada',

    'final',

    'duracao',
    'media',
    'custo',
    'receita',

    'ganho',
    'ganhoPercentual',

  ];


  dataSource1!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator1!: MatPaginator;
  @ViewChild(MatSort) matSort1!: MatSort;



////////////////////////////////////



////////para LISTAR DESPESAS
displayedColumns3 = [
  'acao',
  'descricao',
  'valor',
  'data',
  'perfil'
];
dataSource3!: MatTableDataSource<any>;

@ViewChild('paginator') paginator3!: MatPaginator;
@ViewChild(MatSort) matSort3!: MatSort;
////////////para LISTAR DESPESAS



resultado: any[]=[]
resultado2:any[]=[]

getDiasFuncionando: number=0

  constructor(                    //para eu navegar nas rotas via typescript
    private router: Router,
    private formBuilder: FormBuilder,
    private gestaoService: GestaoService,
    private vendaService: VendaService,
    private historicoService: HistoricoService,
    private livroCaixaService: LivrocaixaService,
    private consumirService: ProdutoService,
    private estatisticaService: EstatisticaService

   ) {

    var x= new Date()


//3.5
    x.setHours(x.getHours()-3.5)
    x.setMinutes(0)
    x.setSeconds(0)
    x.setMilliseconds(0)
   this.bsRangeValue = [x, x];




   }

   ngOnInit(): void
   {

    this.getDiasFuncionando=0


    this.getEstoqueQuantidadeItens()




   //this.predicoes()


    this.valorAberturaCaixa=0

    this.vendaPorForma= [{"_id":null,"pix":0,"dinheiro":0,"debito":0,"credito":0}]

  //  this.QUANTIDADEDEREGISTROS()
    this.pegaRegistroMaisRecente()     /// botei aqui para nao dar erro de nao ter o valor na hora de mostrar;
    this.RCB()
//   this.DESCONTO()
  //  this.CMV()
  //  this.DESPESA()
    this.listarAtivoDespesas()
    this.obterQuantidadeVendidaItensAtacadoVarejo()
    this.quantidadeItensVendidosPeriodo()
    this.getTodosItensQuantidadeVendidaCodigoTamanho()
    this.listarFormaPagamentoTotal();
    this.listarVendedorTotal();
    this.listarHistorico()
    // this.QUANTIDADEDEREGISTROS()
    // para pegar os dados do estoque
    this.getEstoquePrecoDecusto()
    this.getPvVarejo()
    this.getPvAtacado()
     // para pegar os dados do estoque

   }


   filterData1($event: any) {
    this.dataSource1.filter = $event.target.value;
  }

////////////para LISTAR DESPESAS
   listarAtivoDespesas() {

    this.listaDespesas=[]



            this.livroCaixaService.listarAtivos(

              {
                "inicio":  this.bsRangeValue[0],
                "fim":   this.bsRangeValue[1],
                "perfil":'administrador'


            }


            ).subscribe((itens: any) => {
              this.listaDespesas=itens

        //  console.log("fffffffff",this.listaDespesas )
            });
          }
////////////para LISTAR DESPESAS


////////////para LISTAR DESPESAS
   filterData3($event: any) {
    this.dataSource3.filter = $event.target.value;
  }
////////////para LISTAR DESPESAS


   listarHistorico() {
    this.consumirService.listar().subscribe((itens: any) => {
      this.historicoProduto=itens
      // this.dataSource2 = new MatTableDataSource(itens);
      // this.dataSource2.paginator = this.paginator2;
      // this.dataSource2.sort = this.matSort2;

    });
   }



  //  QUANTIDADEDEREGISTROS(){



  //   // console.log('fdfdfkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');

  //     this.livroCaixaService.listarQuantidadeDeDocumentos().subscribe((itens: any) => {

  //     // console.log('fdfdfkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', this.quantidadeDeAcessos);
  //       this.quantidadeDeAcessos=itens
  //    });
  //  }


   pegaRegistroMaisRecente(){
   // console.log("ttttttttttttttttgggggggggggghhhhhhhhhhhhhhhhh111111111111111111111111111")


   this.ultimoacesso=[{"_id":"622a8d714ed49f7a91635310","descricao":"","valor":111,"data":"","estado":1,"perfil":"","__v":0}]
     //console.log("ttttttttttttttttgggggggggggghhhhhhhhhhhhhhhhh111111111111111111111111111")





    this.livroCaixaService.getUltimoDocumento(

      {
        "inicio":  this.bsRangeValue[0],
        "fim":   this.bsRangeValue[1],
        "perfil":'administrador'


    }


    ).subscribe((itens: any) => {

      this.quantidadeDeAcessos=0
      if(itens.length>0){
        this.ultimoacesso=itens

        console.log("ggggggg", itens)
        this.quantidadeDeAcessos=itens.length
      }

    });










//       this.livroCaixaService.getUltimoDocumento().subscribe((itens: any) => {
//  console.log("ttttttttttttttttgggggggggggghhhhhhhhhhhhhhhhh", itens)

//         this.ultimoacesso=itens
//      });



   }












//////////NOVO MENU///
   menunovo(valor: number){
    if (valor==0)          { localStorage.setItem('EMPRESA', 'https://gestaomadsonapi.herokuapp.com' ); this.empresa='MADSON' }
    if (valor==1)          { localStorage.setItem('EMPRESA','https://lavajatodovilarejoapi.herokuapp.com');  this.empresa='LAVAJATO' }
    if (valor==2)          { localStorage.setItem('EMPRESA','http://localhost:3000');  this.empresa='LOCALHOST' }
    if (valor==3)          { localStorage.setItem('EMPRESA','https://eventosapii.herokuapp.com');  this.empresa='EVENTOS' }
    if (valor==4)          { localStorage.setItem('EMPRESA','https://bebidasapih.herokuapp.com');  this.empresa='BEBIDAS' }


  // PARA O MENU NO CELULAR RECUPAR APOS ESCOLHER A OPCAO  11
  let element: HTMLElement = document.getElementsByClassName( 'navbar-toggler' )[ 0 ] as HTMLElement;
  if ( element.getAttribute( 'aria-expanded' ) == 'true' ) {
      element.click();
  // PARA O MENU NO CELULAR RECUPAR APOS ESCOLHER A OPCAO  11
  }

  }




  lerAberturaCaixa(){
    this.livroCaixaService.listarAtivosAberturaCaixa(

      {
        "inicio": new Date(),
        "fim":new Date(),
        "perfil": "administrador"
    }


    ).subscribe((itens: any) => {

      // console.log("PPPPPPPPPPPPPP", itens)
      if(itens.length>0){

      this.valorAberturaCaixa=itens[itens.length-1].valor
      }
      // console.log("PPPPPPPPPPPPPP222", this.valorAberturaCaixa)

    });

  }


  setStep(index: number) {
    this.step = index;
  }


  nextStep() {
    if(this.step<4){
      this.step++;
    }else{
      this.step=0
    }

  }

  prevStep() {
    if(this.step>0){
    this.step--;
    }
    else {
      this.step=4
    }
  }



RCB() {




















  //ajuste por causa do fuso
//  this.bsRangeValue[0].setHours(this.bsRangeValue[0].getHours()-1)
//   this.bsRangeValue[1].setHours(this.bsRangeValue[1].getHours()-2)
//ajuste por causa do fuso

   this.vendaPorVendedor=[]
   this.vendaPorForma= [{"_id":null,"pix":0,"dinheiro":0,"debito":0,"credito":0}]
   this.valorRCB =0
   this.desconto=0
   this.valorCMV=0
   this.valorDESPESA =0
   this.quantidadeDeItensVendidosPeriodo =0

  this.gestaoService.listar(
    {

      //ngx-bootrstrap55555555555/total 6
    "inicio":  this.bsRangeValue[0],
    "fim":   this.bsRangeValue[1]
}
).subscribe((valor: any) => {
// console.log("ffffffffffffffSHELDON", valor)











if(valor.length>0){

    this.valorRCB = valor[0].RCB;
}

    this.DESCONTO()
    this.CMV()
    this.DESPESA()
   // this.quantidadeItensVendidosPeriodo()
  //  this.getTodosItensQuantidadeVendidaCodigoTamanho()
  //  this.listarFormaPagamentoTotal()
   // this.listarVendedorTotal()
  //  this.listarHistorico()
    this.lerAberturaCaixa()
  //  this.QUANTIDADEDEREGISTROS()
 //   this.listarAtivoDespesas()
   // this.obterQuantidadeVendidaItensAtacadoVarejo()
  });
}




DESCONTO() {

  this.gestaoService.obterDescontoTotalPeriodo(
    {
      "inicio":  this.bsRangeValue[0],
    "fim":   this.bsRangeValue[1]
  }
  ).subscribe((valor: any) => {
// console.log("ffffffffffffffSHELDON", valor)

if(valor.length>0){

  this.desconto = (valor[0].DESCONTO);
}


  });
}



CMV() {

  this.gestaoService.obterCustoVendaTotalPeriodo(
    {
      "inicio":  this.bsRangeValue[0],
      "fim":   this.bsRangeValue[1]
  }

  ).subscribe((valor: any) => {
    // console.log("ffffffffffffffSHELDONXXXXXXXXXXXXXXXXXXXX", valor)
    if(valor.length>0){

    this.valorCMV = valor[0].CMV;
    }
  });
}


DESPESA() {

  this.gestaoService.obterDespesaTotalPeriodo(
    {
      "inicio":  this.bsRangeValue[0],
    "fim":   this.bsRangeValue[1]
  }
  ).subscribe((valor: any) => {
    // console.log("ffffffffffffffSHELDONYYYYYYYYYYYYYYYYYYYYDESPESA", valor)

    this.valorDESPESA = valor
  });
}



quantidadeItensVendidosPeriodo() {
  this.quantidadeDeItensVendidosPeriodo =0
  this.gestaoService.getquantidadeItensVendidos(
    {
      "inicio":  this.bsRangeValue[0],
    "fim":   this.bsRangeValue[1]
  }

  ).subscribe((valor: any) => {
    // console.log("ffffffffffffffSHELDONXXXXXXXXXXXXXXXXXXXX", valor)

    this.quantidadeDeItensVendidosPeriodo =  valor
  });
}




listarFormaPagamentoTotal() {




  this.vendaService.listarFormaPagamentoTotal(

    {
      "inicio":  this.bsRangeValue[0],
      "fim":   this.bsRangeValue[1]
  }
).subscribe((itens: any) => {

// console.log("fffffffffsSSSSSSSSSSSSSSSSSSSS")

    this.vendaPorForma = itens

  }

  );
}





listarVendedorTotal() {
  this.vendaService.listarVendedorTotal(

    {
      "inicio":  this.bsRangeValue[0],
      "fim":   this.bsRangeValue[1]
  }

).subscribe((itens: any) => {
    this.vendaPorVendedor = itens

// console.log("rrrrrrr  rrrrrrrr  RRRRRRRRRRRRRRRRRRRRRRR", this.vendaPorVendedor)

  });
}






getTodosItensQuantidadeVendidaCodigoTamanho() {


// this.resultado=new Array()

//console.log("ffffffffffffssssssssss", this.formCodigoProduto.value)

this.historicoService.listarAtivos(


  {
    "inicio":  this.bsRangeValue[0],
    "fim":   this.bsRangeValue[1]
}


).subscribe((vendas: any) => {


  const diff = Math.abs(this.bsRangeValue[0].getTime() - this.bsRangeValue[1].getTime()); // Subtrai uma data pela outra
  const diferencaEntreDatas = Math.ceil(diff / (1000 * 60 * 60 * 24)) +1;

// console.log("rrrrrr rrrrrrr RRRRRRRRRRRRRRRRRRRRRRRRRR", vendas,  diferencaEntreDatas)

  this.resultado= new Array()
  this.resultado2= new Array()

  for(var i=0; i<vendas.length;i++){


    //11111111111111 verifico para cada item de todas as   vendas do perido
     for(var j=0; j<vendas[i].itens.length;j++){



         var verificador=-1
         for(var k=0; k<this.resultado.length; k++){
           if((vendas[i].itens[j].codigo==this.resultado[k].codigo)&&(vendas[i].itens[j].tamanho==this.resultado[k].tamanho))             {
                          verificador=k
           }
         }



          if((verificador==-1)){






     this.resultado.push({codigo:vendas[i].itens[j].codigo,tamanho:vendas[i].itens[j].tamanho,inicial:1,entrada:0,quantidade:vendas[i].itens[j].quantidade,final:0,descricao:vendas[i].itens[j].descricao,custo:vendas[i].itens[j].precoCompra*vendas[i].itens[j].quantidade,receita:vendas[i].itens[j].valorUnitario*vendas[i].itens[j].quantidade, media:diferencaEntreDatas, ganho:0, ganhoPercentual:0, duracao:0, comprar:0, custocompra:vendas[i].itens[j].precoCompra})



            }
        else{
        this.resultado[verificador].quantidade+=vendas[i].itens[j].quantidade
        this.resultado[verificador].custo+=vendas[i].itens[j].precoCompra*vendas[i].itens[j].quantidade
        this.resultado[verificador].receita+=vendas[i].itens[j].valorUnitario*vendas[i].itens[j].quantidade
          }



          var verificador2=-1
          for(var k=0; k<this.resultado2.length; k++){
            if((vendas[i].itens[j].codigo==this.resultado2[k].codigo))             {
                           verificador2=k
            }
          }



          if((verificador2==-1)){
            this.resultado2.push({codigo:vendas[i].itens[j].codigo,quantidade:vendas[i].itens[j].quantidade,descricao:vendas[i].itens[j].descricao})
          }
        else{
        this.resultado2[verificador2].quantidade+=vendas[i].itens[j].quantidade
          }


     }
     //11111111111111 verifico para cada item de todas as   vendas do perido
  }


//console.log("rrrrrrrrrrrDDDDDDDDDDDDDDHHHHHHHHHHHH5555", this.resultado)



///console.log("fffffffffffffffffffffffffffffffffffffffhhhhhhhhhhhh")

this.estatisticaService.getDiasFuncionando(
  {
    "inicio":  this.bsRangeValue[0],
    "fim":   this.bsRangeValue[1]
} ).subscribe((itens: any) => {
  this.getDiasFuncionando=itens

//boto aqui dentro por causa do asincronismo
  for(var i=0; i<this.resultado.length;i++){
    this.resultado[i].media= this.resultado[i].quantidade/this.getDiasFuncionando
    this.resultado[i].ganho= this.resultado[i].receita-this.resultado[i].custo
    this.resultado[i].ganhoPercentual= (this.resultado[i].receita-this.resultado[i].custo)/this.resultado[i].receita*100

}
//boto aqui dentro por causa do asincronismo

});











///console.log("rrrrrrrrrrrrrr", this.resultado)





  this.dataSource1 = new MatTableDataSource(this.resultado);
  this.dataSource1.paginator = this.paginator1;
  this.dataSource1.sort = this.matSort1;








//this.ATUALIZA2()


});
}







ATUALIZA2(){

  this.CUSTODACOMPRA=0

console.log("tttttttttt", this.resultado)




   this.consumirService.getCodigoEntrada(

     {
       "inicio":  this.bsRangeValue[0],
       "fim":   this.bsRangeValue[1],
       "codigo":0


   }


   ).subscribe((itens: any) => {
    console.log("gGGGGGGGGGGGGGGGGGGGGGGG",itens)

    this.quantidadeEntradaNoPeriodo=itens



    this.TOTALENTRADAESTOQUE=0






    for(var w=0; w<this.resultado.length;w++){


     //*this.resultado[w].precoCompra

  //    this.totalItensEstoque=0
      for(var y=0; y<this.quantidadeEntradaNoPeriodo.length;y++){
       if (this.resultado[w].codigo==this.quantidadeEntradaNoPeriodo[y].codigo){
         this.resultado[w].entrada=this.quantidadeEntradaNoPeriodo[y].entrada
         this.resultado[w].final=this.quantidadeEntradaNoPeriodo[y].final
         this.resultado[w].inicial=this.resultado[w].quantidade- this.quantidadeEntradaNoPeriodo[y].entrada+   this.quantidadeEntradaNoPeriodo[y].final
         this.resultado[w].duracao= (this.resultado[w].final /  this.resultado[w].media)
         this.resultado[w].comprar= Math.round((26-this.resultado[w].duracao)*this.resultado[w].media)
         this.resultado[w].custocompra= this.resultado[w].comprar*this.resultado[w].custocompra

         this.TOTALENTRADAESTOQUE=this.TOTALENTRADAESTOQUE+this.quantidadeEntradaNoPeriodo[y].entrada*this.resultado[w].custo/this.resultado[w].quantidade

         if (this.resultado[w].comprar>0){
          this.CUSTODACOMPRA=this.CUSTODACOMPRA+this.resultado[w].custocompra
         }

       }
    //   this.totalItensEstoque=this.totalItensEstoque+this.quantidadeEntradaNoPeriodo[y].final
     }

      }
      console.log("gGGGGGGGGGGGGGGGGGGGGGGG",this.TOTALENTRADAESTOQUE)


   });
   ///consultar  ENTRADA NO ESTOQUE POR CODIGO





}









getEstoqueQuantidadeItens() {  this.gestaoService.getEstoqueQuantidadeItens().subscribe((itens: any) => { this.totalItensEstoque =itens});}



getEstoquePrecoDecusto() {  this.gestaoService.getEstoquePrecoDecusto().subscribe((itens: any) => { this.totalPrecoCompra =itens});}
getPvVarejo() {    this.gestaoService.getPvvarejo().subscribe((itens: any) => {  this.totalPvVarejo=itens   });  }
getPvAtacado() {     this.gestaoService.getPvAtacado().subscribe((itens: any) => {   this.totalPvAtavado =itens });   }




obterQuantidadeVendidaItensAtacadoVarejo() {

  this.gestaoService.obterQuantidadeVendidaItensAtacadoVarejo(
    {
      "inicio":  this.bsRangeValue[0],
    "fim":   this.bsRangeValue[1]
  }
  ).subscribe((valor: any) => {
// console.log("ffffffffffffffSHELDON", valor)

if(valor.length>0){

  this.QuantidadeVendidaItensAtacadoVarejo = (valor);
}


  });
}





ATUALIZAR(OPCAO: number){










  if(this.step==OPCAO){  this.RCB();  }

  if(this.step==OPCAO){  this.listarFormaPagamentoTotal();}



  if(this.step==OPCAO){  this.listarVendedorTotal(); }


  if(this.step==OPCAO){
    this.getEstoquePrecoDecusto()
this.getPvVarejo()
this.getPvAtacado()


  }




  if(this.step==OPCAO){ this.DESPESA() ; }







 if(this.step==OPCAO){  this.pegaRegistroMaisRecente();  }
 if(this.step==OPCAO){  this.getTodosItensQuantidadeVendidaCodigoTamanho(); }
 if(this.step==OPCAO){  this.listarHistorico() ; }
 if(this.step==OPCAO){ this.obterQuantidadeVendidaItensAtacadoVarejo(); this.quantidadeItensVendidosPeriodo(); }


 if(this.step==OPCAO){ this.listarAtivoDespesas() ; }



}



predicoes(){
this.estatisticaService.predicoes( {   "dia":2} ).subscribe((itens: any) => { console.log(itens); this.valor_predicoes=itens});

}










TOTAL(){


  { localStorage.setItem('EMPRESA','https://lavajatodovilarejoapi.herokuapp.com');  this.empresa='LAVAJATO' }
  this.gestaoService.listar(
   {

     //ngx-bootrstrap55555555555/total 6
   "inicio":  this.bsRangeValue[0],
   "fim":   this.bsRangeValue[1]
}
).subscribe((valor: any) => {
 this.TOTALEVENTOSLAVAJATOBEBIDAS1=0;
 this.TOTALEVENTOSLAVAJATOBEBIDAS2=0;
 this.TOTALEVENTOSLAVAJATOBEBIDAS3=0;


   this.TOTALEVENTOSLAVAJATOBEBIDAS1=this.TOTALEVENTOSLAVAJATOBEBIDAS1+Number(valor[0].RCB);



// ################################


{ localStorage.setItem('EMPRESA','https://eventosapii.herokuapp.com');  this.empresa='EVENTOS' }
this.gestaoService.listar(
{

//ngx-bootrstrap55555555555/total 6
"inicio":  this.bsRangeValue[0],
"fim":   this.bsRangeValue[1]
}
).subscribe((valor: any) => {


  if(valor.length>0){
this.TOTALEVENTOSLAVAJATOBEBIDAS2=this.TOTALEVENTOSLAVAJATOBEBIDAS2+Number(valor[0].RCB);
  }



// ####################


{ localStorage.setItem('EMPRESA','https://bebidasapih.herokuapp.com');  this.empresa='BEBIDAS' }
this.gestaoService.listar(
{

//ngx-bootrstrap55555555555/total 6
"inicio":  this.bsRangeValue[0],
"fim":   this.bsRangeValue[1]
}
).subscribe((valor: any) => {



this.TOTALEVENTOSLAVAJATOBEBIDAS3=this.TOTALEVENTOSLAVAJATOBEBIDAS3+Number(valor[0].RCB);


});




// #########################



});


// ################################








});












}




}
