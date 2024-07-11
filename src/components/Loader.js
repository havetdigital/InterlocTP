import React from 'react';
import { ActivityIndicator, View ,StyleSheet } from 'react-native';


const Loader = ({ loading }) => {
    return loading ? (
        <View style={Styles.container}>
            <ActivityIndicator color={'white'} size="large" />
        </View>
    ) : null;
};

export default React.memo(Loader);

const Styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:999
    }
})