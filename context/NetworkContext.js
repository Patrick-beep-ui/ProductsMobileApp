import NetInfo from '@react-native-community/netinfo';
import React, { createContext, useContext, useState, useEffect } from 'react';

const NetworkContext = createContext();

export const useNetwork = () => useContext(NetworkContext)

export const NetInfoContext = ({children}) => {
    const [networkStateType, setNetworkStateType] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const getNetworkData = async () => {
            const netData = await NetInfo.fetch().then(state => {
                setIsConnected(state.isConnected)
                setNetworkStateType(state.type)
            })
        }

        getNetworkData();

        const subscription = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected)
            setNetworkStateType(state.type)

            console.log('Connection type:', state.type);
            console.log('Is connected?:', state.isConnected);
        })

        return () => {
            subscription();
        }

    }, [])

    return(
        <NetworkContext.Provider value={{isConnected, networkStateType}}>
            {children}
        </NetworkContext.Provider>
    )
}
