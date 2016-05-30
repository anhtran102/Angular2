/**
 * Created by anhtran on 5/26/2016.
 */
import { RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import { Component }       from '@angular/core';
import { TaskService }     from './task.service';
import { TasksComponent } from './task.component';
import { DashboardComponent} from './dashboard.component';
import {TaskDetailComponent} from "./task-detail.component";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

@Component({
    selector: 'my-app',
    templateUrl: './view/app.component.html',
    directives:
    [
        ROUTER_DIRECTIVES,
        TasksComponent,

    ],
    providers: [
        ROUTER_PROVIDERS,
        TaskService,
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ]
})

@RouteConfig([
    {
        path: '/tasks',
        name: 'Tasks',
        component: TasksComponent
    },
    {
        path: '/tasks/:id',
        name: 'TaskDetail',
        component: TaskDetailComponent
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent
    },
    {
        path: '/',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    }
])
export class AppComponent {
    title = 'Tour of Heroes';
}
