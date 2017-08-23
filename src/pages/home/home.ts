import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Todo } from '../../model/todo';
import { TodoEditPage } from './todo-edit';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles: [`

	ion-item {
		cursor: pointer;
	}
  `]
})

export class HomePage {

  showFinished : boolean = false;


  todos: Todo[] = [];
  

  constructor(public navCtrl: NavController, public modalController: ModalController, public todoService : TodoServiceProvider ) {
      todoService.getTodos().subscribe(
        data => { this.todos = data; },
        error => alert("Did not work!"),
        () => console.log(this.todos)
      );
  }


  showTodoList() {
  	
    if(this.showFinished) return this.todos;
  	else return this.todos.filter(todo => todo.done === false);
    
  }

  showFinishedChanged(newState : boolean) {
  	console.log("changed state: "+newState);
  	this.showFinished = newState;
  }

  toggleTodoDone(todo: Todo) {
  	let todoToToggle = this.todos.find(findTodo => todo === findTodo);
  	if(todoToToggle.done) todoToToggle.done = false;
  	else todoToToggle.done = true;
  }

  showModal(todo : Todo) {
    let todoEditModal = this.modalController.create(TodoEditPage, {"todo": todo});
    todoEditModal.onDidDismiss(data => {
      if(data != undefined && data.action === "delete") this.todos = this.todos.filter(findTodo => findTodo.id !== data.todo.id);
      console.log("action delete detected...");
    });
    todoEditModal.present();
  }

  addNewTodo() {
    let newTodo: Todo = new Todo();
    
    newTodo.done = false;
    let newDate = new Date();
    newTodo.dueDate = newDate.getTime()
    
    
    let addTodoEditModal = this.modalController.create(TodoEditPage, {"todo": newTodo});
    addTodoEditModal.onDidDismiss(data => {
      if(data != undefined && data.action == "add" && data.todo != undefined) this.todos.push(data.todo);
    });
    addTodoEditModal.present();
  }



}
