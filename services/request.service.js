import RequestRepository from "../repositories/request.repository.js"

async function createRequest(request) {
    return await RequestRepository.insertRequest(request);

}

// async function getAccounts() {
//     return await AccountRepository.getAccounts();
// }

async function getRequest(requestId) {
    return await RequestRepository.getRequest(requestId);
}

async function getRequestByClient(client) {
    return await RequestRepository.getRequestByClient(client);
}

async function getRequestByProduct(product) {
    return await RequestRepository.getRequestByProduct(product);
}

async function getMostSelledProduct() {
    return await RequestRepository.getMostSelledProduct();
}


async function deleteRequest(requestId) {
    return await RequestRepository.deleteRequest(requestId);
}

async function updateRequest(request) {
    return await RequestRepository.updateRequest(request);
}

async function updateDelivered(request) {
    const req = await RequestRepository.getRequest(request.id);
    req.entregue = request.entregue;
    return await RequestRepository.updateRequest(req);
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