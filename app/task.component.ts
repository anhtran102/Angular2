import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router }            from '@angular/router-deprecated';
import { Task }                from './task';
import {TaskService}         from './task.service';
import { TaskDetailComponent } from './task-detail.component';
//import {DateFormatPipe} from 'angular2-moment';
declare var jQuery:any;
declare var moment: any;
import {} from 'moment';
import { NgForm }  from '@angular/common';

@Component({
    selector: 'my-tasks',
    moduleId: module.id,
   // pipes: [DateFormatPipe],
    templateUrl: 'tasks.component.html',
    directives: [TaskDetailComponent]
})
export class TasksComponent implements OnInit, AfterViewInit {
    tasks: any[];
    selectedTask: any;
    newTask = new Task(0,'','','','','',0);
    addingHero = false;
    error: any;
    constructor(private router: Router, private taskService: TaskService) {

    }
    getHeroes() {
     this.taskService.getTaskes().subscribe(
            data => {
                data.forEach(function (t) {
                    t.CompletedDate = moment(t.CompletedDate).toDate();
                    t.CreatedDate = moment(t.CreatedDate).toDate();
                    t.DueDate = moment(t.DueDate).toDate();
                    t.StartDate = moment(t.StartDate).toDate();
                });
                this.tasks = data
            },
         error => console.log(error)
        );
    }

    addNewTask(){
      //this.taskService.save(this.newTask);
        this.taskService.post2(this.newTask)
            .subscribe(
                data => {
                    data.CompletedDate = moment(data.CompletedDate).toDate();
                    data.CreatedDate = moment(data.CreatedDate).toDate();
                    data.DueDate = moment(data.DueDate).toDate();
                    data.StartDate = moment(data.StartDate).toDate();
                    this.tasks.push(data);
                    this.newTask = new Task(0,'','','','','',0);
                },
                error=> console.log(error)
            );
    }

    addHero() {
        this.addingHero = true;
        this.selectedTask = null;
    }

    close(savedHero: Task) {
        this.addingHero = false;
        if (savedHero) { this.getHeroes(); }
    }

    deleteTask(id: number) {
        event.stopPropagation();
        var r = confirm("Are you really want to delete?");
        if (r == true) {
            this.taskService
                .delete(id)
                .subscribe(
                    data => {
                        data.forEach(function (t) {
                            t.CompletedDate = moment(t.CompletedDate).toDate();
                            t.CreatedDate = moment(t.CreatedDate).toDate();
                            t.DueDate = moment(t.DueDate).toDate();
                            t.StartDate = moment(t.StartDate).toDate();
                        });
                        this.tasks = data
                    },
                    error => console.log(error)
                );
        }
    }

    ngOnInit() {
        this.getHeroes();
      /*  this.tasks.forEach(function (t) {
            t.CompeletedDate = moment( t.CompeletedDate);
        });*/
    }

    ngAfterViewInit(){
        jQuery("#myTable").load(function() {
            jQuery('#myTable').dataTable();
        });
    }

    onSelect(hero: Task) {
        this.selectedTask = hero;
        this.addingHero = false;
    }

    gotoDetail(id: number){
        let link = ['TaskDetail', { id: id }];
        this.router.navigate(link);
    }

    viewDetail
}
