export function orderByQuantity(a,b){
    if(a.quantidade > b.quantidade){
        return -1;
    }
    if(a.quantidade < b.quantidade){
        return 1;
    }
    return 0;
}