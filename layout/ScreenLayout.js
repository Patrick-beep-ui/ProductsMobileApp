import React from 'react';
import { View } from 'react-native';

const ScreenLayout = ({ children }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , height: '100%', width: '100%'}}>
            {children} 
        </View>
    );
};

export default ScreenLayout;