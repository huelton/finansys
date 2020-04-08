import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { CategoryService } from '../../categories/shared/category.service';

import { Entry } from './entry.model';

 @Injectable({
  providedIn: 'root'
 })
 export class EntryService {

 private apiPath: string = "api/entries";

 constructor(private http: HttpClient, private categoryService: CategoryService) { }

 getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    )
 }

 getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
 }

 create(entry: Entry): Observable<Entry> {

   return this.categoryService.getById(entry.categoryId).pipe(
     flatMap(category => {
       entry.category = category;

       return this.http.post(this.apiPath, entry).pipe(
         catchError(this.handleError),
         map(this.jsonDataToEntry)
        )
     })
   )
 }

 update(entry: Entry): Observable<Entry> {
     const url = `${this.apiPath}/${entry.id}`;

     return this.categoryService.getById(entry.categoryId).pipe(
       flatMap(category => {
         entry.category = category;

         return this.http.put(url, entry).pipe(
           catchError(this.handleError),
           map(() => entry)
          )
       })
     )

 }

 delete(id: number): Observable<any>{
   const url = `${this.apiPath}/${id}`;
   return this.http.delete(url).pipe(
     catchError(this.handleError),
     map(() => null)
   )
 }

 // PRIVATE METHOD
 private jsonDataToEntries(jsonData: any[]): Entry[] {
   const entries: Entry[] = [];

   jsonData.forEach(element => {
     const entry = Object.assign(new Entry(), element);
     entries.push(entry);
   });

   return entries;
 }

 private jsonDataToEntry(jsonData: any): Entry {
   //return Object.assign(new Entry(), jsonData);
   return jsonData as Entry;
 }

 private handleError(error: any): Observable<any>{
   console.log("ERRO DE REQUISIÇÃO =>", error);
   return throwError(error);
 }

}

/*
// Se seu BACK END se comporta desta forma, não seve fazer alteração no
// Object.assign(new Entry(), jsonData);

create(entry: Entry): Observable<Entry> {
  return this.http.post(this.apiPath, entry).pipe(
    catchError(this.handleError),
    map(this.jsonDataToEntry)
   )
}

update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;
    return this.http.put(url, entry).pipe(
      catchError(this.handleError),
      map(() => entry)
    )
}


entryService.getById(2);

"Se seu BACK END se comporta desta forma, não seve fazer alteração no Object.assign(new Entry(), jsonData);"
jsonData = {

    id: 2,
    name: "aluguel",
    date: "06/04/2020",
    paid: true,
    categoryId: 1,
    category: {
                id: 1,
                name: "moradia",
                description: "Qualquer descrição para esta categoria"

             }
}

  Object.assign(new Entry(), jsonData);

*/
