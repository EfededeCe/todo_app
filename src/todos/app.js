import html from './app.html?raw';
import todoStore from '../store/todo_store.js';
import { renderTodos } from './use_cases/render_todos.js';


const ElementsIDs = {
  TodoList: '.todo-list',
  NewTodoInput: '#new-todo-input'
}


/**
 * Renderiza html en el front
 * @param {String} elementId Elemento donde se va a crear la aplicación, usar querySelector
 */
export const App = ( elementId ) => { 


  const displayTodos = ( ) => {

    const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
    renderTodos( ElementsIDs.TodoList, todos );
  }


  // Cuando la función se llama

  (( ) => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append( app );
    displayTodos();
  })();


  // Referencias HTML (aparecen después de la renderización)
  const newDescriptionInput = document.querySelector(ElementsIDs.NewTodoInput);
  const todoListUL = document.querySelector(ElementsIDs.TodoList);

  // Listeners
  newDescriptionInput.addEventListener('keyup', ( event ) => {

    // Si se presiona enter (keyCode = 13), guarda la descripción del Todo
    if ( event.keyCode !== 13 ) return;
    if ( event.target.value.trim().length === 0 ) return;

    todoStore.addTodo( event.target.value )

    displayTodos();
    event.target.value = '';
  })


  todoListUL.addEventListener('click', (event) => {
    const element = event.target.closest('[data-id]');
    if (event.target.className.includes('destroy')){
      todoStore.deleteTodo( element.getAttribute('data-id') );
    } else if (element){
      todoStore.toggleTodo( element.getAttribute('data-id') );
    } else {
      throw new Error('There is not an element selected')
    }
    displayTodos();
  })




}



