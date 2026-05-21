import readline from "readline";
import { Cocina, Producto } from "./cocina.js";

class Caja {
    constructor(referenciaCocina) {
        this.cocina = referenciaCocina;
        this.pedidos = [];
        this.totalAcumulado = 0;
    }

    agregarPedido(id, cantidad) {
        const producto = this.cocina.productos.find(p => p.id === id);
        if (!producto) {
            console.log("\nProducto no encontrado\n");
            return;
        }
        if (producto.stock < cantidad) {
            console.log(`\nStock insuficiente. Solo quedan ${producto.stock} unidades de "${producto.nombre}".\n`);
            return;
        }
        producto.stock -= cantidad;
        this.pedidos.push({
            id: producto.id,
            nombre: producto.nombre,
            cantidad: cantidad
        });
        this.totalAcumulado += cantidad;
        console.log("\nPedido agregado correctamente\n");
    }

    listarPedidos() {
        console.log("\nLISTA DE PEDIDOS\n");
        if (this.pedidos.length === 0) {
            console.log("No hay pedidos registrados\n");
        } else {
            console.table(this.pedidos);
        }
    }

    mostrarTotalAcumulado() {
        console.log("\nTOTAL ACUMULADO\n");
        console.log(`Total de artículos pedidos: ${this.totalAcumulado}\n`);
    }
}

class Cliente {
    constructor(referenciaCocina, referenciaCaja) {
        this.cocina = referenciaCocina;
        this.caja = referenciaCaja;
    }

    consultarProductos() {
        this.cocina.listarProductosPublico();
    }

    crearPedido(id, cantidad) {
        this.caja.agregarPedido(id, cantidad);
    }

    listarPedidos() {
        this.caja.listarPedidos();
    }
}

const cocina = new Cocina();
const caja = new Caja(cocina);
const cliente = new Cliente(cocina, caja);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenuPrincipal() {
    console.log(`
==============================
      SISTEMA PRINCIPAL
==============================

1. Modulo Caja
2. Modulo Cocina
3. Modulo Cliente
4. Salir

==============================
`);
    rl.question("Seleccione una opcion: ", opcion => {
        switch (opcion.trim()) {
            case "1": mostrarMenuCaja(); break;
            case "2": mostrarMenuCocina(); break;
            case "3": mostrarMenuCliente(); break;
            case "4":
                console.log("\nPrograma finalizado");
                rl.close();
                break;
            default:
                console.log("\nOpcion invalida\n");
                mostrarMenuPrincipal();
                break;
        }
    });
}

function mostrarMenuCaja() {
    console.log(`
==============================
        MODULO CAJA
==============================

1. Lista de pedidos
2. Total acumulado
3. Agregar pedido
4. Regresar al menu principal

==============================
`);
    rl.question("Seleccione una opcion: ", opcion => {
        switch (opcion.trim()) {
            case "1":
                caja.listarPedidos();
                mostrarMenuCaja();
                break;
            case "2":
                caja.mostrarTotalAcumulado();
                mostrarMenuCaja();
                break;
            case "3":
                agregarPedidoCaja();
                break;
            case "4":
                mostrarMenuPrincipal();
                break;
            default:
                console.log("\nOpcion invalida\n");
                mostrarMenuCaja();
                break;
        }
    });
}

function mostrarMenuCocina() {
    console.log(`
==============================
       MODULO COCINA
==============================

1. Agregar producto
2. Listar productos
3. Editar producto
4. Eliminar producto
5. Buscar productos mas baratos
6. Buscar productos mas caros
7. Buscar bebidas
8. Buscar postres
9. Listar categorias
10. Regresar al menu principal

==============================
`);
    rl.question("Seleccione una opcion: ", opcion => {
        switch (opcion.trim()) {
            case "1": agregarProductoCocina(); break;
            case "2":
                cocina.listarProductos();
                mostrarMenuCocina();
                break;
            case "3": editarProductoCocina(); break;
            case "4": eliminarProductoCocina(); break;
            case "5": mostrarBusqueda(cocina.buscarMasBaratos(), "Productos más baratos"); mostrarMenuCocina(); break;
            case "6": mostrarBusqueda(cocina.buscarMasCaros(), "Productos más caros"); mostrarMenuCocina(); break;
            case "7": mostrarBusqueda(cocina.buscarBebidas(), "Bebidas"); mostrarMenuCocina(); break;
            case "8": mostrarBusqueda(cocina.buscarPostres(), "Postres"); mostrarMenuCocina(); break;
            case "9":
                cocina.listarCategorias();
                mostrarMenuCocina();
                break;
            case "10":
                mostrarMenuPrincipal();
                break;
            default:
                console.log("\nOpcion invalida\n");
                mostrarMenuCocina();
                break;
        }
    });
}

function mostrarBusqueda(resultados, titulo) {
    console.log(`\n${titulo}:\n`);
    if (resultados.length === 0) {
        console.log("No se encontraron productos.\n");
    } else {
        console.table(resultados.map(p => ({
            id: p.id,
            nombre: p.nombre,
            precio: p.precio,
            categoria: p.categoria,
            promocion: p.promocion + "%"
        })));
    }
}

function mostrarMenuCliente() {
    console.log(`
==============================
       MODULO CLIENTE
==============================

1. Consultar Productos
2. Crear pedido
3. Listar pedidos
4. Regresar al menu principal

==============================
`);
    rl.question("Seleccione una opcion: ", opcion => {
        switch (opcion.trim()) {
            case "1":
                cliente.consultarProductos();
                mostrarMenuCliente();
                break;
            case "2":
                agregarPedidoCliente();
                break;
            case "3":
                cliente.listarPedidos();
                mostrarMenuCliente();
                break;
            case "4":
                mostrarMenuPrincipal();
                break;
            default:
                console.log("\nOpcion invalida\n");
                mostrarMenuCliente();
                break;
        }
    });
}

function agregarProductoCocina() {
    rl.question("Nombre: ", nombre => {
        rl.question("Precio: ", precio => {
            rl.question("Stock: ", stock => {
                cocina.listarCategorias();
                rl.question("Categoria (o nueva): ", categoria => {
                    rl.question("Promocion (% descuento, 0 si no): ", promocion => {
                        cocina.agregarProducto(nombre, Number(precio), Number(stock), categoria, Number(promocion));
                        mostrarMenuCocina();
                    });
                });
            });
        });
    });
}

function editarProductoCocina() {
    rl.question("ID del producto: ", id => {
        const producto = cocina.productos.find(p => p.id === Number(id));
        if (!producto) {
            console.log("\nProducto no encontrado\n");
            mostrarMenuCocina();
            return;
        }
        rl.question(`Nuevo nombre (${producto.nombre}): `, nombre => {
            rl.question(`Nuevo precio (${producto.precio}): `, precio => {
                rl.question(`Nuevo stock (${producto.stock}): `, stock => {
                    cocina.listarCategorias();
                    rl.question(`Nueva categoria (${producto.categoria}): `, categoria => {
                        rl.question(`Nueva promocion % (${producto.promocion}): `, promocion => {
                            cocina.editarProducto(
                                Number(id),
                                nombre || producto.nombre,
                                Number(precio) || producto.precio,
                                Number(stock) || producto.stock,
                                categoria || producto.categoria,
                                Number(promocion) || producto.promocion
                            );
                            mostrarMenuCocina();
                        });
                    });
                });
            });
        });
    });
}

function eliminarProductoCocina() {
    rl.question("ID del producto: ", id => {
        cocina.eliminarProducto(Number(id));
        mostrarMenuCocina();
    });
}

function agregarPedidoCaja() {
    rl.question("ID del producto: ", id => {
        rl.question("Cantidad: ", cantidad => {
            caja.agregarPedido(Number(id), Number(cantidad));
            mostrarMenuCaja();
        });
    });
}

function agregarPedidoCliente() {
    rl.question("ID del producto: ", id => {
        rl.question("Cantidad: ", cantidad => {
            cliente.crearPedido(Number(id), Number(cantidad));
            mostrarMenuCliente();
        });
    });
}

mostrarMenuPrincipal();