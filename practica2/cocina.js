const readline = require("readline");

class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

class Cocina {
    constructor() {
        this.productos = [];
        this.idActual = 1;
    }

    agregarProducto(nombre, precio, stock) {

        const nuevoProducto = new Producto(
            this.idActual++,
            nombre,
            precio,
            stock
        );

        this.productos.push(nuevoProducto);

        console.log("\nProducto agregado correctamente\n");
    }

    listarProductos() {

        console.log("\nLISTA DE PRODUCTOS\n");

        if (this.productos.length === 0) {
            console.log("No hay productos registrados\n");
        } else {
            console.table(this.productos);
        }

        mostrarMenu();
    }

    editarProducto(id, nombre, precio, stock) {

        const producto = this.productos.find(
            producto => producto.id === id
        );

        if (!producto) {
            console.log("\nProducto no encontrado\n");
            mostrarMenu();
            return;
        }

        producto.nombre = nombre;
        producto.precio = precio;
        producto.stock = stock;

        console.log("\nProducto actualizado correctamente\n");

        mostrarMenu();
    }

    eliminarProducto(id) {

        const indice = this.productos.findIndex(
            producto => producto.id === id
        );

        if (indice === -1) {
            console.log("\nProducto no encontrado\n");
            mostrarMenu();
            return;
        }

        this.productos.splice(indice, 1);

        console.log("\nProducto eliminado correctamente\n");

        mostrarMenu();
    }
}

const cocina = new Cocina();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenu() {

    console.log(`
==============================
      SISTEMA DE COCINA
==============================

1. Agregar producto
2. Listar productos
3. Editar producto
4. Eliminar producto
5. Salir

==============================
`);

    rl.question("Seleccione una opcion: ", opcion => {

        switch (opcion.trim()) {

            case "1":
                agregarProducto();
                break;

            case "2":
                cocina.listarProductos();
                break;

            case "3":
                editarProducto();
                break;

            case "4":
                eliminarProducto();
                break;

            case "5":
                console.log("\nPrograma finalizado");
                rl.close();
                break;

            default:
                console.log("\nOpcion invalida\n");
                mostrarMenu();
                break;
        }
    });
}

function agregarProducto() {

    rl.question("Nombre del producto: ", nombre => {

        rl.question("Precio: ", precio => {

            rl.question("Stock: ", stock => {

                cocina.agregarProducto(
                    nombre,
                    Number(precio),
                    Number(stock)
                );

                mostrarMenu();
            });
        });
    });
}

function editarProducto() {

    rl.question("Ingrese ID del producto: ", id => {

        const producto = cocina.productos.find(
            producto => producto.id === Number(id)
        );

        if (!producto) {
            console.log("\nProducto no encontrado\n");
            mostrarMenu();
            return;
        }

        rl.question("Nuevo nombre: ", nombre => {

            rl.question("Nuevo precio: ", precio => {

                rl.question("Nuevo stock: ", stock => {

                    cocina.editarProducto(
                        Number(id),
                        nombre,
                        Number(precio),
                        Number(stock)
                    );
                });
            });
        });
    });
}

function eliminarProducto() {

    rl.question("Ingrese ID del producto a eliminar: ", id => {

        cocina.eliminarProducto(Number(id));
    });
}

mostrarMenu();