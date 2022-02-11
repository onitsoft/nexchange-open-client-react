const removePostponedOrder = () => {
    sessionStorage.removeItem('postponedOrderData')
}

const popPostponedOrder = () => {
    const postponedOrderData = JSON.parse(sessionStorage.getItem('postponedOrderData'))
    sessionStorage.removeItem('postponedOrderData')
    return postponedOrderData
}

const savePostponedOrder = orderData => {
    sessionStorage.setItem('postponedOrderData', JSON.stringify(orderData))
}

const getPostponedOrder = () => JSON.parse(sessionStorage.getItem('postponedOrderData'))

const checkIfHasPostponedOrder = () => Boolean(sessionStorage.getItem('postponedOrderData'))

export {
    savePostponedOrder,
    checkIfHasPostponedOrder,
    getPostponedOrder,
    popPostponedOrder,
    removePostponedOrder,
}
