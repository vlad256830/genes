import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AuthService } from './auth/auth.service';
import { Genes, Rsid, NewRsid, RiskGroups, CreateRisk } from './genes.interface';

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
    return (this.authService.isAuthenticated() && this.authService.isLoggedIn());
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

  public addRisk(newRisk: CreateRisk): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + this.authService.getToken()
    });
    // console.log(newRsid);
    return this.http.post(this.serviceUrl + 'risk/', JSON.stringify(newRisk), { headers });
  }

  updateRisk(newRisk: RiskGroups): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + this.authService.getToken()
    });
    // console.log(newRsid);
    return this.http.put(this.serviceUrl + 'risk/edit/' + newRisk.id.toString() + '/', JSON.stringify(newRisk), { headers });
  }

  addRiskGroup(group): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + this.authService.getToken()
    });
    // console.log(newRsid);
    return this.http.post(this.serviceUrl + 'groups/', JSON.stringify(group), { headers });
  }

  deleteRiskGroup(id): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + this.authService.getToken()
    });
    // console.log(newRsid);
    return this.http.delete(this.serviceUrl + 'groups/edit/' + id.toString() + '/', { headers });
  }


  public uploadCSVRiskGroup(datafile): Observable<any> {
    const headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      'Authorization': 'JWT ' + this.authService.getToken()
    });
    return this.http.post<any>(this.serviceUrl + 'newcsvgroup/', datafile, { headers });
  }

  public appendFileCSVRiskGroup(id): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + this.authService.getToken()
    });
    return this.http.post(this.serviceUrl + 'appendnewgroup/', JSON.stringify(id.toString()), { headers });
  }

  public uploadNewGeneData(datafile): Observable<any> {
    const headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      'Authorization': 'JWT ' + this.authService.getToken()
    });
    return this.http.post<any>(this.serviceUrl + 'genedata/', datafile, { headers });
  }

  public startAnaliz(id, group): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + this.authService.getToken()
    });
    const params = new HttpParams()
      .set('id', id.toString())
      .set('group', group);
    return this.http.get<any>(this.serviceUrl + 'analiz/',  { headers, params });
  }

  public statusAnaliz(task_id): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + this.authService.getToken()
    });
    return this.http.post<any>(this.serviceUrl + 'analiz/', JSON.stringify(task_id.toString()), { headers });
  }


}
