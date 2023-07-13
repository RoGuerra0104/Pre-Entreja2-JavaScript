const tipoBebidas = document.getElementById("tipoBebidas");
const verCarrito = document.getElementById("ver-carrito");
const divCarrito = document.getElementById("carrito");

// Definimos los objetos de las bebidas
const bebidas = [{
    id: 1,
    img: "https://beermarket.com.ar/wp-content/uploads/2020/11/Branca-1L.png",
    bebidas: "Fernet",
    precio: 2800,
    cantidad: 1,
},
{
    id: 2,
    img: "https://nomu.asia/wp-content/uploads/2022/06/Aperol-700ML-pic-2.png",
    bebidas: "Aperol",
    precio: 2100,
    cantidad: 1,
},
{
    id: 3,
    img: "https://tienda-cdn.bonvivir.com/catalog/product/cache/3538cf6925d8e4c2f44bd5c16a20a410/s/m/smirnoff-raspberry.png",
    bebidas: "Smirnoff",
    precio: 2500,
    cantidad: 1,
},
{
    id: 4,
    img: "https://tiendavines.com/web/image/product.product/10/image_1920/APERITIVO%20GANCIA%20X%20950%20CC?unique=2341640",
    bebidas: "Gancia",
    precio: 2000,
    cantidad: 1,
}
]


let carrito1 = JSON.parse(localStorage.getItem("carrito")) || [];

// Recorremos las bebidas con un forEach y generamos su contenido en el DOM
bebidas.forEach((producto) => {
    let contenido = document.createElement("div");
    contenido.className = "tipoBebidas";
    contenido.innerHTML =
        `
    <img src="${producto.img}" alt=""><br><h3 class"h3">${producto.bebidas}</h3><br><p class="precio">$${producto.precio}</p>
`;
    tipoBebidas.append(contenido);

    //Creamos un botón para añadir el producto al carrito
    let comprar = document.createElement("button");
    comprar.innerHTML = `<button><i class="fa-solid fa-cart-plus fa-2xl" style="color: #000000;" id="btnCarrito"></i></button>`;
    contenido.appendChild(comprar)

    comprar.addEventListener("click", () => {

        const productoRepetido = carrito1.some((repetirProducto) => repetirProducto.id === producto.id)

        if (productoRepetido === true) {
            //si el producto está repetido añadimos mas cantidad
            carrito1.map((prod) => {
                if (prod.id === producto.id) {
                    prod.cantidad++;
                }
            })
        } else {
            //si el producto no está en el carrito, lo añadimos
            carrito1.push({
                id: producto.id,
                bebidas: producto.bebidas,
                precio: producto.precio,
                cantidad: producto.cantidad
            });
        }
        guardarLocal();
        console.log(carrito1);
    })

})


// le añadimos DOM al carrito 
const pintarCarrito = () => {
    divCarrito.innerHTML = "";
    carrito1.forEach((producto) => {
        let contenidoCarrito = document.createElement("div");
        contenidoCarrito.className = "carritoProducto";
        contenidoCarrito.innerHTML = `
        <p>${producto.bebidas}</p>  
        <br>
        <span class="resta">-</span>
        <p class="cantidad" >Cantidad: ${producto.cantidad}</p>
        <span class="suma">+</span>
        <p class="total" >Total: $${producto.cantidad * producto.precio}</p>
        `;

        divCarrito.append(contenidoCarrito);


        // Función para restarle cantidad al producto del carrito
        let restar = contenidoCarrito.querySelector(".resta");
        restar.addEventListener("click", () => {
            if (producto.cantidad !== 1) {
                producto.cantidad--
            }
            pintarCarrito();
            guardarLocal();
        });


        // Función para sumarle cantidad al producto del carrito
        let sumar = contenidoCarrito.querySelector(".suma");
        sumar.addEventListener("click", () => {
            producto.cantidad++;
            pintarCarrito();
            guardarLocal();
        });

        // Creamos un botón para eliminar el producto del carrito
        let eliminar = document.createElement("button");
        eliminar.className = "boton";
        eliminar.innerText = "❌";
        contenidoCarrito.append(eliminar);


        eliminar.addEventListener("click", eliminarProducto);
        console.log(eliminarProducto);

    });

    //creamos una función que sume todos los precios de los productos que se encuentran en el carrito para así obtener el precio total
    const total = carrito1.reduce((sum, el) => sum + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement("div");
    totalCompra.className = "carrito";
    totalCompra.innerHTML = `<p>total a pagar: $${total}</p>`;
    divCarrito.append(totalCompra);

    //creamos un botón para pagar el cual solo va a aparecer si hay algun producto en el carrito, cuando pulsamos el boton de pagar, se limpia el LocalStorage
    const pagarTotal = total !== 0 ?
        (function () {
            const button = document.createElement("button");
            button.className = "pagarTotal";
            button.innerText = "Pagar Total";
            button.addEventListener("click", function () {
                localStorage.clear();
                divCarrito.innerText = "";
                alert("¡Gracias por su compra!");

            });

            return button;
        })()
        : "";
    divCarrito.append(pagarTotal);

};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = () => {
    const buscarId = carrito1.find((producto) => producto.id);

    carrito1 = carrito1.filter((carritoId) => {
        return carritoId !== buscarId
    });

    pintarCarrito();
    guardarLocal();
}

const guardarLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito1));
}

JSON.parse(localStorage.getItem("carrito"));

pintarCarrito();