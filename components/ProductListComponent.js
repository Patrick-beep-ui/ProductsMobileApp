import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import ScreenLayout from '../layout/ScreenLayout';
import ProductListBoxComponent from './ProductListBoxComponent';
import { useNetwork } from '../context/NetworkContext';
import { useConnection } from '../context/ConnectionContext';

const ProductListComponent = () => {
    const [products, setProducts] = useState([]);
    const [offlineMessage, setOfflineMessage] = useState("");
    const { isConnected } = useNetwork();
    const db = useConnection();

    // Store data in SQLite database (Insert or Replace to prevent duplicates)
    const storeData = useCallback(async (data) => {
        if (!db || !data || data.length === 0) return;

        try {
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY,
                    title TEXT,
                    price REAL,
                    description TEXT,
                    category TEXT,
                    image TEXT,
                    rating_rate REAL,
                    rating_count INTEGER
                )
            `);

            for (const product of data) {
                await db.runAsync(
                    `INSERT OR REPLACE INTO products (id, title, price, description, category, image, rating_rate, rating_count)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        product.id,
                        product.title,
                        product.price,
                        product.description,
                        product.category,
                        product.image,
                        product.rating.rate,
                        product.rating.count
                    ]
                );
            }
        } catch (e) {
            console.error("Error storing data:", e);
        }
    }, [db]);

    // Fetch products from SQLite database when offline
    const fetchCachedData = useCallback(async () => {
        if (!db) return;

        try {
            const result = await db.getAllAsync(`SELECT * FROM products`);
            if (result.length > 0) {
                setProducts(result);
                setOfflineMessage("⚠ No internet connection – showing cached data");
            }
        } catch (error) {
            console.error("Error fetching cached data:", error);
        }
    }, [db]);

    // Fetch products from API when online
    const fetchProducts = useCallback(async () => {
        if (isConnected) {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);
                await storeData(data); 
                setOfflineMessage("");
            } catch (e) {
                console.error(e);
            }
        } else {
            await fetchCachedData(); // If offline, load cached data
        }
    }, [isConnected, storeData, fetchCachedData]);

    useEffect(() => {
        fetchProducts();
    }, [isConnected, db]);

    return (
        <ScreenLayout>
            <View style={styles.productsContainer}>
                {offlineMessage ? (
                    <Text style={styles.warningText}>{offlineMessage}</Text>
                ) : null}
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <ProductListBoxComponent product={item} />
                    )}
                />
            </View>
        </ScreenLayout>
    );
};

export default ProductListComponent;

const styles = StyleSheet.create({
    productsContainer: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 10,
    },
    warningText: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
});
