let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = { 
    id:'',
    nombre:'',
    fecha:'',
    hora:'',
    servicios:[]
}

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    //Toma el evento del tab seleccionado
    // Y cambia la seccion cuando se presionen los tabs 
    tabs(); 
    mostrarSeccion();

    //Es la funcion para marcar el tab
    botonesPaginador();

    //Son las funciones de los botones del paginador
    paginaSiguiente();
    paginaAnterior();

    //Consulta la API y trae los servicios de la BD en .json
    consultarAPI();

    //Carga los datos del objeto cita
    idCliente();
    nombreCliente();
    seleccionarFecha();
    seleccionarHora();
}

function tabs(){
    const botones = document.querySelectorAll('.tabs button');
    botones.forEach(boton=>{
        boton.addEventListener('click', function(e){     
            paso = parseInt(e.target.dataset.paso);
            mostrarSeccion();
            botonesPaginador();
        });
    });
}

function mostrarSeccion(){
    //Se muestran y ocultan las secciones de acuerdo a la selección
    const seccionAnterior = document.querySelector('.mostrar');
    if(seccionAnterior){
        seccionAnterior.classList.remove('mostrar');
    }
    const seccion = document.querySelector(`#paso-${paso}`);
    seccion.classList.add('mostrar');

    //Se resalta el tab seleccionado
    const tabAnerior = document.querySelector('.actual');
    if(tabAnerior){
        tabAnerior.classList.remove('actual');
    }
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');
}

function botonesPaginador(){
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');
    if(paso === 1){
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }else if(paso === 3){
        paginaAnterior.classList.remove('ocultar')
        paginaSiguiente.classList.add('ocultar');
        mostrarResumen();
    }else{
        paginaAnterior.classList.remove('ocultar')
        paginaSiguiente.classList.remove('ocultar');
    }
    mostrarSeccion();
}

function paginaAnterior(){
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function(){
        if(paso <= pasoInicial) return;
        paso--;
        botonesPaginador();
    });
}

function paginaSiguiente(){
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function(){
        if(paso >= pasoFinal) return;
        paso++;
        botonesPaginador();
    });
}

async function consultarAPI(){
    try{
        const url = '/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);
    }catch(error){
        console.log(error);
    }
}

function mostrarServicios(servicios){
    servicios.forEach(servicio=>{
        const {id, nombre, precio} = servicio;
        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$ ${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function(){
            seleccionarServicio(servicio);
        };

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);
    });
}

function seleccionarServicio(servicio){
    const {id} = servicio;
    const {servicios} = cita;
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    if(servicios.some(agregado=> agregado.id === id)){
        cita.servicios = servicios.filter(agregado=> agregado.id !== id);
        divServicio.classList.remove('seleccionado');
    }else{
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');
    }
}

function nombreCliente(){
    cita.nombre = document.querySelector('#nombre').value;
}


function idCliente(){
    cita.id = document.querySelector('#id').value;
}

function seleccionarFecha(){
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('change', function(e){
        const dia = new Date(e.target.value).getUTCDay();
        if([6, 0].includes(dia)){
            e.target.value = '';
            mostrarAlerta('Fines de semana no disponibles', 'error', '.formulario');
        }else{
            cita.fecha = inputFecha.value;
        }
        
    });
}

function seleccionarHora(){
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('change', function(e){
        const horaCita = e.target.value;
        const hora = horaCita.split(':')[0];
        if(hora < 10 || hora > 18){
            e.target.value = '';
            mostrarAlerta('El horario de atencion es de 10 a 18', 'error', '.formulario');
        }else{
            cita.hora = e.target.value;
        }
    });
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true){
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia){
        alertaPrevia.remove();
    }
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);
    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);
    if(desaparece){
        setTimeout(()=>{
            alerta.remove();
        }, 3000);
    }
}

function mostrarResumen(){
    const resumen = document.querySelector('.contenido-resumen');
    while(resumen.firstChild){
        resumen.removeChild(resumen.firstChild);
    }
    if(Object.values(cita).includes('')){
        mostrarAlerta('Hacen faltos datos', 'error', '.contenido-resumen', false);
    }else if(cita.servicios.length === 0){
        mostrarAlerta('Debe agregar servicios', 'error', '.contenido-resumen', false);
    }else{
        const {nombre, fecha, hora, servicios} = cita;
        let precioTotal = 0;
        const fechaObj = new Date(fecha);
        const mes = fechaObj.getMonth();
        const dia = fechaObj.getDate() + 2;
        const año = fechaObj.getFullYear();
        const fechaUTC = new Date(Date.UTC(año, mes, dia));
        const opciones = {weekday:'long', year:'numeric', month:'long', day:'numeric'};
        const fechaFormateada = fechaUTC.toLocaleDateString('es-AR', opciones);
        const nombreCliente = document.createElement('P');
        nombreCliente.innerHTML=`<span> Cliente: </span> ${nombre}`;
        const fechaCita = document.createElement('P');
        fechaCita.innerHTML=`<span> Fecha:</span> ${fechaFormateada}`;
        const horaCita = document.createElement('P');
        horaCita.innerHTML=`<span> Hora: </span> ${hora}`;
        const contenedorDatos = document.createElement('DIV'); 
        contenedorDatos.classList.add('contenedor-datos');
        contenedorDatos.appendChild(nombreCliente);
        contenedorDatos.appendChild(fechaCita);
        contenedorDatos.appendChild(horaCita);

        const headingCita = document.createElement('H3');
        headingCita.textContent = 'Datos de la cita';
        resumen.appendChild(headingCita);
        resumen.appendChild(contenedorDatos);

        const headingServicios = document.createElement('H3');
        headingServicios.textContent = 'Resumen de Servicios';
        resumen.appendChild(headingServicios);
        servicios.forEach(servicio=>{
            const {id, precio, nombre} = servicio;
            precioTotal += parseFloat(precio);
            const contenedorServicio = document.createElement('DIV');
            contenedorServicio.classList.add('contenedor-servicio');
            const textoServicio = document.createElement('P');
            textoServicio.textContent = nombre;
            const precioServicio = document.createElement('P');
            precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;
            contenedorServicio.appendChild(textoServicio);
            contenedorServicio.appendChild(precioServicio);
            resumen.appendChild(contenedorServicio);
        });
        const pPrecioTotal = document.createElement('P');
        pPrecioTotal.innerHTML = `<span>Total:</span> $${precioTotal}`;
        pPrecioTotal.classList.add('total');
        resumen.appendChild(pPrecioTotal);

        const botonReservar = document.createElement('BUTTON');
        botonReservar.classList.add('boton');
        botonReservar.textContent = 'Reservar Cita';
        botonReservar.onclick = reservarCita;
        resumen.appendChild(botonReservar);
    }
}

async function reservarCita(){
    const {id, nombre, fecha, hora, servicios} = cita;
    const idServicios = servicios.map(servicio=> servicio.id);

    //Se agregan al FormData los datos que se van a pasar por fetch
    const datos = new FormData();
    datos.append('nombre', nombre);
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('usuarioID', id);
    datos.append('servicios', idServicios);

    try {
        const url = '/api/citas';
        const respuesta = await fetch(url, {
            method: 'POST',
            body: datos
        });
        const resultado = await respuesta.json();
        if(resultado.resultado){
            Swal.fire({
                icon: "success",
                title: "Cita Creada",
                text: "Tu cita fue creada correctamente!",
                button: 'OK'
            }).then(()=>{
                window.location.reload()
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al guardar la cita!"
        });
    }
}