import { NavigationContainer } from '@react-navigation/native';
import ProductsRootStack from './navigators/ProductsStack';
import { NetInfoContext } from './context/NetworkContext';
import { DBContext } from './context/ConnectionContext';

export default function App() {
  return (
    <NetInfoContext>
      <DBContext>
        <NavigationContainer>
          <ProductsRootStack/>
        </NavigationContainer>
      </DBContext>
    </NetInfoContext>
  );
}