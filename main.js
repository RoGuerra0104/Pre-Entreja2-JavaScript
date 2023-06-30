
const bebidas = [
    {
        nombre: "Fernet",
        tamaño: "750 ml",
        precio: 250,
    },
    {
        nombre: "Gancia",
        tamaño: "1 litro",
        precio: 180,
    },
    {
        nombre: "Smirnoff",
        tamaño: "700 ml",
        precio: 300,
    },
    {
        nombre: "Aperol",
        tamaño: "750 ml",
        precio: 200,
    }
];


const variedad = ["Fernet", "Gancia", "Smirnoff", "Aperol"];
let variedad2=variedad.sort();
alert(variedad2.join("-"));



let seguir = true;
const pedido = () => {
    while (seguir) {
        let tipo = prompt("Ingrese un tipo de bebida");
        switch (tipo.toLowerCase()) {
            case "fernet":
                for (const bebida0 in bebidas[0]) {
                    console.log(bebidas[0][bebida0])
                }
                let envio = prompt("ingrese si quiere con o sin envio");
                if (envio.toLowerCase() == "con envio") {
                    alert(`el costo total es de ${ bebidas[0].precio + 200 } `)
                }
                else if (envio.toLowerCase() == "sin envio") {
                    alert(`el costo total es de ${ bebidas[0].precio } `)
                }
                seguir = false;
                break;
            case "aperol":
                for (const bebida1 in bebidas[3]) {
                    console.log(bebidas[3][bebida1])
                }
                let envio1 = prompt("ingrese si quiere con o sin envio");
                if (envio1.toLowerCase() == "con envio") {
                    alert(`el costo total es de ${ bebidas[3].precio + 200 } `)
                }
                else if (envio1.toLowerCase() == "sin envio") {
                    alert(`el costo total es de ${ bebidas[3].precio } `)
                }
                seguir = false;
                break;
            case "gancia":
                for (const bebida2 in bebidas[1]) {
                    console.log(bebidas[1][bebida2])
                };
                let envio2 = prompt("ingrese si quiere con o sin envio");
                if (envio2.toLowerCase() == "con envio") {
                    alert(`el costo total es de ${ bebidas[1].precio + 200 } `)
                }
                else if (envio2.toLowerCase() == "sin envio") {
                    alert(`el costo total es de ${ bebidas[1].precio } `)
                }
                else
                seguir = false;
                break;
            case "smirnoff":
                for (const bebida3 in bebidas[2]) {
                    console.log(bebidas[2][bebida3])
                };
                let envio3 = prompt("ingrese si quiere con o sin envio");
                if (envio3.toLowerCase() == "con envio") {
                    alert(`el costo total es de ${ bebidas[2].precio + 200 } `)
                }
                else if (envio3.toLowerCase() == "sin envio") {
                    alert(`el costo total es de ${ bebidas[2].precio } `)
                }
                seguir = false;
                break;
            default:
                alert("Ingrese un tipo de babida válido");
                seguir = true;
        }
        seguir = confirm("¿Deseas elegir otra bebida?");
    }
    seguir ==" "
    alert("Gracias por su compra")
    
    
}
pedido();

