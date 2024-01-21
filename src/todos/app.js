import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo_store.js';
import { renderTodos, renderPending } from './use_cases';


const ElementsIDs = {
  ClearCompleted: '.clear-completed',
  Filters: '.filters',
  NewTodoInput: '#new-todo-input',
  pendingCountLabel: '#pending-count',
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
    updatePendingCount();
  }


  const updatePendingCount = () => {
    renderPending( ElementsIDs.pendingCountLabel );
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
  const clearCompletedButton = document.querySelector(ElementsIDs.ClearCompleted);
  const filtersUl = document.querySelector(ElementsIDs.Filters);


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


  clearCompletedButton.addEventListener('click', () => {

      todoStore.deleteCompleted();

      displayTodos();

  })


  filtersUl.addEventListener('click', ( event ) => {
    console.log(event);
    const element = event.target;
    const elementsAdja = filtersUl.children;
    
    if ( element.classList.contains('filtro') /* && !element.classList.contains('selected')  */){

      for( let i = 0; i < elementsAdja.length; i++ ) {
        console.log(elementsAdja[i].children);
        elementsAdja[i].children[0].classList.contains('selected') ? elementsAdja[i].children[0].classList.remove('selected') : '';
      };

      element.classList.add('selected');
      console.log(element.innerText);
      
      switch( element.innerText ){
        case 'Pendientes':
          console.log('pending');
          todoStore.setFilter(Filters.Pending);
          break;
        case 'Completados':
          console.log('completed');
          todoStore.setFilter(Filters.Completed);
          break;
        default:
          console.log('all');
          todoStore.setFilter(Filters.All);
      }


      displayTodos();
    }

  })



}



