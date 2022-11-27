import { Ratings } from "@prisma/client";

export const serializeProductsArray = (products, userId: number) => {
    products = JSON.stringify(products);
    products = JSON.parse(products);
    let newProducts = [];
    if (products.length !== 0) {
        products.forEach(element => {
            let totalRating = 0;
            let {
                rating,
                ...others
            } = element;
            if (rating.length === 0) {
                others['myRating'] = 0;
                others['avgRating'] = 0;
            } else {
                rating.forEach((r:Ratings) => {
                    let avgRating;
                    totalRating += r.givenRating;
                    avgRating = totalRating / rating.length;
                    others['avgRating'] = avgRating;

                    if (userId === r.userId) {
                        others['myRating'] = r.givenRating;

                    }
                    if (!others.hasOwnProperty('myRating')) {
                        others['myRating'] = 0;
                    }
                });
            }
            newProducts.push(others);
        });
    }
    return newProducts;
}

export const serializeProduct = (product, userId: number) => {
    product = JSON.stringify(product);
    product = JSON.parse(product);

    let newProduct = {};
    if (Object.keys(product).length !== 0) {
        let totalRating = 0;
        let {
            rating,
            ...others
        } = product;
        if (rating.length === 0) {
            others['myRating'] = 0;
            others['avgRating'] = 0;
        } else {
            rating.forEach((r: Ratings) => {
                let avgRating;
                totalRating += r.givenRating;
                avgRating = totalRating / rating.length;
                others['avgRating'] = avgRating;

                if (userId === r.userId) {
                    others['myRating'] = r.givenRating;

                }
                if (!others.hasOwnProperty('myRating')) {
                    others['myRating'] = 0;
                }
            });
        }
        newProduct = others;

    }
    return newProduct;
}

// const products = [{
//         id: '001',
//         name: 'Product 1',
//         ratings: [{
//             userId: '1',
//             userRating: 3,
//         }, {
//             userId: '2',
//             userRating: 5,
//         }, {
//             userId: '3',
//             userRating: 4,
//         }, ]

//     }, {
//         id: '002',
//         name: 'Product 2',
//         ratings: [{
//             userId: '3',
//             userRating: 2,
//         }, {
//             userId: '4',
//             userRating: 1,
//         }, {
//             userId: '2',
//             userRating: 2,
//         }, ]

//     }, {
//         id: '003',
//         name: 'Product 3',
//         ratings: [{
//             userId: '3',
//             userRating: 1,
//         }, {
//             userId: '2',
//             userRating: 3,
//         }, {
//             userId: '5',
//             userRating: 4,
//         }, ],

//     },
//     {
//         id: '004',
//         name: 'Product 4',
//         ratings: []

//     },
// ];
// let userId = '6';
// let newProduct = [];

// const newP = serializeProduct({
//             id: '002',
//             name: 'Product 2',
//             ratings: [{
//                 userId: '3',
//                 userRating: 2,
//             }, {
//                 userId: '4',
//                 userRating: 1,
//             }, {
//                 userId: '2',
//                 userRating: 2,
//             }, ]

//         }, '2');
// console.log(newP);