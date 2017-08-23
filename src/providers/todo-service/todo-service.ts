import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Todo } from '../../model/todo';
import 'rxjs/add/operator/map';

/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

const serviceUrl = "https://joto-todo.restlet.net/v1/todos/";
const username = "jotoTodoApp";
const password = "SoEinTestAberAuch";

@Injectable()
export class TodoServiceProvider {

  headers : Headers;

  constructor(public http: Http) {
    this.headers = new Headers();
    this.headers.append("Authorization","Basic "+btoa(username+":"+password));
   	this.headers.append("Content-Type","application/json");
  }

  getTodos() {
  	return this.http.get(serviceUrl, {headers: this.headers}).map(res => res.json());
  }

  addTodo(todo : Todo) {
  	return this.http.post(serviceUrl, JSON.stringify(todo), {headers: this.headers}).map(res => res.json());
  }

  saveTodo(todo: Todo) {
  	return this.http.put(serviceUrl+todo.id, JSON.stringify(todo), {headers: this.headers}).map(res => res.json());
  }


}
