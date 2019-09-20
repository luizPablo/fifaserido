import React from 'react'
import { Text, View, TouchableOpacity, Image, ImageBackground, StyleSheet, AsyncStorage, Alert } from 'react-native'

import logofs from '../../../images/logo-fs.jpg'
import background from '../../../images/background.png'

const HomeScreen = props => {
    const { navigate } = props.navigation

    clearData = () => {
        AsyncStorage.clear((error) => {
            if (error) {
                Alert.alert(
                    'Algo deu errado! :(',
                    'Não foi possível limpar os dados',
                    [
                        { text: 'OK', onPress: () => navigate('Home') },
                    ],
                )
            } else {
                Alert.alert(
                    'Sucesso! :)',
                    'Tudo zerado, defina a classificação novamente para iniciar o sorteio...',
                    [
                        { text: 'OK', onPress: () => navigate('Home') },
                    ],
                )
            }
        })
    }

    initDraw = async () => {
        const table = await AsyncStorage.getItem('table')
        if (table) {
            navigate('Draw')
        } else {
            Alert.alert(
                'Opa, opa, parou...',
                'Você ainda não definiu a classificação, faça isso primeiro',
                [
                    { text: 'OK', onPress: () => navigate('Home') },
                ],
            )
        }
    }

    return (
        <ImageBackground source={background} blurRadius={20} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={logofs} style={styles.logo} />
                    <Text style={styles.title}>draw</Text>
                </View>

                <View style={styles.content}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => navigate('Classification')}>
                        <Text style={styles.buttonText}>Classificação</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton} onPress={initDraw}>
                        <Text style={styles.buttonText}>Iniciar Sorteio</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton} onPress={clearData}>
                        <Text style={styles.buttonText}>Limpar Dados</Text>
                    </TouchableOpacity>
                </View>
            </View>
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

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },

    header: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#ffffff80',
        borderRadius: 50,
    },

    content: {
        flex: 2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        height: 120,
        width: 120,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#ff0068',
    },

    title: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 40,
        color: '#ff0068'
    },

    actionButton: {
        margin: 5,
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#ffffff80',
    },

    buttonText: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#002d8a'
    }
})

export default HomeScreen;