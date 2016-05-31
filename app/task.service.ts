import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
declare var moment: any;
import {} from 'moment';

import {global } from './global-value';

import { Task } from './task';
import {map} from "rxjs/operator/map";

@Injectable()
export class TaskService {

    private baseURL = global.url;//'http://localhost/WebAPI/api/';  // URL to web api
    constructor(private http: Http) { }

    getTaskes() {
        var url = this.baseURL + "task";
       /*return this.http.get(url)
             .toPromise()
             .then(response => response.json().data)
             .catch(this.handleError);*/

        return  this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError2);

    }

    getTask(id: number) {
        var url = this.baseURL + "task/"+id;
        return  this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError2);
    }

    getUserOfTask(id: number) {
        var url = this.baseURL + "task/"+id+"/user";
        return  this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError2);
    }

    save(task: Task): Promise<Task>  {
        if (task.Id!=0) {
            return this.put(task);
        }
       // return this.post2(task).;
    }

    delete(id: number) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        //let url = `${this.baseURL}${id}`;
       /* var url = this.baseURL + "task/"+id;
        return this.http
            .delete(url, headers)
            .toPromise()
            .then(
                this.extractData)
            .catch(this.handleError);*/

        var url = this.baseURL + "task/"+id;
        return this.http
            .delete(url, headers)
            .map(res => res.json())
            .catch(this.handleError2);
    }

    private post(task: Task): Promise<Task> {
        var url = this.baseURL + "task";
        let body = JSON.stringify({ task });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    post2(task){

        var body = JSON.stringify(task);
        var url = this.baseURL + "task";
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(url,
            body, { headers: headers })
            .map(res=>res.json());
    }

    // Update existing Task
    private put(task: Task) {
        let headers = new Headers();
        var url = this.baseURL + "task";
        headers.append('Content-Type', 'application/json');

        let urld = `${url}/${task.Id}`;

        return this.http
            .put(urld, JSON.stringify(task), {headers: headers})
            .toPromise()
            .then(() => task)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    handleError2(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }
}
