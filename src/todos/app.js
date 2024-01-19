/**
 * 
 * @param {String} elementId Elemento donde se va a crear la aplicación, usar querySelector
 */
export const App = ( elementId ) => { 

  // Cuando la función se llama

  (( ) => {
    const app = document.createElement('div');
    app.innerHTML = '<h1>Hola mundo</h1>';
    document.querySelector(elementId).append( app );

  })();


}



