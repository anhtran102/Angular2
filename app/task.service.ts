import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
declare var moment: any;
import {} from 'moment';

import { Task } from './task';

@Injectable()
export class TaskService {

    private baseURL = 'http://localhost/TaskManagement/api/';  // URL to web api

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
        /*return this.getTaskes()
            .then(taskes => taskes.filter(task => task.id === id)[0]);*/
    }

    save(task: Task): Promise<Task>  {
        if (task.Id!=0) {
            return this.put(task);
        }
        return this.post(task);
    }

    delete(task: Task) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.baseURL}/${task.Id}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
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

 /*   // Add new Task
    private post(task: Task): Promise<Task> {
        let headers = new Headers({
            'Content-Type': 'application/json'});

        return this.http
            .post(this.baseURL, JSON.stringify(task), {headers: headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }*/

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
