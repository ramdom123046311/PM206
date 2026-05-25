import readline from "readline";
import { Cocina, uiMostrarBusqueda, uiAgregarProductoCocina, uiEditarProductoCocina, uiEliminarProductoCocina,uiCambiarEstadoCocina,uiPrepararPedidoCocina } from "./cocina.js";
import { Caja, uiAgregarPedidoCaja, uiGenerarTicketCaja } from "./caja.js";
import { Cliente, uiAgregarPedidoCliente, uiGenerarTicketCliente } from "./cliente.js";

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

==============================`);
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

1. Lista general de pedidos
2. Finanzas y Totales Acumulados
3. Crear nuevo pedido 
4. Generar Ticket de Compra 
5. Regresar al menu principal

==============================`);
    rl.question("Seleccione una opcion: ", opcion => {
        switch (opcion.trim()) {
            case "1":
                caja.listarPedidos();
                mostrarMenuCaja();
                break;
            case "2":
                caja.mostrarFinanzas();
                mostrarMenuCaja();
                break;
            case "3":
                uiAgregarPedidoCaja(rl, caja, mostrarMenuCaja);
                break;
            case "4":
                uiGenerarTicketCaja(rl, caja, mostrarMenuCaja);
                break;
            case "5":
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

==============================`);
    rl.question("Seleccione una opcion: ", opcion => {
        switch (opcion.trim()) {
            case "1": uiAgregarProductoCocina(rl, cocina, mostrarMenuCocina); break;
            case "2":
                cocina.listarProductos();
                mostrarMenuCocina();
                break;
            case "3": uiEditarProductoCocina(rl, cocina, mostrarMenuCocina); break;
            case "4": uiEliminarProductoCocina(rl, cocina, mostrarMenuCocina); break;
            case "5": uiMostrarBusqueda(cocina.buscarMasBaratos(), "Productos más baratos"); mostrarMenuCocina(); break;
            case "6": uiMostrarBusqueda(cocina.buscarMasCaros(), "Productos más caros"); mostrarMenuCocina(); break;
            case "7": uiMostrarBusqueda(cocina.buscarBebidas(), "Bebidas"); mostrarMenuCocina(); break;
            case "8": uiMostrarBusqueda(cocina.buscarPostres(), "Postres"); mostrarMenuCocina(); break;
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

function mostrarMenuCliente() {
    console.log(`
==============================
       MODULO CLIENTE
==============================

1. Consultar Menú de Productos
2. Crear pedido 
3. Ver todos los pedidos 
4. Generar Ticket de Compra x
5. Ver Promociones
6. Regresar al menu principal

==============================`);
    rl.question("Seleccione una opcion: ", opcion => {
        switch (opcion.trim()) {
            case "1":
                cliente.consultarProductos();
                mostrarMenuCliente();
                break;
            case "2":
                uiAgregarPedidoCliente(rl, cliente, mostrarMenuCliente);
                break;
            case "3":
                cliente.listarPedidos();
                mostrarMenuCliente();
                break;
            case "4":
                uiGenerarTicketCliente(rl, cliente, mostrarMenuCliente);
                break;
            case "5":
                cliente.verPromociones();
                mostrarMenuCliente();
                break;
            case "6":
                mostrarMenuPrincipal();
                break;
            default:
                console.log("\nOpcion invalida\n");
                mostrarMenuCliente();
                break;
        }
    });
}

// Iniciar aplicación
mostrarMenuPrincipal();