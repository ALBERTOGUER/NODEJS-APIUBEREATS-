import restaurantes from './restaurantes'

module.exports = (APP) => {

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

    APP.get('/platillos/:id', (req, res) => {
        let platillo = restaurantes.filter(rest => rest.id == req.params.id)
        res.send(platillo[0].platillos)
    })

    APP.post('/Seleccionar/:id/:idplatillo', (req, res) => {
        let platillo = restaurantes.filter(rest => rest.id == req.params.id);
        let platilloSeleccionado = platillo[0].platillos.filter(selected => selected.id == req.params.idplatillo)
        seleccionados.push(platilloSeleccionado[0])
        console.log(seleccionados);
        res.json({ status: 'platillo seleccionado', result: platilloSeleccionado, platillosSelectos: seleccionados})
      
    })

    APP.post('/borrar/:nombre', (req, res) => {
        
        /* seleccionados.map(function(e) { return e.nombre; }).indexOf(req.params.nombre); */
        var x = seleccionados.findIndex(i => i.nombre == req.params.nombre);
        seleccionados.splice(x,1)
        res.json({ status: 'borrado', result: seleccionados})
        
    })

    APP.get('/pedido', (req, res) => {
        res.send(seleccionados)
    })

    APP.post('/cancelar', (req,res)=>{
        seleccionados.splice(0, seleccionados.length)
        res.json({ status: 'cancelado', result: seleccionados})
    })

    APP.post('/confirmar', (req,res)=>{
        let totalprecio = 0;
        for( let i = 0; i <seleccionados.length; i++){
           totalprecio = totalprecio + seleccionados[i].precio
        }
        
        res.json({ status: 'Comprar realizada', result: seleccionados, total:totalprecio})
    })




}