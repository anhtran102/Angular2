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
var TaskDetailComponent = (function () {
    function TaskDetailComponent(taskService, routeParams) {
        this.taskService = taskService;
        this.routeParams = routeParams;
    }
    TaskDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.routeParams.get('id') !== null) {
            var id = +this.routeParams.get('id');
            this.navigated = true;
            this.taskService.getTask(id)
                .then(function (task) { return _this.task = task; });
        }
        else {
            this.navigated = false;
            this.task = new task_1.Task();
        }
    };
    TaskDetailComponent.prototype.save = function () {
        var _this = this;
        this.taskService
            .save(this.task)
            .then(function (t) {
            _this.task = t; // saved hero, w/ id if new
            _this.goBack(t);
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    TaskDetailComponent.prototype.goBack = function (savedTask) {
        if (savedTask === void 0) { savedTask = null; }
        this.close.emit(savedTask);
        if (this.navigated) {
            window.history.back();
        }
    };
    TaskDetailComponent = __decorate([
        core_1.Component({
            selector: 'task-detail',
            templateUrl: 'app/task-detail.component.html'
        }), 
        __metadata('design:paramtypes', [task_service_1.TaskService, router_deprecated_1.RouteParams])
    ], TaskDetailComponent);
    return TaskDetailComponent;
}());
exports.TaskDetailComponent = TaskDetailComponent;
//# sourceMappingURL=task-detail.component.js.map