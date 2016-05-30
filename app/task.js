"use strict";
/**
 * Created by anhtran on 5/17/2016.
 */
var Task = (function () {
    /* Id : number;
     CompletedDate : any;
     CreatedDate : any;
     DueDate : any;
     StartDate: any;
     Subject : string;
     Status : number;*/
    function Task(Id, CompletedDate, CreatedDate, DueDate, StartDate, Subject, Status) {
        this.Id = Id;
        this.CompletedDate = CompletedDate;
        this.CreatedDate = CreatedDate;
        this.DueDate = DueDate;
        this.StartDate = StartDate;
        this.Subject = Subject;
        this.Status = Status;
    }
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=task.js.map