const tipoBebidas = document.getElementById("tipoBebidas");
const verCarrito = document.getElementById("ver-carrito");
const divCarrito = document.getElementById("carrito");
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


bebidas.forEach((producto) => {
    let contenido = document.createElement("div");
    contenido.className = "tipoBebidas";
    contenido.innerHTML =
        `
    <img src="${producto.img}" alt=""><br><h3 class"h3">${producto.bebidas}</h3><br><p class="precio">$${producto.precio}</p>
`;
    tipoBebidas.append(contenido);

    let comprar = document.createElement("button");
    comprar.innerHTML = `<button><i class="fa-solid fa-cart-plus fa-2xl" style="color: #000000;" id="btnCarrito"></i></button>`;
    contenido.appendChild(comprar)

    comprar.addEventListener("click", () => {

        const productoRepetido = carrito1.some((repetirProducto) => repetirProducto.id === producto.id)

        if (productoRepetido === true) {
            carrito1.map((prod) => {
                if (prod.id === producto.id) {
                    prod.cantidad++;
                }
            })
        } else {

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

const pintarCarrito = () => {
    const cosasCarrito = document.createElement("div");
    cosasCarrito.className = "h2Carrito";
    cosasCarrito.innerHTML = `
    <h2>Carrito de Compras</h2>
    `;
    divCarrito.appendChild(cosasCarrito);

    const carritoBoton = document.createElement("button");
    carritoBoton.className = "CarritoBoton";
    carritoBoton.innerText = "X";

    carritoBoton.addEventListener("click", () => {
        divCarrito.innerHTML = "";
    })

    cosasCarrito.append(carritoBoton);

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

        let restar=contenidoCarrito.querySelector(".resta");
        restar.addEventListener("click",()=>{
            if(producto.cantidad!==1){
            producto.cantidad--
        }
            pintarCarrito();
            guardarLocal();
        });
        
        let sumar=contenidoCarrito.querySelector(".suma");
        sumar.addEventListener("click",()=>{
            producto.cantidad++;
            pintarCarrito();
            guardarLocal();
        });

        let eliminar = document.createElement("button");
        eliminar.className = "boton";
        eliminar.innerText = "❌";
        contenidoCarrito.append(eliminar);
        

        eliminar.addEventListener("click", eliminarProducto);
        console.log(eliminarProducto);
        
    });

    const total = carrito1.reduce((sum, el) => sum + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement("div");
    totalCompra.className = "carrito";
    totalCompra.innerHTML = `<p>total a pagar: $${total}</p>`;
    divCarrito.append(totalCompra);

    if (total!=0){
    const pagarTotal=document.createElement("button");
    pagarTotal.className = "pagarTotal";
    pagarTotal.innerText="Pagar Total"
    divCarrito.append(pagarTotal);
}else {
    divCarrito.append("");
}

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

const guardarLocal=() => {
localStorage.setItem("carrito", JSON.stringify(carrito1));
}

JSON.parse(localStorage.getItem("carrito"));

pintarCarrito();