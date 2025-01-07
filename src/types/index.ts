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

export interface Kpi {
    stock_value: number
    change_stock_value: number
    stock_rotation: number
    change_stock_rotation: number
    unsold_items: number
    change_unsold_items: number
    monthly_flow_rate: number | null
    change_monthly_flow_rate: number | null
}

export interface ListProductSelection {
    value: string
    label: string
}

export interface StockEvolution {
    labels: string[]
    datasets: any[]
}

export interface StockMovement {
    product : {
        id: string
        name: string
        unique_code: string
    },
    type: 'IN' | 'OUT'
    reason: string
    expiration_date: string
    quantity: number
}
