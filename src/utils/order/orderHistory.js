import { parseCookies } from 'nookies'

const mapToOrderHistoryDto = (createdOrderData, username) => {
    const { referralToken = '' } = parseCookies()

    const {
        token: anonymousAuthToken,
        unique_reference: orderId,
        amount_quote,
        amount_base,
        pair,
        created_on,
        referral_code,
    } = createdOrderData

    const mappedOrderDto = {
        userData: {
            username,
        },
        id: orderId,
        quote: pair.quote.code,
        base: pair.base.code,
        amount_quote: parseFloat(amount_quote),
        amount_base: parseFloat(amount_base),
        withdraw_address: '',
        created_on,
        statusName: '',
        userRefCode: referral_code?.[0]?.code,
        referralToken,
    }

    return { mappedOrderDto, anonymousAuthToken, orderId }
}

const saveOrderHistory = orderHistory => {
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory))
}

const saveCreatedOrderInStorage = mappedOrderDto => {
    // Comment: look for order history array on localStorage (if not present create an empty array)
    // and add the order details to top of array
    const orderHistory = localStorage.orderHistory ? JSON.parse(localStorage.orderHistory) : []

    orderHistory.push(mappedOrderDto)
    saveOrderHistory(orderHistory)
}

const getOrderHistory = () => {
    try {
        return JSON.parse(window.localStorage.orderHistory ?? '[]')
    } catch {
        console.error('Failed to parse orderHistory')
        return []
    }
}

const getOrderIndexOfOrderHistory = (orderId, orderHistory = null) => {
    const orderHistoryInternal = orderHistory || getOrderHistory()
    return orderHistoryInternal.findIndex(e => e.id === orderId)
}

export {
    mapToOrderHistoryDto,
    saveOrderHistory,
    saveCreatedOrderInStorage,
    getOrderHistory,
    getOrderIndexOfOrderHistory,
}
