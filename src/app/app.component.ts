import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';
import { faStar, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('navbar') navbarComponent: NavbarComponent | undefined;
  // Font Awesome
  faStar = faStar;
  faPaperPlane = faPaperPlane;
  // Variables
  listaCategorias: any = [];
  categoriaseleccionada: any = null;
  listaAplicaciones: any = [];
  aplicacionSeleccionada: any = null;
  // calificacion
  comentario: string = '';
  nombreUsuario: string = '';
  selected = 0;
	readonly = false;

  constructor(private modalService: NgbModal, private categoriaService: CategoriasService, config: NgbRatingConfig) {
    config.max = 5;
  }

  ngOnInit(): void {
    this.ObtenerCategorias();
  }

  getRange(n: number): number[] {
    return Array.from({length: n}, (_, i) => i + 1);
  }

  guardarComentario() {
    const comentario = {
      comentario: this.comentario,
      calificacion: this.selected,
      usuario: this.nombreUsuario
    }
    console.log(this.categoriaseleccionada, this.aplicacionSeleccionada._id,comentario);
    this.categoriaService.guardarComentario(this.categoriaseleccionada, this.aplicacionSeleccionada._id, comentario).subscribe(
      (data: any) => {
        console.log(data);
        this.obtenerAplicacionCategoria(this.categoriaseleccionada, this.aplicacionSeleccionada._id);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  seleccionarCategoria() {
    //console.log(this.categoriaseleccionada);
    this.obtenerAplicacionesCategoria(this.categoriaseleccionada);
    this.navbarComponent?.getCategoriaSeleccionada(this.categoriaseleccionada);
  }

  recargarCategoriaSelecionada(idCategoria: any) {
    this.obtenerAplicacionesCategoria(idCategoria);
  }
  
  ObtenerCategorias() {
    this.categoriaService.getCategorias().subscribe(
      (data: any) => {
        console.log(data);
        this.listaCategorias = data;
      },
      (error: any) => {
          console.log(error);
      });
  }

  obtenerAplicacionesCategoria(idCategoria: any) {
    if(idCategoria == null) return;
    this.categoriaService.getAplicacionesCategorias(idCategoria).subscribe(
      (data: any) => {
        //console.log(data.aplicaciones);//nestjs
        //this.listaAplicaciones = data.aplicaciones;//nestjs
        console.log(data[0].aplicaciones);
        this.listaAplicaciones = data[0].aplicaciones;
      },
      (error: any) => {
          console.log(error);
      }
    );
  }

  obtenerAplicacionCategoria(idCategoria: any, idAplicacion: any) {
    if(idCategoria == null || idAplicacion == null) return;
    this.categoriaService.getAplicacionCategoria(idCategoria, idAplicacion).subscribe(
      (data: any) => {
        console.log(data[0].aplicaciones[0]);
        this.aplicacionSeleccionada = data[0].aplicaciones[0];
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  openDetalleApp(content: any, idAplicacion: any) {
    //console.log(idAplicacion);
    //console.log(this.categoriaseleccionada);
    this.obtenerAplicacionCategoria(this.categoriaseleccionada, idAplicacion);
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}
}
