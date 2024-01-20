import './style.css';
import { App } from './src/todos/app.js';
import todoStore from './src/store/todo_store.js';

todoStore.initStore();

App('#app');
