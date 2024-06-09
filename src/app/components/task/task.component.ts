import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: any;
  // loading: boolean = false;
  taskToDeleteId!: number;
  taskToDeleteName!: string;
  searchKeyword: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    // this.loading = true;
    return this.taskService.getTasks(this.searchKeyword).subscribe((res: any) => {
      console.log(res);
      this.tasks = res.tasks;
      // this.loading = false;
    });
  }

  search() {
    this.getTask();
  }

  setTaskToDelete(taskId: number, taskName: string) {
    this.taskToDeleteId = taskId;
    this.taskToDeleteName = taskName;
  }

  deleteCategory(){
    this.taskService.deleteTask(this.taskToDeleteId).subscribe(res=>{
      this.getTask();
      document.getElementById('exampleModal-2')?.click();
    });
  }

}
