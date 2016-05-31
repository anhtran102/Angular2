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
/**
 * Created by anhtran on 5/26/2016.
 */
var router_deprecated_1 = require('@angular/router-deprecated');
var core_1 = require('@angular/core');
var task_service_1 = require('./task.service');
var task_component_1 = require('./task.component');
var dashboard_component_1 = require('./dashboard.component');
var task_detail_component_1 = require("./task-detail.component");
var common_1 = require("@angular/common");
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Tour of Heroes';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            moduleId: module.id,
            templateUrl: 'app.component.html',
            directives: [
                router_deprecated_1.ROUTER_DIRECTIVES,
                task_component_1.TasksComponent,
            ],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS,
                task_service_1.TaskService,
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
            ]
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/tasks',
                name: 'Tasks',
                component: task_component_1.TasksComponent
            },
            {
                path: '/tasks/:id',
                name: 'TaskDetail',
                component: task_detail_component_1.TaskDetailComponent
            },
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: dashboard_component_1.DashboardComponent
            },
            {
                path: '/',
                name: 'Dashboard',
                component: dashboard_component_1.DashboardComponent,
                useAsDefault: true
            }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map