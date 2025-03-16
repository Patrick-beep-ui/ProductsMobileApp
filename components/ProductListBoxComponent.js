import { StyleSheet, Text, View, Image, TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

const ProductListBoxComponent = ({ product }) => {
    const {navigate} = useNavigation();
    //navigate('ProductDetails')

    const handlePress = useCallback(() => {
        navigate('ProductDetails', {product: product})
    }, [])

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            <View style={styles.box}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.image }} style={styles.image} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.price}>${product.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ProductListBoxComponent;

const styles = StyleSheet.create({
    box: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      padding: 10,
      marginVertical: 5,
      borderRadius: 10,
      overflow: 'hidden',
      elevation: 2, // Adds a shadow effect on Android
        shadowColor: '#000', // Adds a shadow effect on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    details: {
        maxWidth: 270
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    price: {
      fontSize: 14,
      color: 'green',
    },
    imageContainer: {
      width: 60,
      height: 60,
      marginRight: 10,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
  });
  
  
