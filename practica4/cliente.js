export class Cliente {
    constructor(referenciaCocina, referenciaCaja) {
        this.cocina = referenciaCocina;
        this.caja = referenciaCaja;
    }

    consultarProductos() {
        this.cocina.listarProductosPublico();
    }

    crearPedidoCompleto(cliente, items) {
        const pedido = this.cocina.agregarPedido(cliente, items);

        console.log(`Pedido generado correctamente`);
        console.log(`Estado actual del pedido: ${pedido.estado}\n`);
    }

    listarPedidos() {
        this.cocina.listarPedidos();
    }

    verPromociones() {
        console.log("\n--- PROMOCIONES VIGENTES ---");

        const enOferta = this.cocina.productos.filter(
            p => p.promocion > 0
        );

        if (enOferta.length === 0) {
            console.log("No hay promociones por ahora.");
        } else {

            const tablaPromociones = enOferta.map(p => ({
                "ID": p.id,
                "Producto": p.nombre,
                "Descuento": `${p.promocion}% OFF`,
                "Precio Normal": `$${p.precio.toFixed(2)}`,
                "Precio Final": `$${p.precioConDescuento().toFixed(2)}`
            }));

            console.table(tablaPromociones);
        }

        console.log("----------------------------\n");
    }
}

export function uiAgregarPedidoCliente(rl, cliente, callbackMenu) {

    rl.question("Escribe tu nombre: ", nombreCliente => {

        let itemsSolicitados = [];

        console.log("\n--- ARMA TU PEDIDO ---");
        console.log("Escriba 0 en ID para finalizar\n");

        const pedirProducto = () => {

            rl.question("ID del producto: ", id => {

                if (id === "0") {

                    if (itemsSolicitados.length > 0) {

                        cliente.crearPedidoCompleto(
                            nombreCliente,
                            itemsSolicitados
                        );

                    } else {
                        console.log("\nPedido cancelado\n");
                    }

                    return callbackMenu();
                }

                rl.question("Cantidad: ", cantidad => {

                    itemsSolicitados.push({
                        idProducto: Number(id),
                        cantidad: Number(cantidad)
                    });

                    console.log("\nProducto agregado al pedido");
                    console.log("Estado del pedido: Preparando\n");

                    pedirProducto();
                });
            });
        };

        pedirProducto();
    });
}
export function uiGenerarTicketCliente(rl, cliente, callbackMenu) {
    if (cliente.cocina.pedidos.length === 0) {
        console.log("\nAún no hay pedidos registrados.\n");
        return callbackMenu();
    }

    cliente.listarPedidos();

    callbackMenu();
}