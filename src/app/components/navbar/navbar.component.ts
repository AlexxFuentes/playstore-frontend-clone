import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() onCategoriaSeleccionada = new EventEmitter<string>();
  // Font Awesome
  faPlus = faPlus;
  // Variables
  iconoAplicacion: string = '';
  nombreAplicacion: string = '';
  descripcionAplicacion: string = '';
  precioAplicacion: number = 0;
  desarrolladorAplicacion: string = '';
  categoriaSeleccionada: string = '';

	constructor(private modalService: NgbModal, private categoriaServices: CategoriasService) {}

  getRange(n: number): number[] {
    return Array.from({length: n}, (_, i) => i + 1);
  }

  getCategoriaSeleccionada(idCategoria: string) {
    this.categoriaSeleccionada = idCategoria;
    console.log(idCategoria);
  }

  guardaAplicacion() {
    const nuevaApp =  {
      icono: this.iconoAplicacion,
      nombre: this.nombreAplicacion,
      descripcion: this.descripcionAplicacion,
      precio: this.precioAplicacion,
      desarrollador: this.desarrolladorAplicacion
    }
    console.log(nuevaApp);
    console.log(this.categoriaSeleccionada);
    this.categoriaServices.guardarAplicacion(this.categoriaSeleccionada, nuevaApp).subscribe(
      (data: any) => {
        console.log(data);
        this.onCategoriaSeleccionada.emit(this.categoriaSeleccionada);
        this.modalService.dismissAll();//Cierra el modal
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}
  

}
