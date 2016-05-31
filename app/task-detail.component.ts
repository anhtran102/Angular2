import { Component, OnInit, Input } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Task } from './task';
import { TaskService } from './task.service';
declare var moment: any;
import {} from 'moment';

@Component({
    selector: 'task-detail',
    templateUrl: 'app/task-detail.component.html'
})
export class TaskDetailComponent implements OnInit{
    task: Task;
    users: any;
    error: any;
    success = false;
    navigated: boolean;
    @Input() id: number;
    constructor(
        private taskService: TaskService,
        private routeParams: RouteParams) {
           this.ngOnInit();
        }

    ngOnInit() {
        if (this.routeParams.get('id') !== null) {
            let id = +this.routeParams.get('id');
            this.navigated = true;
            //get task detail
            this.taskService.getTask(id).subscribe(
                data => {
                    this.task = data
                },
                error => console.log(error));
            //get user of task
            this.taskService.getUserOfTask(id).subscribe(
                data => {
                    this.users = data
                },
                error => console.log(error));
        }
          /*  this.taskService.getTask(id)
                .then(task => this.task = task);
        } else {
            this.navigated = false;
            //this.task = new Task();
        }*/
    }

    updateTask() {
        this.success = false;
        this.taskService
            .save(this.task )
            .then(t => {
                //this.task = t; // saved hero, w/ id if new
                //this.goBack();
                this.success = true;
            })
            .catch(error => this.error = error); // TODO: Display error message
    }

    goBack() {
       // this.close.emit(savedTask);
        window.history.back();
    }


}
