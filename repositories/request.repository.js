import { promises as fs } from "fs"
import {orderByQuantity} from "../helper/helper.js"
const { readFile, writeFile } = fs;

async function getRequests() {
    const data = JSON.parse(await readFile(global.fileName));
    return data.pedidos;
}

async function getRequest(requestId) {
    const requests = await getRequests();
    const request = requests.find(request => request.id === parseInt(requestId))
    if (request) {
        return request;
    }
    throw new Error("Pedido não encontrado")
}

async function getRequestByClient(cliente) {
    const requests = await getRequests();
    const valueRequestsByClient = requests
        .filter(request => request.cliente === cliente && request.entregue === true)
        .reduce((acc, item) => {
            acc += item.valor;
            return acc;
        }, 0);
    return { "valor": valueRequestsByClient };
}

async function getRequestByProduct(produto) {
    const requests = await getRequests();
    const valueRequestsByproduto = requests
        .filter(request => request.produto === produto && request.entregue === true)
        .reduce((acc, item) => {
            acc += item.valor;
            return acc;
        }, 0);
    return { "valor": valueRequestsByproduto };
}

async function getMostSelledProduct() {
    const requests = await getRequests();
    const orderedArrayRequests = requests
        .filter(request => request.entregue === true)
        .reduce((acc, item) => {
            let index = acc.findIndex(i => i.produto === item.produto)
            if (index !== -1) {
                acc[index].quantidade++;
            } else {
                acc.push({
                    produto: item.produto,
                    quantidade: 0
                })
            }

            return acc;
        }, []).sort(orderByQuantity);

    return orderedArrayRequests;
}


async function insertRequest(request) {
    const data = JSON.parse(await readFile(global.fileName));
    request = {
        id: data.nextId,
        cliente: request.cliente,
        produto: request.produto,
        valor: request.valor,
        entregue: false,
        timestamp: new Date(),
    };
    data.nextId++;
    console.log(data);
    data.pedidos.push(request)

    await writeFile(global.fileName, JSON.stringify(data, null, 2))
    return request;
}

async function deleteRequest(requestId) {
    const data = JSON.parse(await readFile(global.fileName));
    data.pedidos = data.pedidos.filter(request => request.id !== parseInt(requestId));
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
}

async function updateRequest(request) {
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.pedidos.findIndex(
        a => a.id === parseInt(request.id))
    if (index === -1) {
        throw new Error("Request não encontrado.")
    }
    data.pedidos[index].cliente = request.cliente;
    data.pedidos[index].produto = request.produto;
    data.pedidos[index].valor = request.valor;
    data.pedidos[index].entregue = request.entregue;


    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    return data.pedidos[index];
}


export default {
    getRequests,
    getRequest,
    insertRequest,
    updateRequest,
    deleteRequest,
    getRequestByClient,
    getRequestByProduct,
    getMostSelledProduct
}