import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  apiURL:string = 'http://localhost:8888';

  constructor(private httpClient: HttpClient) { }

  // Obtener todas las categorias
  getCategorias():Observable<any> {
    return this.httpClient.get(`${this.apiURL}/categorias`, {});
  }

  // Obtener todas las aplicaciones de una categoria
  getAplicacionesCategorias(idCategoria: any):Observable<any> {
    return this.httpClient.get(`${this.apiURL}/categorias/${idCategoria}/aplicaciones`, {});
  }

  // Obtener una aplicacion en especifico de una categoria
  getAplicacionCategoria(idCategoria: any, idAplicacion: any):Observable<any> {
    return this.httpClient.get(`${this.apiURL}/categorias/${idCategoria}/aplicaciones/${idAplicacion}`, {});
  }

  // Guardar un nuevo comentario en una aplicacion de una categoria en especifico
  guardarComentario(idCategoria: any, idAplicacion: any, comentario: any):Observable<any> {
    return this.httpClient.post(`${this.apiURL}/categorias/${idCategoria}/aplicaciones/${idAplicacion}/comentarios`, 
    {
      comentario: comentario.comentario,
      calificacion: comentario.calificacion,
      usuario: comentario.usuario
    });
  }

  // Guardar una nueva aplicacion en una categoria en especifico
  guardarAplicacion(idCategoria: any, aplicacion: any):Observable<any> {
    return this.httpClient.post(`${this.apiURL}/categorias/${idCategoria}/aplicaciones`,
    {
      icono: aplicacion.icono,
      nombre: aplicacion.nombre,
      descripcion: aplicacion.descripcion,
      precio: aplicacion.precio,
      desarrollador: aplicacion.desarrollador
    });
  }
}
