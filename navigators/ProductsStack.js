import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductListStack from './stack_navigators/ProductList';
import ProductDetailsStack from './stack_navigators/ProductDetail';

const {Navigator, Screen} = createNativeStackNavigator();

function ProductsRootStack() {
    return(
        <Navigator screenOptions={{ headerTitleAlign: 'center' }}>
            <Screen name='Products' component={ProductListStack} />
            <Screen name='ProductDetails' component={ProductDetailsStack} options={{title: 'Product Details'}} />
        </Navigator>
    )
}

export default ProductsRootStack