export interface Product {
    id: string
    name: string
    category: string
    supplier: string
    quantity: number
    minQuantity: number
    price: number
    leadTime: number // délai de livraison en jours
}

export interface StockAlert {
    id: string
    productId: string
    message: string
    createdAt: Date
}

export interface SalesData {
    date: Date
    productId: string
    quantity: number
    revenue: number
}

export interface StockPrediction {
    productId: string
    predictedDemand: number
    suggestedOrder: number
    optimalOrderDate: Date
    confidence: number
}
