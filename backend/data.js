import bcrypt from 'bcryptjs';


const data = {
    users: [
        {
            name: 'admin',
            email: 'admin@example.com',
            password: bcrypt.hashSync('admin'),
            isAdmin: true,
        },
        {
            name: 'user',
            email: 'user@example.com',
            password: bcrypt.hashSync('user'),
            isAdmin: false,
        },
    ],
    products: [
        {
            // _id: '1',
            name: 'Nike Slim Shirt',
            slug: 'nike-slim-shirt',
            category: 'Shirts',
            image: '/images/p1.jpg',
            countInStock: 0,
            price: 120,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality shirt',
        },
        {
            // _id: '2',
            name: 'Adidas Fit Shirt',
            slug: 'adidas-fit-shirt',
            category: 'Shirts',
            image: '/images/p2.jpg',
            countInStock: 20,
            price: 250,
            brand: 'Adidas',
            rating: 4.0,
            numReviews: 10,
            description: 'High quality product',
        },
        {
            // _id: '3',
            name: 'Nike Slim Pants',
            slug: 'nike-slim-pants',
            category: 'Pants',
            image: '/images/p3.jpg',
            countInStock: 15,
            price: 25,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 14,
            description: 'High quality product',
        },
        {
            // _id: '4',
            name: 'Adidas Fit Pants',
            slug: 'adidas-fit-pants',
            category: 'Pants',
            image: '/images/p4.jpg',
            countInStock: 5,
            price: 65,
            brand: 'Puma',
            rating: 4.5,
            numReviews: 14,
            description: 'High quality product',
        },
    ],
};

export default data;