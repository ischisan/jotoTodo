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
		if(this.todo != undefined) console.log("Edit Object with ID "+this.todo.id);
	}

	submitForm() {
		let newDate : Date = new Date(this.dueDateString);
		this.todo.dueDate = newDate.getTime();
		console.log("sending to server...");
		let response;

		console.log("todo-id is "+this.todo.id);
		let action;
		if(this.todo.id == null) { response = this.todoService.addTodo(this.todo); action = "add"; }
		else { response = this.todoService.saveTodo(this.todo); action="save"; }

		response.subscribe(
			data => { this.todo = data; console.log("this.todo:"); console.log(this.todo); },
			error => { alert("There was an error submitting the todo to server..."); },
			() => { 
				console.log("Return from submit with action: "+action+"; todo-id: "+this.todo.id);
				this.viewController.dismiss({action: action, todo: this.todo});
			 }
		);
	}

	deleteTodo() {
    	this.todoService.deleteTodo(this.todo).subscribe(
    		data => { console.log("deleted todo: "+data); },
    		error => { alert("deleting todo did not work..."); },
    		() => { 
    			console.log("finished deleting todo"); 
    			this.viewController.dismiss({ action: "delete", todo: this.todo});
    		}
    	);
  	}	

  	dismiss() {
  		this.viewController.dismiss();
  	}

}