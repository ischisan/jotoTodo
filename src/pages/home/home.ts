import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Todo } from '../../model/todo';
import { TodoEditPage } from './todo-edit';

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


  todos: Todo[] = [
  	{
  		id: 1,
      title: 'Bier kaufen',
  		description: 'Das Bier wird langsam leer.',
  		dueDate: new Date('2017-08-01'),
  		done: true
  	},
  	{
  		id: 2,
      title: 'Sushi bestellen',
  		description: 'Wir haben heute keine Zeit zu kochen.',
  		dueDate: new Date('2017-09-01'),
  		done: true
  	},
  	{
  		id: 3,
      title: 'Kasten entsorgen',
  		description: 'Heute wird der alte Kasten abgeholt.',
  		dueDate: new Date('2017-10-01'),
  		done: false
  	}
  ];

  constructor(public navCtrl: NavController, public modalController: ModalController) {}


  showTodoList() {
  	if(this.showFinished) return this.todos;
  	else return this.todos.filter(todo => todo.done === false)
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
    todoEditModal.present();
  }

  addNewTodo() {
    let newTodo: Todo = new Todo();
    newTodo.dueDate = new Date();
    newTodo.id = 99;
    newTodo.done = false;

    this.todos.push(newTodo);
    console.log(newTodo);
    let addTodoEditModal = this.modalController.create(TodoEditPage, {"todo": newTodo});
    addTodoEditModal.present();
  }

}
