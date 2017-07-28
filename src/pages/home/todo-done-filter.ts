import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../../model/todo';

@Pipe({
	name: 'todoDoneFilter'
})
export class TodoDoneFilter implements PipeTransform {
	transform(allTodos : Todo[]) {
		return allTodos.filter(todo => todo.done === false);
	}
}