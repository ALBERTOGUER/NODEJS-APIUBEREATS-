export default (REP, pedidosRepartidor, totalRepartidor) => {
    let pedidoActual = [];
    REP.get('/', (req, res) => {
        res.json({
            status: 'ok',
            pedidos: pedidosRepartidor
        })
    })

    REP.get('/aceptar/:idpedido', (req, res) => {
        if (req.params.idpedido) {
            pedidoActual = pedidosRepartidor.find(p => p.idpedido == req.params.idpedido);
            res.json({
                status: 'ok',
                pedido_Actual: pedidoActual
            })
        }else{
            res.send({status:'Url incorrrecto'})
        }
    })

    REP.get('/rechazar', (req, res) => {
        pedidoActual = []
        res.json({
            status: 'ok',
            pedido_Actual: 'Rechazado'
        })

    })

    REP.get('/actual', (req, res) => {

        res.json({
            status: 'ok',
            pedido_Actual: pedidoActual
        })

    })
    //un tercio del porcentaje que cobra uber eats es para uber y los otros dos tercios son para el repartidor
    REP.get('/finalizar/:transporte', (req, res) => {
        /* console.log(pedidoActual.length);
        console.log(pedidoActual) */
        for (let i = 0; i < pedidoActual.pedido.length; i++) {


            if (req.params.transporte == 'bici') {
                totalRepartidor = totalRepartidor + ((Number(pedidoActual.pedido[i].precio) * .35) * .66)
            } else if (req.params.transporte == 'moto') {
                totalRepartidor = totalRepartidor + ((Number(pedidoActual.pedido[i].precio) * .30) * .66)
            } else if (req.params.transporte == 'auto') {
                totalRepartidor = totalRepartidor + ((Number(pedidoActual.pedido[i].precio) * .25) * .66)
            } else {
                let valor = 'Ingrese tranporte correcto'
            }
        }

        res.json({
            status: 'ok',
            pedido_Actual: pedidoActual,
            total: totalRepartidor
        })
        pedidoActual = []

    })

    REP.get('/total', (req, res) => {

        res.json({
            status: 'ok',
            total: totalRepartidor
        })

    })


}