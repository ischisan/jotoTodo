import { NavParams, ModalController, ViewController } from 'ionic-angular';
import { Component, } from '@angular/core';
import { Todo } from '../../model/todo';

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
	dueDateString : string;

	constructor(
		public params : NavParams,
		public modalController: ModalController,
		public viewController: ViewController
	) {
		this.todo = params.data["todo"];
		this.dueDateString = this.todo.dueDate.toISOString();

	}

	submitForm() {
		this.todo.dueDate = new Date(this.dueDateString);
		this.viewController.dismiss();
	}

	dismiss() {
		this.viewController.dismiss();
	}

	

}