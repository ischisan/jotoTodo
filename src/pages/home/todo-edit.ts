import { NavParams, ModalController, ViewController } from 'ionic-angular';
import { Component, } from '@angular/core';
import { Todo } from '../../model/todo';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';

@Component({
	templateUrl: "./todo-edit.html",
	styles: [`
		.submit-button {
			margin: 15px;
		}
	`]
})
export class TodoEditPage {
	
	todo: Todo;
	dueDateString: string;

	constructor(
		public params : NavParams,
		public modalController: ModalController,
		public viewController: ViewController,
		public todoService : TodoServiceProvider
	) {
		this.todo = params.data["todo"];
		let tzOffset = new Date().getTimezoneOffset();
		
		this.dueDateString = new Date(this.todo.dueDate - tzOffset*60*1000).toISOString().slice(0,10);
		console.log("DateString: "+this.dueDateString);
	}

	submitForm() {
		let newDate : Date = new Date(this.dueDateString);
		this.todo.dueDate = newDate.getTime();
		console.log("sending to server...");
		let response;

		console.log("todo-id is "+this.todo.id);
		if(this.todo.id == null) response = this.todoService.addTodo(this.todo);
		else response = this.todoService.saveTodo(this.todo);

		response.subscribe(
			data => { console.log("Got Data:"); console.log(data); this.todo = data},
			error => { alert("There was an error submitting the todo to server..."); },
			() => { console.log("done sending to server"); }
		);

		this.viewController.dismiss(this.todo);

	}

	dismiss() {
		this.viewController.dismiss();
	}

	

}