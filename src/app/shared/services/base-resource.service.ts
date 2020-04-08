import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { BaseResourceModel } from '../models/base-resource.model';


export abstract class BaseResourceService< T extends BaseResourceModel > {

 protected http: HttpClient;

 constructor(protected apiPath: string, protected injector: Injector){
   // pega um module do angular "HttpClient" e injeta na classe, pode ser N injeções
   this.http = injector.get(HttpClient);
 }

  getAll(): Observable<T[]> {
     return this.http.get(this.apiPath).pipe(
       catchError(this.handleError),
       map(this.jsonDataToResources)
     )
  }

  getById(id: number): Observable<T> {
     const url = `${this.apiPath}/${id}`;
     return this.http.get(url).pipe(
       catchError(this.handleError),
       map(this.jsonDataToResource)
     )
  }

  create(resource: T): Observable<T> {
    return this.http.post(this.apiPath, resource).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
     )
  }

  update(resource: T): Observable<T> {
      const url = `${this.apiPath}/${resource.id}`;
      return this.http.put(url, resource).pipe(
        catchError(this.handleError),
        map(() => resource)
      )
  }

  delete(id: number): Observable<any>{
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

   // PROTECTED METHOD
   protected jsonDataToResources(jsonData: any[]): T[] {
     const resources: T[] = [];
     jsonData.forEach(element => resources.push(element as T));
     return resources;
   }

   protected jsonDataToResource(jsonData: any): T {
     return jsonData as T;
   }

   protected handleError(error: any): Observable<any>{
     console.log("ERRO DE REQUISIÇÃO =>", error);
     return throwError(error);
   }

}
