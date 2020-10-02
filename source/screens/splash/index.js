import React, { useEffect } from 'react'
import { ImageBackground, Image, StyleSheet, Animated } from 'react-native'

import logofs from '../../../images/logo-fs.png'
import background from '../../../images/background.png'

const Splash = props => {
    const { navigate } = props.navigation
    const springValue = new Animated.Value(1)
    spring = () => {
        springValue.setValue(0.5)
        Animated.spring(
            springValue,
            {
                toValue: 1,
            }
        ).start()
    }

    useEffect(() => {
        spring()

        setTimeout(() => {
            navigate('Home')
        }, 3000)
    }, [])

    return (
        <ImageBackground source={background} style={styles.background}>
            <Animated.View style={{ transform: [{ scale: springValue }] }}>
                <Image source={logofs} style={styles.logo} />
            </Animated.View>
            
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },

    logo: {
        height: 260,
        width: 200,
    },
})

export default Splash