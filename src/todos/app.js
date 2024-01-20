import html from './app.html?raw';
import todoStore from '../store/todo_store.js';
import { renderTodos } from './use_cases/render_todos.js';


const ElementsIDs = {
  TodoList: '.todo-list'
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


}



