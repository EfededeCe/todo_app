import { Todo } from "../todos/models/todo_model";


export const Filters = {
  All: 'all',
  Completed: 'completed',
  Pending: 'pending'
}

// El state va a permitir aceder a sus elementos en cualquier lugar de la app
// es decir acceder al arreglo de TODOS y los filtros
const state = {
  todos: [
    new Todo('Tarea 1'),
    new Todo('Tarea 2'),
    new Todo('Tarea 3'),
  ],
  filter: Filters.All
}


const initStore = () => {
  loadStore();
  console.log(state);
  console.log('InitStore');

}


const loadStore = () => {
  if( !localStorage.getItem('state') ) return;
  
  const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));

  state.todos = todos;
  state.filter = filter;
  console.log('state ===> ', state); 

  console.log('JSON.parse ====>', JSON.parse(localStorage.getItem('state')));

}


const saveStateToLocalStorage = () => {
  localStorage.setItem('state', JSON.stringify(state));
}


const getTodos = ( filter = Filters.All ) => {

  switch( filter ){
    case Filters.All:
      return [...state.todos]; // JS pasa obj por ref, asique no queremos mandar referencia
    case Filters.Completed:
      return state.todos.filter( todo => todo.done );
    case Filters.Pending:
      return state.todos.filter( todo => !todo.done );
    default:
      throw new Error(`Option ${ filter } is not valid`);
  }
  

}


/**
 * Agregar un nuevo TODO al array
 * @param {String} description 
 */
const addTodo = ( description ) => {
  
  if ( !description ) throw new Error('Description is required');
  state.todos.push( new Todo(description) );

  saveStateToLocalStorage();  

}


/**
 * 
 * @param {String} todoId El ID del TODO 
 */
const toggleTodo = ( todoId ) => {
  state.todos = state.todos.map( todo => {
    if ( todo.id === todoId ){
      todo.done = !todo.done;
    }
    saveStateToLocalStorage()
    return todo;
  } )
}


const deleteTodo = ( todoId ) => {
  state.todos = state.todos.filter( todo => todo.id !== todoId );
  saveStateToLocalStorage();
}


const deleteCompleted = () => {
  state.todos = state.todos.filter( todo => !todo.done );
  saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter debe ser un parámetro de tipo Filters 
 */
const setFilter = ( newFilter = Filters.All ) => {
  state.filter = newFilter;
  saveStateToLocalStorage()

}


const getCurrentFilter = (  ) => {
  return state.filter

}


export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  setFilter,
  toggleTodo
}
