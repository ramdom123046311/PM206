export class Producto {
    constructor(id, nombre, precio, stock, categoria, promocion = 0) {
        Object.assign(this, { id, nombre, precio, stock, categoria, promocion });
    }

    precioConDescuento() {
        return this.promocion > 0
            ? this.precio * (1 - this.promocion / 100)
            : this.precio;
    }
}

export class Cocina {

    constructor() {
        this.productos = [
            new Producto(1, "Cafe", 30, 100, "bebida"),
            new Producto(2, "Conchas", 15, 50, "postre", 10),
            new Producto(3, "Te", 25, 80, "bebida"),
            new Producto(4, "Fresas", 40, 30, "postre", 5),
            new Producto(5, "Hotcakes", 50, 40, "desayuno")
        ];

        this.idActual = 6;
        this.categorias = ["bebida", "postre", "desayuno"];
        this.pedidos = [];
        this.idPedidoActual = 1;
    }

    agregarPedido(cliente, items) {
        const pedido = {
            id: this.idPedidoActual++,
            cliente,
            items,
            estado: "Preparando"
        };

        this.pedidos.push(pedido);

        console.log(`\nPedido #${pedido.id} registrado`);
        console.log(`Estado: ${pedido.estado}\n`);

        return pedido;
    }

    listarPedidos() {

        console.log("\n===== PEDIDOS =====\n");

        if (!this.pedidos.length)
            return console.log("No hay pedidos\n");

        console.table(this.pedidos.map(p => ({
            id: p.id,
            cliente: p.cliente,
            productos: p.items.length,
            estado: p.estado
        })));
    }

    simularCambioEstado(idPedido, estado) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {

                const pedido = this.pedidos.find(p => p.id === idPedido);

                if (!pedido)
                    return reject("Pedido no encontrado");

                pedido.estado = estado;

                switch (estado) {
                    case "Preparando":
                        resolve("Pedido en preparación");
                        break;

                    case "Falta de ingredientes":
                        reject("Faltan ingredientes");
                        break;

                    case "Error de cocina":
                        reject("Error en cocina");
                        break;

                    case "Listo":
                        resolve("Pedido listo");
                        break;

                    default:
                        reject("Estado inválido");
                }

            }, 2000);
        });
    }

    async cambiarEstadoPedido(idPedido, estado) {

        console.log("\nProcesando estado...\n");

        try {

            const mensaje = await this.simularCambioEstado(idPedido, estado);

            console.log(`EXITO: ${mensaje}\n`);

        } catch (error) {

            console.log(`ERROR: ${error}\n`);
        }
    }

    agregarCategoria(categoria) {
        if (!this.categorias.includes(categoria))
            this.categorias.push(categoria);
    }

    agregarProducto(nombre, precio, stock, categoria, promocion = 0) {

        this.agregarCategoria(categoria);

        this.productos.push(
            new Producto(
                this.idActual++,
                nombre,
                precio,
                stock,
                categoria,
                promocion
            )
        );

        console.log("\nProducto agregado\n");
    }

    listarProductos() {

        console.log("\nLISTA DE PRODUCTOS\n");

        if (!this.productos.length)
            return console.log("No hay productos\n");

        console.table(this.productos.map(p => ({
            id: p.id,
            nombre: p.nombre,
            precio: p.precio,
            stock: p.stock,
            categoria: p.categoria,
            promocion: p.promocion + "%"
        })));
    }

    listarProductosPublico() {

        console.log("\nPRODUCTOS DISPONIBLES\n");

        if (!this.productos.length)
            return console.log("No hay productos\n");

        console.table(this.productos.map(p => ({
            id: p.id,
            nombre: p.nombre,
            precio: p.precio,
            oferta: p.promocion > 0
                ? `${p.promocion}% descuento: $${p.precioConDescuento().toFixed(2)}`
                : "Sin promoción"
        })));
    }

    editarProducto(id, nombre, precio, stock, categoria, promocion) {

        const p = this.productos.find(p => p.id === id);

        if (!p) {
            console.log("\nProducto no encontrado\n");
            return false;
        }

        Object.assign(p, {
            nombre,
            precio,
            stock,
            categoria,
            promocion
        });

        this.agregarCategoria(categoria);

        console.log("\nProducto actualizado\n");

        return true;
    }

    eliminarProducto(id) {

        const i = this.productos.findIndex(p => p.id === id);

        if (i === -1) {
            console.log("\nProducto no encontrado\n");
            return false;
        }

        this.productos.splice(i, 1);

        console.log("\nProducto eliminado\n");

        return true;
    }

    buscarMasBaratos() {
        return this.productos.filter(p => p.precio < 40);
    }

    buscarMasCaros() {
        return this.productos.filter(p => p.precio > 40);
    }

    buscarPorCategoria(categoria) {
        return this.productos.filter(
            p => p.categoria.toLowerCase() === categoria.toLowerCase()
        );
    }

    buscarBebidas() {
        return this.buscarPorCategoria("bebida");
    }

    buscarPostres() {
        return this.buscarPorCategoria("postre");
    }

    listarCategorias() {
        console.log("\nCategorias:", this.categorias.join(", "));
    }
}

export function uiMostrarBusqueda(resultados, titulo) {

    console.log(`\n${titulo}\n`);

    if (!resultados.length)
        return console.log("No se encontraron productos\n");

    console.table(resultados.map(p => ({
        id: p.id,
        nombre: p.nombre,
        precio: p.precio,
        categoria: p.categoria,
        promocion: p.promocion + "%"
    })));
}

export function uiAgregarProductoCocina(rl, cocina, callbackMenu) {

    rl.question("Nombre: ", nombre => {
        rl.question("Precio: ", precio => {
            rl.question("Stock: ", stock => {

                cocina.listarCategorias();

                rl.question("Categoria: ", categoria => {
                    rl.question("Promocion: ", promocion => {

                        cocina.agregarProducto(
                            nombre,
                            Number(precio),
                            Number(stock),
                            categoria,
                            Number(promocion)
                        );

                        callbackMenu();
                    });
                });
            });
        });
    });
}

export function uiEditarProductoCocina(rl, cocina, callbackMenu) {

    rl.question("ID del producto: ", id => {

        const p = cocina.productos.find(
            p => p.id === Number(id)
        );

        if (!p) {
            console.log("\nProducto no encontrado\n");
            return callbackMenu();
        }

        rl.question(`Nombre (${p.nombre}): `, nombre => {
            rl.question(`Precio (${p.precio}): `, precio => {
                rl.question(`Stock (${p.stock}): `, stock => {

                    cocina.listarCategorias();

                    rl.question(`Categoria (${p.categoria}): `, categoria => {
                        rl.question(`Promocion (${p.promocion}): `, promocion => {

                            cocina.editarProducto(
                                Number(id),
                                nombre || p.nombre,
                                Number(precio) || p.precio,
                                Number(stock) || p.stock,
                                categoria || p.categoria,
                                Number(promocion) || p.promocion
                            );

                            callbackMenu();
                        });
                    });
                });
            });
        });
    });
}

export function uiEliminarProductoCocina(rl, cocina, callbackMenu) {

    rl.question("ID del producto: ", id => {

        cocina.eliminarProducto(Number(id));

        callbackMenu();
    });
}

export function uiCambiarEstadoPedido(rl, cocina, callbackMenu) {

    cocina.listarPedidos();

    rl.question("ID del pedido: ", async idPedido => {

        console.log(`
1. Preparando
2. Falta de ingredientes
3. Error de cocina
4. Listo
`);

        rl.question("Seleccione una opcion: ", async op => {

            const estados = {
                1: "Preparando",
                2: "Falta de ingredientes",
                3: "Error de cocina",
                4: "Listo"
            };

            if (!estados[op]) {
                console.log("\nOpcion invalida\n");
                return callbackMenu();
            }

            await cocina.cambiarEstadoPedido(
                Number(idPedido),
                estados[op]
            );

            callbackMenu();
        });
    });
}