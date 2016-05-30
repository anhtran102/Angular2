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
   // pipes: [DateFormatPipe],
    templateUrl: './view/tasks.component.html',
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
  /*  this.taskService
            .getTaskes()
            .then(t => this.tasks = t)
            .catch(error => this.error = error); // TODO: Display error message
*/
     this.taskService.getTaskes().subscribe(
            data => {
                data.forEach(function (t) {
                   console.log(moment(t.CompletedDate).toDate());
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
      this.taskService.save(this.newTask);
    }

    addTa () {
        if (!this.newTask) {
            return;
        }
        this.taskService.save(this.newTask)
            .then(
                t => this.tasks.push(t),
                error => this.error = <any>error);
    }

    addHero() {
        this.addingHero = true;
        this.selectedTask = null;
    }

    close(savedHero: Task) {
        this.addingHero = false;
        if (savedHero) { this.getHeroes(); }
    }

    delete(hero: Task, event: any) {
        event.stopPropagation();
        this.taskService
            .delete(hero)
            .then(res => {
                this.tasks = this.tasks.filter(h => h !== hero);
                if (this.selectedTask === hero) { this.selectedTask = null; }
            })
            .catch(error => this.error = error); // TODO: Display error message
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

    gotoDetail(task: Task){
        let link = ['TaskDetail', { id: task.id }];
        this.router.navigate(link);
    }
}
