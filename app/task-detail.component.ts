import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Task } from './task';
import { TaskService } from './task.service';

@Component({
    selector: 'task-detail',
    templateUrl: 'app/task-detail.component.html'
})
export class TaskDetailComponent implements OnInit{
    task: Task;
    navigated: boolean;
    constructor(
        private taskService: TaskService,
        private routeParams: RouteParams) {
    }

    ngOnInit() {
        if (this.routeParams.get('id') !== null) {
            let id = +this.routeParams.get('id');
            this.navigated = true;
            this.taskService.getTask(id)
                .then(task => this.task = task);
        } else {
            this.navigated = false;
            this.task = new Task();
        }
    }

    save() {
        this.taskService
            .save(this.task )
            .then(t => {
                this.task = t; // saved hero, w/ id if new
                this.goBack(t);
            })
            .catch(error => this.error = error); // TODO: Display error message
    }

    goBack(savedTask: Task = null) {
        this.close.emit(savedTask);
        if (this.navigated) { window.history.back(); }
    }


}
