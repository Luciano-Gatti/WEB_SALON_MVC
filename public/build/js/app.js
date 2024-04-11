let paso=1;const pasoInicial=1,pasoFinal=3,cita={id:"",nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){tabs(),mostrarSeccion(),botonesPaginador(),paginaSiguiente(),paginaAnterior(),consultarAPI(),idCliente(),nombreCliente(),seleccionarFecha(),seleccionarHora()}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()}))})}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");document.querySelector("#paso-"+paso).classList.add("mostrar");const t=document.querySelector(".actual");t&&t.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function botonesPaginador(){const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");1===paso?(e.classList.add("ocultar"),t.classList.remove("ocultar")):3===paso?(e.classList.remove("ocultar"),t.classList.add("ocultar"),mostrarResumen()):(e.classList.remove("ocultar"),t.classList.remove("ocultar")),mostrarSeccion()}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",(function(){paso<=1||(paso--,botonesPaginador())}))}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",(function(){paso>=3||(paso++,botonesPaginador())}))}async function consultarAPI(){try{const e="/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach(e=>{const{id:t,nombre:o,precio:a}=e,n=document.createElement("P");n.classList.add("nombre-servicio"),n.textContent=o;const c=document.createElement("P");c.classList.add("precio-servicio"),c.textContent="$ "+a;const r=document.createElement("DIV");r.classList.add("servicio"),r.dataset.idServicio=t,r.onclick=function(){seleccionarServicio(e)},r.appendChild(n),r.appendChild(c),document.querySelector("#servicios").appendChild(r)})}function seleccionarServicio(e){const{id:t}=e,{servicios:o}=cita,a=document.querySelector(`[data-id-servicio="${t}"]`);o.some(e=>e.id===t)?(cita.servicios=o.filter(e=>e.id!==t),a.classList.remove("seleccionado")):(cita.servicios=[...o,e],a.classList.add("seleccionado"))}function nombreCliente(){cita.nombre=document.querySelector("#nombre").value}function idCliente(){cita.id=document.querySelector("#id").value}function seleccionarFecha(){const e=document.querySelector("#fecha");e.addEventListener("change",(function(t){const o=new Date(t.target.value).getUTCDay();[6,0].includes(o)?(t.target.value="",mostrarAlerta("Fines de semana no disponibles","error",".formulario")):cita.fecha=e.value}))}function seleccionarHora(){document.querySelector("#hora").addEventListener("change",(function(e){const t=e.target.value.split(":")[0];t<10||t>18?(e.target.value="",mostrarAlerta("El horario de atencion es de 10 a 18","error",".formulario")):cita.hora=e.target.value}))}function mostrarAlerta(e,t,o,a=!0){const n=document.querySelector(".alerta");n&&n.remove();const c=document.createElement("DIV");c.textContent=e,c.classList.add("alerta"),c.classList.add(t);document.querySelector(o).appendChild(c),a&&setTimeout(()=>{c.remove()},3e3)}function mostrarResumen(){const e=document.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(cita).includes(""))mostrarAlerta("Hacen faltos datos","error",".contenido-resumen",!1);else if(0===cita.servicios.length)mostrarAlerta("Debe agregar servicios","error",".contenido-resumen",!1);else{const{nombre:t,fecha:o,hora:a,servicios:n}=cita;let c=0;const r=new Date(o),i=r.getMonth(),s=r.getDate()+2,d=r.getFullYear(),l={weekday:"long",year:"numeric",month:"long",day:"numeric"},u=new Date(Date.UTC(d,i,s)).toLocaleDateString("es-AR",l),m=document.createElement("P");m.innerHTML="<span> Cliente: </span> "+t;const p=document.createElement("P");p.innerHTML="<span> Fecha:</span> "+u;const v=document.createElement("P");v.innerHTML="<span> Hora: </span> "+a;const h=document.createElement("DIV");h.classList.add("contenedor-datos"),h.appendChild(m),h.appendChild(p),h.appendChild(v);const f=document.createElement("H3");f.textContent="Datos de la cita",e.appendChild(f),e.appendChild(h);const C=document.createElement("H3");C.textContent="Resumen de Servicios",e.appendChild(C),n.forEach(t=>{const{id:o,precio:a,nombre:n}=t;c+=parseFloat(a);const r=document.createElement("DIV");r.classList.add("contenedor-servicio");const i=document.createElement("P");i.textContent=n;const s=document.createElement("P");s.innerHTML="<span>Precio:</span> $"+a,r.appendChild(i),r.appendChild(s),e.appendChild(r)});const L=document.createElement("P");L.innerHTML="<span>Total:</span> $"+c,L.classList.add("total"),e.appendChild(L);const S=document.createElement("BUTTON");S.classList.add("boton"),S.textContent="Reservar Cita",S.onclick=reservarCita,e.appendChild(S)}}async function reservarCita(){const{id:e,nombre:t,fecha:o,hora:a,servicios:n}=cita,c=n.map(e=>e.id),r=new FormData;r.append("nombre",t),r.append("fecha",o),r.append("hora",a),r.append("usuarioID",e),r.append("servicios",c);try{const e="/api/citas",t=await fetch(e,{method:"POST",body:r});(await t.json()).resultado&&Swal.fire({icon:"success",title:"Cita Creada",text:"Tu cita fue creada correctamente!",button:"OK"}).then(()=>{window.location.reload()})}catch(e){Swal.fire({icon:"error",title:"Error",text:"Hubo un problema al guardar la cita!"})}}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));