import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListComponent from '../../components/ProductListComponent';

const {Navigator, Screen} = createNativeStackNavigator();

function ProductListStack() {
    return(
        <Navigator>
            <Screen name="ProductListStack" component={ProductListComponent} options={{ headerShown: false }}/>
        </Navigator>
    )
}

export default ProductListStack