
import RequestService from "../services/request.service.js";

async function createRequest(req, res, next) {
    try {
        console.log("Chegou na request")
        let request = req.body;

        if (!request.cliente || !request.produto || !request.valor) {
            throw new Error("Cliente, Produto e Valor são obrigatórios.")
        }

        request = await RequestService.createRequest(request);

        res.send(request);
    } catch (error) {
        next(error)
    }
}



// async function getAccounts(req, res, next) {
//     try {
//         res.send(await RequestService.getAccounts());
//         logger.info(`GET /account`)

//     } catch (error) {
//         next(error)
//     }
// }

async function getRequest(req, res, next) {
    try {
        console.log("getRequest")
        res.send(await RequestService.getRequest(req.params.id));

    } catch (error) {
        next(error)
    }
}

async function getRequestByClient(req, res, next) {
    try {
        let client = req.body.cliente; 
        if ( !client ) {
            throw new Error("Cliente é obrigatório.")
        }
        res.send(await RequestService.getRequestByClient(client));

    } catch (error) {
        next(error)
    }
}

async function getRequestByProduct(req, res, next) {
    try {
        let product = req.body.produto; 
        if ( !product ) {
            throw new Error("Produto é obrigatório.")
        }
        res.send(await RequestService.getRequestByProduct(product));

    } catch (error) {
        next(error)
    }
}

async function getMostSelledProduct(req, res, next) {
    try {        
        console.log("getMostSelledProduct")
        res.send(await RequestService.getMostSelledProduct());

    } catch (error) {
        next(error)
    }
}


async function deleteRequest(req, res, next) {
    try {
        RequestService.deleteRequest(req.params.id);

        res.end();

    } catch (error) {
        next(error)
    }
}

async function updateRequest(req, res, next) {
    try {
        console.log("updateRequest");
        const request = req.body;

        if (!request.id || !request.cliente || !request.produto || !request.valor || (request.entregue !== true && request.entregue !== false)) {
            throw new Error("Id, cliente, produto, valor, entregue são obrigatórios.")
        }
        RequestService.updateRequest(request);

        res.send(request);
    } catch (error) {
        next(error)
    }
}

// "id": 1,
//       "cliente": "Lavínia Dâmaso",
//       "produto": "Pizza Muçarela",
//       "valor": 26,
//       "entregue": true,
//       "timestamp": "2021-05-02T19:48:09.765Z"

async function updateDelivered(req, res, next) {
    try {
        const request = req.body;
        if (!request.id || (request.entregue !== true && request.entregue !== false)) {
            throw new Error("Id e entregue são obrigatórios.")
        }
        res.send(await RequestService.updateDelivered(request));

    } catch (error) {
        next(error)
    }
}



export default {
    createRequest,
    updateRequest,
    updateDelivered,
    deleteRequest,
    getRequest,
    getRequestByClient,
    getRequestByProduct,
    getMostSelledProduct
    
}