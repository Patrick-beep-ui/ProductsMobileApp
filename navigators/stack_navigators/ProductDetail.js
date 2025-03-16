import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailsComponent from '../../components/ProductDetailsComponent';

const {Navigator, Screen} = createNativeStackNavigator();

function ProductDetailsStack({route}) {
    return(
        <Navigator>
            <Screen name="ProductDetailsStack" 
            component={ProductDetailsComponent} 
            options={{ headerShown: false }}
            initialParams={{ product: route.params.product }}
             />
        </Navigator>
    )
}

export default ProductDetailsStack