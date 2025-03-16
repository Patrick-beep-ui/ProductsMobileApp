import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import {useState, useEffect, useCallback} from 'react';
import ScreenLayout from '../layout/ScreenLayout';
import { useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNetwork } from '../context/NetworkContext';

const ProductDetailsComponent = () => {
    const route = useRoute();
    const { product } = route.params;
    const { isConnected } = useNetwork();
    
    // Ensure rating is properly assigned regardless of online/offline state
    const [rating, setRating] = useState(product.rating?.rate || product.rating_rate || 0);

    useEffect(() => {
        setRating(product.rating?.rate || product.rating_rate || 0);
    }, [isConnected]);

    const displayStarRatings = useCallback(() => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        return (
            <View style={styles.starContainer}>
                {Array(fullStars).fill().map((_, i) => (
                    <FontAwesome key={`full-${i}`} name="star" size={28} color="gold" />
                ))}
                {halfStar === 1 && <FontAwesome name="star-half" size={28} color="gold" />}
                {Array(emptyStars).fill().map((_, i) => (
                    <FontAwesome key={`empty-${i}`} name="star-o" size={28} color="gold" />
                ))}
            </View>
        );
    }, [rating]);

    return (
        <ScreenLayout>
            <View style={styles.box}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.image }} style={styles.image} />
                </View>

                <View style={styles.details}>
                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.category}>{product.category}</Text>
                    <Text style={styles.price}>${product.price}</Text>
                    <View style={styles.descriptionContainer}>
                        <ScrollView>
                            <Text style={styles.description}>{product.description}</Text>
                        </ScrollView>
                    </View>
                </View>
                {displayStarRatings()}
            </View>
        </ScreenLayout>
    );
};


export default ProductDetailsComponent

const styles = StyleSheet.create({
    box: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 20,
        margin: 20,
        marginVertical: 5,
        borderRadius: 10,
        width: '90%',
        alignSelf: 'center',
        height: '90%',
        elevation: 2, // Adds a shadow effect on Android
        shadowColor: '#000', // Adds a shadow effect on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    imageContainer: {
        width: 200,
        height: 200,
        maxHeight: 200,
        borderRadius: 100, // Half of width/height to create a perfect circle
        overflow: 'hidden',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    image: {
        width: 150, 
        height: 150,
        resizeMode: 'contain', 
    },
    
    details: {
        flex: 1,
        marginTop: 20,
        width: '100%',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 18,
        color: 'green',
        fontWeight: 'bold',
        borderBottomWidth: 1, 
        borderBottomColor: 'gray',
        paddingBottom: 10,  
        width: '100%',
        textAlign: 'center'
    },
    category: {
        fontSize: 18,
        color: 'gray',
    },
    descriptionContainer: {
        minHeight: 100,
        maxHeight: 150,
        borderBottomWidth: 1, 
        borderBottomColor: 'gray',
        paddingBottom: 5
    },
    description: {
        color: 'gray',
        paddingTop: 10,
        fontSize: 14, 
    },
    starContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'flex-start'
    },
});