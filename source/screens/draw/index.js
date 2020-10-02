import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image, ImageBackground, Modal, FlatList, StyleSheet, AsyncStorage, Animated, Share, Alert } from 'react-native'

import background from '../../../images/background.png'


const DrawScreen = props => {
    const { navigate } = props.navigation
    const [visible, setVisible] = useState(false)
    const [pot, setPot] = useState([])
    const [drawing, setDrawing] = useState(false)
    const [msg, setMsg] = useState('O pote está sendo embaralhado...')
    const [team, setTeam] = useState(null)
    const [draw, setDraw] = useState([])

    const springValue = new Animated.Value(1)
    spring = () => {
        springValue.setValue(0.7)
        Animated.spring(
            springValue,
            {
                toValue: 1,
                friction: 1
            }
        ).start()
    }

    renderTable = ({ item, index }) => {
        if (item.team) {
            return (
                <TouchableOpacity style={styles.choices}>
                    <Text style={styles.choiceName}>{`${index + 1} ${item.team.name}`}</Text>
                    <Image source={item.team.shield} style={styles.choiceShield} />
                </TouchableOpacity>
            )
        }
    }

    useEffect(() => {
        const getTable = async () => {
            const savedTable = await AsyncStorage.getItem('table')
            if (savedTable) {
                const table = JSON.parse(savedTable).table
                const updatedPot = []

                table.forEach(item => {
                    for (let index = 0; index < (item.index + 1) * 3; index++) {
                        updatedPot.push(item)
                    }
                })
                updatedPot.sort(() => Math.random() - 0.5)
                setPot(updatedPot)
            }
        }
        spring()
        getTable()
    }, [])

    drawTeam = () => {
        if (draw.length < 14) {
            setDrawing(true)
            const index = Math.floor((Math.random() * (pot.length - 1)) + 0)
            const item = pot[index]
            setTeam(item.team)

            const updatedPot = pot.filter(el => el.index !== item.index)
            setPot(updatedPot)

            const updatedDraw = draw
            updatedDraw.push(item)
            setDrawing(true)

            setTimeout(() => {
                setMsg('Já identificamos a bolinha mais aquecida...')
                setTimeout(() => {
                    setMsg('O time sorteado é o...')
                    setTimeout(() => {
                        setDraw(updatedDraw)
                        setMsg('O pote está sendo embaralhado...')
                        setDrawing(false)
                        spring()
                    }, 2000)
                }, 4000)
            }, 4000)
            setVisible(true)
        }
    }

    onShare = async () => {
        if (draw.length === 14) {
            let message = '*LIGA FIFA SERIDÓ: SEQUÊNCIA SORTEADA*\n\n';
            draw.forEach((item, index) => {
                if (index >= 9) {
                    message += `_${index + 1}º escolha:_ ${item.team.name} (${item.index + 1})\n`
                } else {
                    message += `_0${index + 1}º escolha:_ ${item.team.name} (${item.index + 1})\n`
                }

            });

            try {
                await Share.share({
                    message: message,
                })
            } catch (error) {
                Alert.alert('Vish', error.message);
            }
        } else {
            Alert.alert(
                'Ai é foda',
                'Tu quer compartilhar antes de terminar? Termine, cara',
                [
                    { text: 'OK', onPress: () => { } },
                ],
            )
        }
    };

    return (
        <ImageBackground source={background} style={styles.background}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.drawButton} onPress={drawTeam}>
                    <Text style={styles.textButton}>SORTEAR TIME</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, width: '100%' }}>
                    {!drawing && <FlatList
                        style={{ flex: 1, width: '100%' }}
                        contentContainerStyle={{ padding: 20 }}
                        keyExtractor={(item) => item.index.toString()}
                        data={draw}
                        renderItem={renderTable}
                    />}
                </View>
                <View style={styles.foot}>
                    <TouchableOpacity style={styles.footButton} onPress={() => { navigate('Home') }}>
                        <Text style={styles.textButton}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footButtonShare} onPress={onShare}>
                        <Text style={styles.textButton}>Compartilhar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={visible} animated animationType={'slide'}>
                <ImageBackground source={background} style={styles.background}>
                    <View style={styles.modalContent}>
                        {drawing &&
                            <View style={[styles.modalTeam, { padding: 50 }]}>
                                <Text style={styles.teamNameModal}>{msg}</Text>
                            </View>
                        }
                        <Animated.View style={[styles.modalTeam, { transform: [{ scale: springValue }] }]}>
                            {team && !drawing && <Image source={team.shield} style={styles.shieldModal} />}
                            {team && !drawing && <Text style={styles.teamNameModal}>{team.name}</Text>}
                        </Animated.View>
                        <TouchableOpacity style={styles.closeButton} onPress={() => { setVisible(false) }}>
                            <Text style={styles.textButton}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </Modal>
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

    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        width: '100%',
        flex: 1,
    },

    modalTeam: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    shieldModal: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },

    teamNameModal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },

    choices: {
        width: '100%',
        height: 60,
        padding: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#3121d680',
    },

    choiceShield: {
        width: 40,
        aspectRatio: 1,
    },

    choiceName: {
        fontSize: 10,
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },

    closeButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3121d6',
    },

    drawButton: {
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3121d680',
        borderRadius: 10,
        marginTop: 20,
    },

    textButton: {
        fontSize: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#fff',
    },

    foot: {
        width: '100%',
        flexDirection: 'row',
    },

    footButton: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3121d6',
    },

    footButtonShare: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff3881',
    },
})

export default DrawScreen;