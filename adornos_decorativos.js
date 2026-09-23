//---------------------------------------//
//--|funcionalidad_adornos_decorativos|--//
//---------------------------------------//
const tarjetas_adornos = document.querySelectorAll(".tarjeta_adornos");
const botones_carrito = document.querySelectorAll(".boton_carrito");
const botones_favorito = document.querySelectorAll(".boton_favorito");
const botones_detalles = document.querySelectorAll(".boton_detalles");
const cantidad_carrito = document.getElementById("cantidad_carrito");
const total_carrito = document.getElementById("total_carrito");
const vaciar_carrito = document.getElementById("vaciar_carrito");
const modal_adornos = document.getElementById("modal_adornos");
const cerrar_modal = document.getElementById("cerrar_modal");
const titulo_modal = document.getElementById("titulo_modal");
const descripcion_modal = document.getElementById("descripcion_modal");
const precio_modal = document.getElementById("precio_modal");
let cantidad_productos = Number(localStorage.getItem("cantidad_adornos")) || 0;
let total_compra = Number(localStorage.getItem("total_adornos")) || 0;
//-------------------------------------//
//--|guardar_en_localstorage_carrito|--//
//-------------------------------------//
function guardar_carrito() {
    localStorage.setItem("cantidad_adornos", cantidad_productos);
    localStorage.setItem("total_adornos", total_compra);
}
//----------------------//
//--|agregar_producto|--//
//----------------------//
function agregar_producto(tarjeta) {
    if (!tarjeta) {
        return;
    }
    const precio = Number(tarjeta.dataset.precio);
    cantidad_productos++;
    total_compra += precio;
    guardar_carrito();
    actualizar_carrito();
}
//------------------------//
//--|actualizar_carrito|--//
//------------------------//
function actualizar_carrito() {
    cantidad_carrito.textContent = cantidad_productos + (cantidad_productos === 1 ? " producto" : " productos");
    total_carrito.textContent = "$" + total_compra.toFixed(2);
}
//--------------------//
//--|vaciar_carrito|--//
//--------------------//
function limpiar_carrito() {
    cantidad_productos = 0;
    total_compra = 0;
    localStorage.removeItem("cantidad_adornos");
    localStorage.removeItem("total_adornos");
    actualizar_carrito();
}
//-------------------------//
//--|eventos_del_carrito|--//
//-------------------------//
botones_carrito.forEach(
    function(boton) {
        boton.addEventListener(
            "click",
            function() {
                const tarjeta = boton.closest(".tarjeta_adornos");
                agregar_producto(tarjeta);
                boton.innerHTML = '<i class="fa-solid fa-check"></i> Agregado';
                setTimeout(
                    function() {
                        boton.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Agregar al carrito';
                    }, 1000
                );
            }
        );
    }
);
//--------------------------//
//--|guardar_en_favoritos|--//
//--------------------------//
function guardar_favoritos() {
    const favoritos = [];
    tarjetas_adornos.forEach(
        function(tarjeta, indice) {
            const boton = tarjeta.querySelector(".boton_favorito");
            if (
                boton.classList.contains("activo")
            ) {
                favoritos.push(indice);
            }
        }
    );
    localStorage.setItem("favoritos_adornos", JSON.stringify(favoritos)
    );
}
//--------------------------------------//
//--|cargar_en_localstorage_favoritos|--//
//--------------------------------------//
function cargar_favoritos() {
    const datos = localStorage.getItem("favoritos_adornos");
    if (!datos) {
        return;
    }
    const favoritos = JSON.parse(datos);
    favoritos.forEach(
        function(indice) {
            const tarjeta = tarjetas_adornos[indice];
            if (!tarjeta) {
                return;
            }
            const boton = tarjeta.querySelector(".boton_favorito");
            const icono = boton.querySelector("i");
            boton.classList.add("activo");
            icono.classList.remove("fa-regular");
            icono.classList.add("fa-solid");
            boton.setAttribute("aria-label", "Quitar de favoritos");
        }
    );
}
//-------------------------------//
//--|activar_eventos_favoritos|--//
//-------------------------------//
botones_favorito.forEach(
    function(boton) {
        boton.addEventListener(
            "click",
            function() {
                boton.classList.toggle("activo");
                const icono = boton.querySelector("i");
                if (
                    boton.classList.contains("activo")
                ) {
                    icono.classList.remove("fa-regular");
                    icono.classList.add("fa-solid");
                    boton.setAttribute("aria-label", "Quitar de favoritos");
                } else {
                    icono.classList.remove("fa-solid");
                    icono.classList.add("fa-regular");
                    boton.setAttribute("aria-label", "Agregar a favoritos");
                }
                guardar_favoritos();
            }
        );
    }
);
//----------------------//
//--|mostrar_detalles|--//
//----------------------//
function mostrar_detalles(tarjeta) {
    const nombre = tarjeta.dataset.nombre;
    const descripcion = tarjeta.dataset.descripcion;
    const precio = Number(
        tarjeta.dataset.precio
    );
    titulo_modal.textContent = nombre;
    descripcion_modal.textContent = descripcion;
    precio_modal.textContent = "$" + precio.toFixed(2);
    modal_adornos.classList.remove("oculto");
}
//------------------------------//
//--|activar_eventos_detalles|--//
//------------------------------//
botones_detalles.forEach(
    function(boton) {
        boton.addEventListener(
            "click",
            function() {
                const tarjeta = boton.closest(".tarjeta_adornos");
                mostrar_detalles(tarjeta);
            }
        );
    }
);
//-------------------------------//
//--|mostrar_ventana_emergente|--//
//-------------------------------//
cerrar_modal.addEventListener(
    "click",
    function() {
        modal_adornos.classList.add("oculto");
    }
);
modal_adornos.addEventListener(
    "click",
    function(evento) {
        if (evento.target === modal_adornos) {
            modal_adornos.classList.add("oculto");
        }
    }
);
document.addEventListener(
    "keydown",
    function(evento) {
        if (evento.key === "Escape") {
            modal_adornos.classList.add("oculto");
        }
    }
);
//-------------------//
//--|evento_vaciar|--//
//-------------------//
vaciar_carrito.addEventListener(
    "click",
    function() {
        limpiar_carrito();
    }
);
actualizar_carrito();
cargar_favoritos();