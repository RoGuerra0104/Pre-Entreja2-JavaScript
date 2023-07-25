const divTipoBebidas = document.getElementById("tipoBebidas");
const verCarrito = document.getElementById("ver-carrito");
const divCarrito = document.getElementById("carrito");

// Definimos los objetos de las bebidas


let carrito1 = JSON.parse(localStorage.getItem("carrito")) || [];

const tiposBebida = async () => {
    let bebidas = await fetch("bebidas.json")
    const posts = await bebidas.json()
    // Recorremos las bebidas con un forEach y generamos su contenido en el DOM
    posts.forEach((producto) => {
        let contenido = document.createElement("div");
        contenido.className = "tipoBebidas";
        contenido.innerHTML =
            `
                <img src="${producto.img}" alt=""><br>
                <h3 class"h3">${producto.bebidas}</h3><br>
                <p class="precio">$${producto.precio}</p>
            `;
            divTipoBebidas.append(contenido);


        //Creamos un botón para añadir el producto al carrito
        let comprar = document.createElement("button");
        comprar.innerHTML = `<button><i class="fa-solid fa-cart-plus fa-2xl" style="color: #000000;" id="btnCarrito"></i></button>`;
        contenido.appendChild(comprar)

        comprar.addEventListener("click", () => {

            Toastify({
                text: `${producto.bebidas} añadido :${producto.cantidad++} `,
                duration: 1000,
                className: "info",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();


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

}


const guardarLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito1));
}

JSON.parse(localStorage.getItem("carrito"));


tiposBebida();

