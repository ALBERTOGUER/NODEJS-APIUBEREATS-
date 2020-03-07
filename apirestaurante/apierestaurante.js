import {
    v4 as uuidv4
} from 'uuid'

export default (REST, restaurantes, pedidosRepartidor, totalRestaurante, totalRepartidor) => {
    //ver pedidos por restaurant de acuerdo al :id en (restaurantes.js) del restaurant que se desea ver 
    REST.get('/:id', (req, res) => {
        let restaurant = restaurantes.find(p => p.id == req.params.id)

        if (restaurant.pedidos.length > 0) {
            res.json({
                status: 'Pedidos',
                Pedidos: restaurant.pedidos
            })
        } else {
            res.json({
                status: 'No hay pedidos',

            })
        }

    })
    //Rechazar pedidos indicando el id del restaurant al que se desea rechazar
    REST.delete('/rechazar/:id', (req, res) => {
        let restaurant = restaurantes.find(p => p.id == req.params.id)
        if (restaurant.pedidos.length > 0) {
            restaurant.pedidos.splice(0, restaurant.pedidos.length);
            res.json({
                status: 'Pedidos rechazados'
            })
        } else {
            res.json({
                status: 'No había pedidos'
            })
        }
    })
    //Del array pedidos se envia a arrayaceptados donde es necesario indicar el id del restaurant que desea aceptar el pedido 
    REST.get('/aceptar/:id', (req, res) => {
        
        let restaurant = restaurantes.find(p => p.id == req.params.id);
        if (restaurant.pedidos.length > 0) {
            restaurant.pedidosAceptados = restaurant.pedidos
            console.log(restaurant.pedidosAceptados);

            res.json({
                status: 'Pedido confirmado',
                pedidos: restaurant.pedidosAceptados
            })
        } else {
            res.json({
                status: 'No había pedidos'
            })
        }
    })

    REST.get('/terminar/:id/:transporte', (req, res) => {
        let restaurant = restaurantes.find(p => p.id == req.params.id);
        let uuid = uuidv4();
        let precioporcentaje = 0;
        if (restaurant.pedidosAceptados.length > 0) {
            let pedidoObj = {
                "idpedido": uuid,
                "idRestaurante": req.params.id,
                "pedido": restaurant.pedidosAceptados
            }
            pedidosRepartidor.push(pedidoObj);

            /*  console.log(pedidosRepartidor[0].pedido[]); */
            let valor = ""
            for (let i = 0; i < pedidosRepartidor.length; i++) {

                for (let j = 0; j < pedidosRepartidor[i].pedido.length; j++) {
                    if (req.params.transporte == 'bici') {
                        precioporcentaje = Number(pedidosRepartidor[i].pedido[j].precio) * .65
                        valor = 'El transporte generara una comision del 35%'
                    } else if (req.params.transporte == 'moto') {
                        precioporcentaje = Number(pedidosRepartidor[i].pedido[j].precio) * .7
                        valor = 'El transporte generara una comision del 30%'
                    } else if (req.params.transporte == 'auto') {
                        precioporcentaje = Number(pedidosRepartidor[i].pedido[j].precio) * .75
                        valor = 'El transporte generara una comision del 25%'
                    } else {
                        valor = 'Ingrese tranporte correcto'
                    }

                    totalRestaurante = totalRestaurante + precioporcentaje
                }

            }
            console.log(totalRestaurante);
            res.json({
                status: 'Pedido terminado y enviado al repartidor',
                pedido: pedidosRepartidor,
                total: totalRestaurante,
                msg: valor

            })


        } else {
            res.json({
                status: 'No había pedidos confirmados'
            })
        }
    })

    //Agregar nuevo platillo enviando body con nombre y precio desde postman y indicando el id del restaruran al que  se quiere agregar el platillo
    REST.post('/newPlatillo/:id', (req, res) => {
        let uuid = uuidv4();
        let restaurant = restaurantes.find(p => p.id == req.params.id);
        if (req.body.nombre && req.body.precio) {
            let platilloObj = {
                "id": uuid,
                ...req.body
            }
            restaurant.platillos.push(platilloObj);
            res.json({
                status: `Nuevo platillo ingresado a restaurant '${restaurant.nombre}'`,
                platillos: restaurant.platillos
            })
        } else {
            res.json({
                status: 'Es necasrio introducir campos nombre y precio'
            })
        }
    })
    //:id restaurant en el que se modificara el platillo idplatillo que se modificara
    REST.delete('/borrarPlatillo/:id/:idplatillo', (req, res) => {
        let restaurant = restaurantes.find(p => p.id == req.params.id);



        if (restaurant) {
            for (let i = 0; i < restaurant.platillos.length; i++) {
                if (restaurant.platillos[i].id == req.params.idplatillo) {
                    restaurant.platillos.splice(i, 1);
                }
            }

            res.json({
                status: 'ok',
                result: restaurant.platillos
            })

        } else {
            //  res.json({status:'not_found',msg:'product not found'})
            res.sendStatus(404)
        }
    })
    //:id restaurant en el que se modificara el platillo idplatillo que se modificara
    REST.put('/modificar/:id/:idplatillo', (req, res) => {
        let restaurant = restaurantes.find(p => p.id == req.params.id);
        if (req.body.nombre && req.body.precio) {
            let obj = {
                "id": req.params.idplatillo,
                ...req.body
            }

            for (let i = 0; i < restaurant.platillos.length; i++) {
                if (restaurant.platillos[i].id == req.params.idplatillo) {
                    restaurant.platillos.splice(i, 1, obj);
                }
            }

            res.json({
                status: 'ok',
                result: restaurant.platillos
            })

        } else {
            res.json({
                status: 'not_found',
                msg: 'Es necesario ingresar todos el nombre y el precio del platillonomnombre'
            })

        }
    })

    REST.get('/total/:transporte', (req, res) => {

        totalRestaurante = totalRestaurante * .7
        res.json({
            status: 'ok',
            Totalventa: totalRestaurante
        })

    })



}