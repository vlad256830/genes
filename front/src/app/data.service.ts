import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth/auth.service';
import { Genes, Rsid, NewRsid } from './genes.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serviceUrl = 'data/';
  private httpOptions: any;
  public errors: any = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.authService.getToken()
      })
    };
  }

  isAuth(): boolean {
    return (this.authService.isAuthenticated() && this.authService.isLoggedIn()) ;
  }

  public getGenes(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (this.isAuth()) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.authService.getToken()
     });
    }
    return this.http.get<any>(this.serviceUrl + 'genesrsids/', { headers });
  }

  public addGene(gene_name, category, urls, comments, description): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + this.authService.getToken()
   });
   const gene = {
    'gene_name': gene_name,
    'category': category,
    'urls': urls,
    'comments': comments,
    'description': description,

  };
    return this.http.post(this.serviceUrl + 'genes/', JSON.stringify(gene), { headers });
  }

  public updateGene(gene_name, category, urls, comments, description, id): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + this.authService.getToken()
   });
   const gene = {
    'gene_name': gene_name,
    'category': category,
    'urls': urls,
    'comments': comments,
    'description': description,
    };
    return this.http.put(this.serviceUrl + 'genes/edit/' + id.toString() + '/', JSON.stringify(gene), { headers });
  }

  public addRsid(newRsid: NewRsid): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
     'Authorization': 'JWT ' + this.authService.getToken()
   });
    return this.http.post(this.serviceUrl + 'rsid/', JSON.stringify(newRsid), { headers });
  }

  public getGetRsid(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (this.isAuth()) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.authService.getToken()
     });
    }
    return this.http.get<any>(this.serviceUrl + 'rsidgene/', { headers });
  }

  public updateRsid(newRsid: Rsid): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + this.authService.getToken()
   });
    // console.log(newRsid);
    return this.http.put(this.serviceUrl + 'rsid/edit/' + newRsid.id.toString() + '/', JSON.stringify(newRsid), { headers });
  }

  public deleteRsid(id): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + this.authService.getToken()
   });
    return this.http.delete(this.serviceUrl + 'rsid/edit/' + id.toString() + '/', { headers });
  }

  public getGroups(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + this.authService.getToken()
   });
   return this.http.get(this.serviceUrl + 'groups/', { headers });
  }

  public getGroupRiskRSID(id): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + this.authService.getToken()
   });

    const params = new HttpParams()
      .set('group_id', id);
    return this.http.get(this.serviceUrl + 'risk/', { headers, params });
  }
}
