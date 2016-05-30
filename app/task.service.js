"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/Rx');
require('rxjs/add/operator/toPromise');
var TaskService = (function () {
    function TaskService(http) {
        this.http = http;
        this.baseURL = 'http://localhost/TaskManagement/api/'; // URL to web api
    }
    TaskService.prototype.getTaskes = function () {
        var url = this.baseURL + "task";
        /*return this.http.get(url)
              .toPromise()
              .then(response => response.json().data)
              .catch(this.handleError);*/
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError2);
    };
    TaskService.prototype.getTask = function (id) {
        /*return this.getTaskes()
            .then(taskes => taskes.filter(task => task.id === id)[0]);*/
    };
    TaskService.prototype.save = function (task) {
        if (task.Id != 0) {
            return this.put(task);
        }
        return this.post(task);
    };
    TaskService.prototype.delete = function (task) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.baseURL + "/" + task.Id;
        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    };
    TaskService.prototype.post = function (task) {
        var url = this.baseURL + "task";
        var body = JSON.stringify({ task: task });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
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
    TaskService.prototype.put = function (task) {
        var headers = new http_1.Headers();
        var url = this.baseURL + "task";
        headers.append('Content-Type', 'application/json');
        var urld = url + "/" + task.Id;
        return this.http
            .put(urld, JSON.stringify(task), { headers: headers })
            .toPromise()
            .then(function () { return task; })
            .catch(this.handleError);
    };
    TaskService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    TaskService.prototype.handleError2 = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    TaskService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    TaskService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], TaskService);
    return TaskService;
    var _a;
}());
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map