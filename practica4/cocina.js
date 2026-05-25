export class Producto {
    constructor(id, nombre, precio, stock, categoria, promocion = 0) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
        this.promocion = promocion;
    }

    precioConDescuento() {
        if (this.promocion > 0) {
            return this.precio * (1 - this.promocion / 100);
        }
        return this.precio;
    }
}

export class Cocina {
    constructor() {
        this.productos = [
            new Producto(1, "Cafe", 30, 100, "bebida", 0),
            new Producto(2, "Conchas", 15, 50, "postre", 10),
            new Producto(3, "Te", 25, 80, "bebida", 0),
            new Producto(4, "Fresas", 40, 30, "postre", 5),
            new Producto(5, "Hotcakes", 50, 40, "desayuno", 0)
        ];
        this.idActual = 6;
        this.categorias = ["bebida", "postre", "desayuno"];
        
        // Nuevo: Estado de error controlado por el usuario
        this.estadoErrorActual = "ninguno"; 
    }

    // --- METODOS EXISTENTES ---

    agregarCategoria(categoria) {
        if (!this.categorias.includes(categoria)) {
            this.categorias.push(categoria);
        }
    }

    agregarProducto(nombre, precio, stock, categoria, promocion = 0) {
        this.agregarCategoria(categoria);
        const nuevoProducto = new Producto(
            this.idActual++,
            nombre,
            precio,
            stock,
            categoria,
            promocion
        );
        this.productos.push(nuevoProducto);
        console.log("\nProducto agregado correctamente\n");
    }

    listarProductos() {
        console.log("\nLISTA DE PRODUCTOS (Administrador)\n");
        if (this.productos.length === 0) {
            console.log("No hay productos registrados\n");
        } else {
            const tabla = this.productos.map(p => ({
                id: p.id,
                nombre: p.nombre,
                precio: p.precio,
                stock: p.stock,
                categoria: p.categoria,
                promocion: p.promocion + "%"
            }));
            console.table(tabla);
        }
    }

    listarProductosPublico() {
        console.log("\nPRODUCTOS DISPONIBLES\n");
        if (this.productos.length === 0) {
            console.log("No hay productos registrados\n");
        } else {
            const productosPublico = this.productos.map(p => ({
                id: p.id,
                nombre: p.nombre,
                precio: p.precio,
                oferta: p.promocion > 0 ? `${p.promocion}% descuento: $${p.precioConDescuento().toFixed(2)}` : "Sin promoción"
            }));
            console.table(productosPublico);
        }
    }

    editarProducto(id, nombre, precio, stock, categoria, promocion) {
        const producto = this.productos.find(p => p.id === id);
        if (!producto) {
            console.log("\nProducto no encontrado\n");
            return false;
        }
        producto.nombre = nombre;
        producto.precio = precio;
        producto.stock = stock;
        producto.categoria = categoria;
        producto.promocion = promocion;
        this.agregarCategoria(categoria);
        console.log("\nProducto actualizado correctamente\n");
        return true;
    }

    eliminarProducto(id) {
        const indice = this.productos.findIndex(p => p.id === id);
        if (indice === -1) {
            console.log("\nProducto no encontrado\n");
            return false;
        }
        this.productos.splice(indice, 1);
        console.log("\nProducto eliminado correctamente\n");
        return true;
    }

    buscarMasBaratos() { return this.productos.filter(p => p.precio < 40); }
    buscarMasCaros() { return this.productos.filter(p => p.precio > 40); }
    buscarPorCategoria(categoria) { return this.productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase()); }
    buscarBebidas() { return this.buscarPorCategoria("bebida"); }
    buscarPostres() { return this.buscarPorCategoria("postre"); }
    
    listarCategorias() {
        console.log("\nCategorias disponibles:", this.categorias.join(", "));
    }

    // --- NUEVOS METODOS DE ESTADOS Y PREPARACION ---

    cambiarEstadoError(nuevoEstado) {
        this.estadoErrorActual = nuevoEstado;
        console.log(`\n[SISTEMA] El estado de la cocina ha cambiado a: ${nuevoEstado.toUpperCase()}\n`);
    }

    simularPreparacion(nombreProducto) {
        return new Promise((resolve, reject) => {
            // Simulamos un tiempo de espera de 2 segundos
            setTimeout(() => {
                switch (this.estadoErrorActual) {
                    case "preparar_cafe":
                        reject("Error al preparar cafe: La maquina se atasco o hubo un derrame.");
                        break;
                    case "error_cocina":
                        reject("Error de cocina: Falla electrica en el equipo o accidente en parrilla.");
                        break;
                    case "falta_ingredientes":
                        reject("Falta de ingredientes: Nos quedamos sin insumos para este producto.");
                        break;
                    case "ninguno":
                    default:
                        resolve(`El producto ${nombreProducto} fue preparado con exito y esta listo para entregar.`);
                        break;
                }
            }, 2000); 
        });
    }

    async prepararPedido(id) {
        const producto = this.productos.find(p => p.id === id);
        if (!producto) {
            console.log("\nProducto no encontrado\n");
            return false;
        }

        if (producto.stock <= 0) {
            console.log(`\nNo hay stock disponible para ${producto.nombre}.\n`);
            return false;
        }

        console.log(`\nEnviando orden a la cocina: Preparando ${producto.nombre}... por favor espera.`);
        
        try {
            // Usamos await para pausar la ejecucion hasta que la promesa se resuelva o rechace
            const mensajeExito = await this.simularPreparacion(producto.nombre);
            
            producto.stock--;
            console.log(`\nEXITO: ${mensajeExito}`);
            console.log(`Stock restante de ${producto.nombre}: ${producto.stock}\n`);
            return true;
        } catch (error) {
            console.log(`\nFALLO EN LA ORDEN: ${error}`);
            console.log(`Motivo del rechazo: La cocina se encuentra en estado '${this.estadoErrorActual}'.\n`);
            return false;
        }
    }
}

// --- INTERFAZ DE CONSOLA PARA COCINA ---
export function uiMostrarBusqueda(resultados, titulo) {
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

export function uiAgregarProductoCocina(rl, cocina, callbackMenu) {
    rl.question("Nombre: ", nombre => {
        rl.question("Precio: ", precio => {
            rl.question("Stock: ", stock => {
                cocina.listarCategorias();
                rl.question("Categoria (o nueva): ", categoria => {
                    rl.question("Promocion (% descuento, 0 si no): ", promocion => {
                        cocina.agregarProducto(nombre, Number(precio), Number(stock), categoria, Number(promocion));
                        callbackMenu();
                    });
                });
            });
        });
    });
}

export function uiEditarProductoCocina(rl, cocina, callbackMenu) {
    rl.question("ID del producto: ", id => {
        const producto = cocina.productos.find(p => p.id === Number(id));
        if (!producto) {
            console.log("\nProducto no encontrado\n");
            return callbackMenu();
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

// --- NUEVAS FUNCIONES DE INTERFAZ PARA ESTADOS Y PEDIDOS ---

export function uiCambiarEstadoCocina(rl, cocina, callbackMenu) {
    console.log("\n--- CONFIGURACION DE ESTADO DE COCINA ---");
    console.log("1. Funcionamiento Normal (Ningun error)");
    console.log("2. Simular Error: Preparar Cafe");
    console.log("3. Simular Error: Cocina");
    console.log("4. Simular Error: Falta de Ingredientes");
    
    rl.question("Selecciona el nuevo estado (1-4): ", opcion => {
        switch (opcion) {
            case "1":
                cocina.cambiarEstadoError("ninguno");
                break;
            case "2":
                cocina.cambiarEstadoError("preparar_cafe");
                break;
            case "3":
                cocina.cambiarEstadoError("error_cocina");
                break;
            case "4":
                cocina.cambiarEstadoError("falta_ingredientes");
                break;
            default:
                console.log("\nOpcion no valida. El estado se mantiene sin cambios.\n");
                break;
        }
        callbackMenu();
    });
}

export function uiPrepararPedidoCocina(rl, cocina, callbackMenu) {
    rl.question("ID del producto a preparar: ", async id => {
        // El await pausa la ejecucion hasta que la promesa del pedido finalice
        await cocina.prepararPedido(Number(id));
        callbackMenu();
    });
}