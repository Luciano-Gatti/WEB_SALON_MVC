document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    buscarFecha();
}

function buscarFecha(){
    const fechaInput = document.querySelector('#fecha');
    fechaInput.addEventListener('change', function(e){
        const fechaSeleccionada = e.target.value;
        window.location = `?fecha=${fechaSeleccionada}`;
    });
}