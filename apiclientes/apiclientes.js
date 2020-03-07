export default (APP, restaurantes, pedidosPorConfir) => {

    let seleccionados = [];
    



    APP.get('zonas/:zona', (req, resp) => {

        let array = [];
        let restaurant;
        for (let i = 0; i < restaurantes.length; i++) {
            if (req.params.zona == "norte") {
                if (restaurantes[i].zona === "norte") {
                    restaurant = {
                        "restaurant": restaurantes[i].nombre
                    }
                    array.push(restaurant)
                }
            }
            if (req.params.zona == "sur") {
                if (restaurantes[i].zona === "sur") {
                    restaurant = {
                        "restaurant": restaurantes[i].nombre
                    }
                    array.push(restaurant)
                }
            }
            if (req.params.zona == "este") {
                if (restaurantes[i].zona === "este") {
                    restaurant = {
                        "restaurant": restaurantes[i].nombre
                    }
                    array.push(restaurant)
                }
            }
            if (req.params.zona == "centro") {
                if (restaurantes[i].zona === "centro") {
                    restaurant = {
                        "restaurant": restaurantes[i].nombre
                    }
                    array.push(restaurant)
                }
            }
        }

        resp.send(array)
    })

    APP.get('/platillos/:id', (req, res) => {
        let platillo = restaurantes.filter(rest => rest.id == req.params.id)
        res.send(platillo[0].platillos)
    })


    //:id es el id del restaurant
    //Cada uno de los arrays de pedido realizara un push de un objeto el cual es el platillo seleccionado, las condiciones if son para  ir generando un array de pedidos de acuerdo al restaurant que pertenezca el platillo sleccionado  
    //Es necesario confirmar para tener pedidos en los restaurantes con el metodo de abajo
    APP.post('/Seleccionar/:id/:idplatillo', (req, res) => {
        let platillo = restaurantes.filter(rest => rest.id == req.params.id);
        let platilloSeleccionado = platillo[0].platillos.filter(selected => selected.id == req.params.idplatillo)
        seleccionados.push(platilloSeleccionado[0])

        for (let i = 0; i < pedidosPorConfir.length; i++) {
            if (req.params.id == i + 1) {
                pedidosPorConfir[i].pedidos.push(platilloSeleccionado[0])
            }
            console.log(pedidosPorConfir[i].pedidos);
        }
        
        res.json({
            status: 'platillo seleccionado',
            result: platilloSeleccionado,
            platillosSelectos: seleccionados
        })
    })

    APP.post('/borrar/:nombre', (req, res) => {

      
        var x = seleccionados.findIndex(i => i.nombre == req.params.nombre);
        seleccionados.splice(x, 1)
        res.json({
            status: 'borrado',
            result: seleccionados
        })

    })

    APP.get('/pedido', (req, res) => {
        res.send(seleccionados)
    })

    // vaciara todos los pedidos por confirmar
    APP.post('/cancelar', (req, res) => {
        seleccionados.splice(0, seleccionados.length)
       
        for (let i = 0; i < pedidosPorConfir.length; i++) {
            pedidosPorConfir[i].pedidos.splice(0, pedidosPorConfir[i].pedidos.length)
        }
        res.json({
            status: 'cancelado',
            result: seleccionados
        })
    })

    //Se iguala por medio del for pedidosporconfimar a los pedidos de cada restaurante
    //Es necesario confirmar para tener pedidos en los restaurantes
    APP.post('/confirmar', (req, res) => {
        
        for(let i=0;i<restaurantes.length;i++){
            restaurantes[i].pedidos =  pedidosPorConfir[i].pedidos
        }

        for (let i = 0; i < restaurantes.length; i++) {
                console.log(restaurantes[i].pedidos, 'prueba');
        }
        
         res.json({
             status: 'Pedidos confirmados',
             Pedidos: pedidosPorConfir
         })

    })




}