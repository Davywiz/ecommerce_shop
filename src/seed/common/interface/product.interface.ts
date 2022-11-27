export interface ProductInterface {
    id: number;
    name: string;
    price: number;
    quantity: number;
    description: string;
    images: string[];
    categoryId: number;
}



export const products: ProductInterface[] = [
    {
        id: 1,
        categoryId: 1,
        name: 'Tin Tomatoes',
        quantity: 18,
        description: 'Really fresh stuff',
        price: 1200,
        images: [
            '11',
            '22'
        ]
    },
    {
        id: 2,
        categoryId: 2,
        name: 'PS3 Pad',
        quantity: 14,
        description: 'Quality pad for gaming',
        price: 2500,
        images: [
            '11',
            '22'
        ]
    },
    {
        id: 3,
        categoryId: 3,
        name: 'Floral Gown',
        quantity: 18,
        description: 'Really nice outfit',
        price: 6000,
        images: [
            '11',
            '22'
        ]
    },
    {
        id: 4,
        categoryId: 4,
        name: 'HP EliteBook 8470p',
        quantity: 18,
        description: 'Nice PC',
        price: 65000,
        images: [
            '11',
            '22'
        ]
    },
    {
        id: 5,
        categoryId: 4,
        name: 'MacBook Pro 2021',
        quantity: 13,
        description: 'Really Nice PC',
        price: 550000,
        images: [
            '11',
            '22'
        ]
    }
]