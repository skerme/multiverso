import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import Swal from 'sweetalert2';
import { LivrocaixaService } from '../4.LIVROCAIXA/livrocaixa.service';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';




@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {



  desabilitarPassword: boolean=false

  hide = true;


  usuario = {} as Usuario;


  panelOpenState = false;


  _id_produto: string='0'
  nome: string = '';
  email: string= '';
  perfil: string='';
  password: string='';



  displayedColumns = [
    'acao',
    'name',
    'email',
    'perfil',
    'dataDaCriacao'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;



  constructor(
    private usuarioService: UsuarioService,

     ) { }

  ngOnInit() {
   this.listarAtivo();
   this.limpar()





  }







  @HostListener('click') onClick() {
    this.listarAtivo();
  }

  inserir() {


    this.usuario.name=this.nome.toUpperCase()
    this.usuario.email=this.email.toUpperCase()
    this.usuario.perfil=this.perfil
    this.usuario.password=this.password




  if(this._id_produto=='0'){

    this.usuarioService.saveCar(this.usuario).subscribe((x) => {
      if( x.success){ {Swal.fire({icon: 'success',text:'REGISTRO EFETUADO COM COM SUCESSO!!'}        )                 }}
             this.listarAtivo();
             this.limpar();
           });

          }else{
            this.usuarioService.atualizar(this._id_produto,this.usuario).subscribe((x) => {
              this.listarAtivo();
              this.limpar();
            });


          }

  this._id_produto='0'


  this.limpar()





  }





  desativar(item: any) {
    item.estado=0





    Swal.fire({
      title: 'REALMENTE DESEJA EXCLUIR?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SIM'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'ITEM EXCLUIDO!',
           '',
           'success'
        )


        this.usuarioService.atualizar(item._id,item).subscribe((x) => {
          this.listarAtivo()

                  });

      }
    })







      }





  listarAtivo() {
    this.usuarioService.listarAtivo().subscribe((itens: any) => {
      this.dataSource = new MatTableDataSource(itens);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;




    });
  }

  editar(item: any) {

       this._id_produto= item._id



       this.nome=item.name
       this.email=item.email
       this.perfil=item.perfil
       this.password=item.password



  this.desabilitarPassword=true




     }

  excluir(item: any) {
    this.usuarioService.deleteCar(item._id).subscribe((x) => {});
  }


  limpar() {
    this.nome=''
    this.email=''
    this.perfil=''
    this.password=''
    this.desabilitarPassword=false
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }






  @HostListener('window:keyup', ['$event'])   // PARA OBTER AS TECLAS DE ATALHO
  keyEvent(event: KeyboardEvent) {

  console.log(event.key)

  }










}
