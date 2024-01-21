import todoStore, { Filters } from "../../store/todo_store";

let element;

/**
 * 
 * @param {*} elementId 
 */
export const renderPending = (elementId) => {
  if (!element)
    element = document.querySelector( elementId );
  if (!element)
    throw new Error(`Element ${ elementId } not found`);

  element.innerHTML = todoStore.getTodos( Filters.Pending ).length;
  
}

