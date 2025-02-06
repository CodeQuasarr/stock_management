export interface Product {
    id?: number
    name: string
    unique_code: string
    therapeutic_category: string
    description: string
    purchase_price?: number
    sale_price: number
    manufacturer: string
    stock_quantity: number
    expiration_date?: string
}

export interface ProductUpdated {
    movement_type?: string
    movement_reason?: string
    movement_quantity?: number
    expiration_date?: string
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
    type: 'in' | 'out'
    reason: string
    expiration_date: string
    quantity: number
}


export interface StockState {
    stock_movements: StockMovement[];
    products: Product[];
    product: Product;
    product_id: number;
    loading: boolean;
    error: string | null;
    success: string | null;
}
