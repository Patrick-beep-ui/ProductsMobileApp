import { useConnection } from '../context/ConnectionContext';
import { useState, useEffect } from 'react';

// This is a component to test if the data was successfully stored in the sqlite database
const TestComponent = () => {
    //const [products, setProducts] = useState([])
    const db = useConnection();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const products = await db.getAllAsync("SELECT * FROM products");
                console.log(products)
            }
            catch(e) {
                console.error("Error getting products:", e);
            }
        }

        getProducts()
    }, [db])

    return(<></>)
}

export default TestComponent