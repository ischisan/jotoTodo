import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Todo } from '../../model/todo';

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
  		title: 'Bier kaufen',
  		description: 'Das Bier wird langsam leer.',
  		dueDate: new Date('2017-08-01'),
  		done: true
  	},
  	{
  		title: 'Sushi bestellen',
  		description: 'Wir haben heute keine Zeit zu kochen.',
  		dueDate: new Date('2017-09-01'),
  		done: true
  	},
  	{
  		title: 'Kasten entsorgen',
  		description: 'Heute wird der alte Kasten abgeholt.',
  		dueDate: new Date('2017-10-01'),
  		done: false
  	}
  ];

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

  constructor(public navCtrl: NavController) {

  }

}
