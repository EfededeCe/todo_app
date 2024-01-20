import { Todo } from "../models/todo_model";

/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHTML = ( todo ) => {

  if (!todo) throw new Error('A Todo object is required');

  const html = `
    <div class="view">
        <input class="toggle" type="checkbox" ${ todo.done ? 'checked' : '' }>
        <label>${ todo.description }</label>
        <button class="destroy"></button> 
    </div>
    <input class="edit" value="Create a TodoMVC template">
  `;

  const liElement = document.createElement('li');
  liElement.setAttribute('data-id', todo.id);
  todo.done ? liElement.classList.add('completed') : '';

  liElement.innerHTML = html;

  return liElement
}

