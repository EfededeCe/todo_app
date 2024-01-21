(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const p of i.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function d(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();const v=`<section class="todoapp">
  <header class="header">
      <h1>Tareas</h1>
      <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>
  </header>
  
  <!-- This section should be hidden by default and shown when there are todos -->
  <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
          <!-- These are here just to show the structure of the list items -->
          <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->
          <!-- <li class="completed" data-id="abc">
              <div class="view">
                  <input class="toggle" type="checkbox" checked>
                  <label>Probar JavaScript</label>
                  <button class="destroy"></button>
              </div>
              <input class="edit" value="Create a TodoMVC template">
          </li> -->
          <!-- <li>
              <div class="view">
                  <input class="toggle" type="checkbox">
                  <label>Comprar un unicornio</label>
                  <button class="destroy"></button>
              </div>
              <input class="edit" value="Rule the web">
          </li> -->
      </ul>
  </section>

  <!-- This footer should hidden by default and shown when there are todos -->
  <footer class="footer">
      <!-- This should be "0 items left" by default -->
      <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>
      <!-- Remove this if you don't implement routing -->
      <ul class="filters">
          <li>
              <a class="selected filtro" class="selected" href="#/">Todos</a>
          </li>
          <li>
              <a class="filtro" href="#/active">Pendientes</a>
          </li>
          <li>
              <a class="filtro" href="#/completed">Completados</a>
          </li>
      </ul>
      <!-- Hidden if no completed items are left ↓ -->
      <button class="clear-completed">Borrar completados</button>
  </footer>
</section>


<footer class="info">
  <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
  <!-- Change this out with your name and url ↓ -->
  <p>Creado por <a href="http://todomvc.com">ti</a></p>
  <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>
</footer>`;let T;const L=new Uint8Array(16);function C(){if(!T&&(T=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!T))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return T(L)}const n=[];for(let e=0;e<256;++e)n.push((e+256).toString(16).slice(1));function E(e,t=0){return n[e[t+0]]+n[e[t+1]]+n[e[t+2]]+n[e[t+3]]+"-"+n[e[t+4]]+n[e[t+5]]+"-"+n[e[t+6]]+n[e[t+7]]+"-"+n[e[t+8]]+n[e[t+9]]+"-"+n[e[t+10]]+n[e[t+11]]+n[e[t+12]]+n[e[t+13]]+n[e[t+14]]+n[e[t+15]]}const A=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),S={randomUUID:A};function P(e,t,r){if(S.randomUUID&&!t&&!e)return S.randomUUID();e=e||{};const d=e.random||(e.rng||C)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){r=r||0;for(let o=0;o<16;++o)t[r+o]=d[o];return t}return E(d)}class b{constructor(t){this.id=P(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={All:"all",Completed:"completed",Pending:"pending"},l={todos:[new b("Tarea 1"),new b("Tarea 2"),new b("Tarea 3")],filter:a.All},I=()=>{U(),console.log(l),console.log("InitStore")},U=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=a.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t,console.log("state ===> ",l),console.log("JSON.parse ====>",JSON.parse(localStorage.getItem("state")))},f=()=>{localStorage.setItem("state",JSON.stringify(l))},x=(e=a.All)=>{switch(e){case a.All:return[...l.todos];case a.Completed:return l.todos.filter(t=>t.done);case a.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid`)}},O=e=>{if(!e)throw new Error("Description is required");l.todos.push(new b(e)),f()},k=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),f(),t))},q=e=>{l.todos=l.todos.filter(t=>t.id!==e),f()},F=()=>{l.todos=l.todos.filter(e=>!e.done),f()},M=(e=a.All)=>{l.filter=e,f()},N=()=>l.filter,c={addTodo:O,deleteCompleted:F,deleteTodo:q,getCurrentFilter:N,getTodos:x,initStore:I,setFilter:M,toggleTodo:k},D=e=>{if(!e)throw new Error("A Todo object is required");const t=`
    <div class="view">
        <input class="toggle" type="checkbox" ${e.done?"checked":""}>
        <label>${e.description}</label>
        <button class="destroy"></button> 
    </div>
    <input class="edit" value="Create a TodoMVC template">
  `,r=document.createElement("li");return r.setAttribute("data-id",e.id),e.done&&r.classList.add("completed"),r.innerHTML=t,r};let h;const H=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Element ${e} not found`);h.innerHTML="",t.forEach(r=>{h.append(D(r))})};let w;const V=e=>{if(w||(w=document.querySelector(e)),!w)throw new Error(`Element ${e} not found`);w.innerHTML=c.getTodos(a.Pending).length},m={ClearCompleted:".clear-completed",Filters:".filters",NewTodoInput:"#new-todo-input",pendingCountLabel:"#pending-count",TodoList:".todo-list"},R=e=>{const t=()=>{const s=c.getTodos(c.getCurrentFilter());H(m.TodoList,s),r()},r=()=>{V(m.pendingCountLabel)};(()=>{const s=document.createElement("div");s.innerHTML=v,document.querySelector(e).append(s),t()})();const d=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),i=document.querySelector(m.ClearCompleted),p=document.querySelector(m.Filters);d.addEventListener("keyup",s=>{s.keyCode===13&&s.target.value.trim().length!==0&&(c.addTodo(s.target.value),t(),s.target.value="")}),o.addEventListener("click",s=>{const u=s.target.closest("[data-id]");if(s.target.className.includes("destroy"))c.deleteTodo(u.getAttribute("data-id"));else if(u)c.toggleTodo(u.getAttribute("data-id"));else throw new Error("There is not an element selected");t()}),i.addEventListener("click",()=>{c.deleteCompleted(),t()}),p.addEventListener("click",s=>{console.log(s);const u=s.target,y=p.children;if(u.classList.contains("filtro")){for(let g=0;g<y.length;g++)console.log(y[g].children),y[g].children[0].classList.contains("selected")&&y[g].children[0].classList.remove("selected");switch(u.classList.add("selected"),console.log(u.innerText),u.innerText){case"Pendientes":console.log("pending"),c.setFilter(a.Pending);break;case"Completados":console.log("completed"),c.setFilter(a.Completed);break;default:console.log("all"),c.setFilter(a.All)}t()}})};c.initStore();R("#app");
