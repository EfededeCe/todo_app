import { Todo } from "../todos/models/todo_model";


const Filters = {
  All: 'all',
  Completed: 'Completed',
  Pending: 'Pending'
}

// El state va a permitir aceder a sus elementos en cualquier lugar de la app
// es decir acceder al arreglo de TODOS y los filtros
const state = {
  todos: [
    new Todo('Piedra del alma'),
    new Todo('Piedra del infinito'),
    new Todo('Piedra del tiempo'),
    new Todo('Piedra del poder'),
    new Todo('Piedra de realidad')
  ],
  filter: Filters.All
}


const initStore = () => {
  console.log(state);
  console.log('InitStore');

}


const loadStore = () => {
  throw new Error('Method not implemented');
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
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
  
  if ( !description ) throw new Error('Description is required');
  state.todos.push( new Todo(description) );

}


/**
 * 
 * @param {String} todoId El ID del TODO 
 */
const toggleTodo = ( todoId ) => {
  state.todos = state.todos.map( todo => {
    if ( todo.id === todoId ){
      todo.done =!todo.done;
    }
    return todo;
  } )
}


const deleteTodo = ( todoId ) => {
  state.todos = state.todos.filter( todo => todo.id !== todoId );
}


const deleteCompleted = ( todoId ) => {
  state.todos = state.todos.filter( todo => todo.done );
}

/**
 * 
 * @param {Filters} newFilter debe ser un parámetro de tipo Filters 
 */
const setFilter = ( newFilter = Filters.All ) => {
  state.filter = newFilter;

}


const getCurrentFilter = (  ) => {
  return state.filter

}


export default {
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  setFilter,
  toggleTodo
}
