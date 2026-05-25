export class Cliente {
    constructor(referenciaCocina, referenciaCaja) {
        this.cocina = referenciaCocina;
        this.caja = referenciaCaja;
    }

    consultarProductos() {
        this.cocina.listarProductosPublico();
    }

    crearPedidoCompleto(cliente, items) {
        this.caja.procesarOrden(cliente, items);
    }

    listarPedidos() {
        this.caja.listarPedidos();
    }

    verPromociones() {
        console.log("\n--- PROMOCIONES VIGENTES ---");
        const enOferta = this.cocina.productos.filter(p => p.promocion > 0);
        
        if (enOferta.length === 0) {
            console.log("No hay promociones por ahora.");
        } else {
            // Mapeamos los datos para estructurarlos de forma bonita para la tabla
            const tablaPromociones = enOferta.map(p => ({
                "ID": p.id,
                "Producto": p.nombre,
                "Descuento": `${p.promocion}% OFF`,
                "Precio Normal": `$${p.precio.toFixed(2)}`,
                "Precio Final": `$${p.precioConDescuento().toFixed(2)}`
            }));
            
            // Imprimimos la tabla en la consola
            console.table(tablaPromociones);
        }
        console.log("----------------------------\n");
    }
}

export function uiAgregarPedidoCliente(rl, cliente, callbackMenu) {
    rl.question("Escribe tu nombre: ", nombreCliente => {
        let itemsSolicitados = [];
        console.log("\n--- ARMA TU PEDIDO (Escriba 0 en ID para finalizar y ordenar) ---");

        const pedirProducto = () => {
            rl.question("ID del producto: ", id => {
                if (id === "0") {
                    if (itemsSolicitados.length > 0) {
                        cliente.crearPedidoCompleto(nombreCliente, itemsSolicitados);
                    } else {
                        console.log("\nPedido cancelado (vacío).\n");
                    }
                    return callbackMenu();
                }
                rl.question("Cantidad: ", cantidad => {
                    itemsSolicitados.push({ idProducto: Number(id), cantidad: Number(cantidad) });
                    pedirProducto();
                });
            });
        };
        pedirProducto();
    });
}


export function uiGenerarTicketCliente(rl, cliente, callbackMenu) {
    if (cliente.caja.pedidos.length === 0) {
        console.log("\nAún no hay pedidos registrados.\n");
        return callbackMenu();
    }
    cliente.listarPedidos();
    rl.question("Ingrese el ID de su pedido para ver su ticket: ", id => {
        cliente.caja.calcularTicket(Number(id));
        callbackMenu();
    });
}