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
var router_deprecated_1 = require('@angular/router-deprecated');
var task_1 = require('./task');
var task_service_1 = require('./task.service');
var task_detail_component_1 = require('./task-detail.component');
var TasksComponent = (function () {
    function TasksComponent(router, taskService) {
        this.router = router;
        this.taskService = taskService;
        this.newTask = new task_1.Task(0, '', '', '', '', '', 0);
        this.addingHero = false;
    }
    TasksComponent.prototype.getHeroes = function () {
        var _this = this;
        /*  this.taskService
                  .getTaskes()
                  .then(t => this.tasks = t)
                  .catch(error => this.error = error); // TODO: Display error message
      */
        this.taskService.getTaskes().subscribe(function (data) {
            data.forEach(function (t) {
                console.log(moment(t.CompletedDate).toDate());
                t.CompletedDate = moment(t.CompletedDate).toDate();
                t.CreatedDate = moment(t.CreatedDate).toDate();
                t.DueDate = moment(t.DueDate).toDate();
                t.StartDate = moment(t.StartDate).toDate();
            });
            _this.tasks = data;
        }, function (error) { return console.log(error); });
    };
    TasksComponent.prototype.addNewTask = function () {
        this.taskService.save(this.newTask);
    };
    TasksComponent.prototype.addTa = function () {
        var _this = this;
        if (!this.newTask) {
            return;
        }
        this.taskService.save(this.newTask)
            .then(function (t) { return _this.tasks.push(t); }, function (error) { return _this.error = error; });
    };
    TasksComponent.prototype.addHero = function () {
        this.addingHero = true;
        this.selectedTask = null;
    };
    TasksComponent.prototype.close = function (savedHero) {
        this.addingHero = false;
        if (savedHero) {
            this.getHeroes();
        }
    };
    TasksComponent.prototype.delete = function (hero, event) {
        var _this = this;
        event.stopPropagation();
        this.taskService
            .delete(hero)
            .then(function (res) {
            _this.tasks = _this.tasks.filter(function (h) { return h !== hero; });
            if (_this.selectedTask === hero) {
                _this.selectedTask = null;
            }
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    TasksComponent.prototype.ngOnInit = function () {
        this.getHeroes();
        /*  this.tasks.forEach(function (t) {
              t.CompeletedDate = moment( t.CompeletedDate);
          });*/
    };
    TasksComponent.prototype.ngAfterViewInit = function () {
        jQuery("#myTable").load(function () {
            jQuery('#myTable').dataTable();
        });
    };
    TasksComponent.prototype.onSelect = function (hero) {
        this.selectedTask = hero;
        this.addingHero = false;
    };
    TasksComponent.prototype.gotoDetail = function (task) {
        var link = ['TaskDetail', { id: task.id }];
        this.router.navigate(link);
    };
    TasksComponent = __decorate([
        core_1.Component({
            selector: 'my-tasks',
            // pipes: [DateFormatPipe],
            templateUrl: './view/tasks.component.html',
            directives: [task_detail_component_1.TaskDetailComponent]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, task_service_1.TaskService])
    ], TasksComponent);
    return TasksComponent;
}());
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=task.component.js.map