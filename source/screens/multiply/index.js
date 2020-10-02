import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image, ImageBackground, Modal, FlatList, StyleSheet, AsyncStorage, Alert } from 'react-native'

import background from '../../../images/background.png'
import ajax from '../../../images/teams-shields/ajax.png'
import arsenal from '../../../images/teams-shields/arsenal.png'
import atletico from '../../../images/teams-shields/atletico.png'
import barcelona from '../../../images/teams-shields/barcelona.png'
import bayern from '../../../images/teams-shields/bayern.png'
import chelsea from '../../../images/teams-shields/chelsea.png'
import city from '../../../images/teams-shields/city.png'
import dortmund from '../../../images/teams-shields/dortmund.png'
import everton from '../../../images/teams-shields/everton.png'
import fluminense from '../../../images/teams-shields/fluminense.png'
import fulham from '../../../images/teams-shields/fulham.png'
import leeds from '../../../images/teams-shields/leeds-united.png'
import liverpool from '../../../images/teams-shields/liverpool.png'
import psg from '../../../images/teams-shields/psg.png'
import leipzig from '../../../images/teams-shields/rb-leipzig.png'
import real from '../../../images/teams-shields/real.png'
import spurs from '../../../images/teams-shields/spurs.png'
import united from '../../../images/teams-shields/united.png'
import valencia from '../../../images/teams-shields/valencia.png'


const MultiplyScreen = props => {
    const { navigate } = props.navigation

    const [visible, setVisible] = useState(false)
    const [title, setTitle] = useState(null)
    const [position, setPosition] = useState(null)

    const [teams, setTeams] = useState([
        { index: 0, name: 'AFC Ajax', shield: ajax, check: false },
        { index: 1, name: 'Arsenal FC', shield: arsenal, check: false },
        { index: 2, name: 'Atlético de Madrid', shield: atletico, check: false },
        { index: 3, name: 'FC Barcelona', shield: barcelona, check: false },
        { index: 4, name: 'FC Bayern München', shield: bayern, check: false },
        { index: 5, name: 'Chelsea FC', shield: chelsea, check: false },
        { index: 6, name: 'Manchester City', shield: city, check: false },
        { index: 7, name: 'Borussia Dortmund', shield: dortmund, check: false },
        { index: 8, name: 'Everton FC', shield: everton, check: false },
        { index: 9, name: 'Fluminense FC', shield: fluminense, check: false },
        { index: 10, name: 'Fulham FC', shield: fulham, check: false },
        { index: 11, name: 'Leeds United', shield: leeds, check: false },
        { index: 12, name: 'Liverpool FC', shield: liverpool, check: false },
        { index: 13, name: 'Paris Saint-Germain', shield: psg, check: false },
        { index: 14, name: 'RB Leipzig', shield: leipzig, check: false },
        { index: 15, name: 'Real Madrid', shield: real, check: false },
        { index: 16, name: 'Tottenham Hotspur', shield: spurs, check: false },
        { index: 17, name: 'Manchester United', shield: united, check: false },
        { index: 18, name: 'Valencia CF', shield: valencia, check: false },
    ])

    const [table, setTable] = useState([
        { index: 0, team: null },
        { index: 1, team: null },
        { index: 2, team: null },
        { index: 3, team: null },
        { index: 4, team: null },
        { index: 5, team: null },
        { index: 6, team: null },
        { index: 7, team: null },
        { index: 8, team: null },
        { index: 9, team: null },
        { index: 10, team: null },
        { index: 11, team: null },
        { index: 12, team: null },
        { index: 13, team: null },
        { index: 14, team: null },
        { index: 15, team: null },
        { index: 16, team: null },
        { index: 17, team: null },
        { index: 18, team: null },
    ])

    openChoices = index => {
        setTitle(`${index + 1}º lugar:`)
        setPosition(index)
        setVisible(true)
    }

    choice = team => {
        const updatedTable = table
        updatedTable[position].team = team

        const updatedTeams = teams
        updatedTeams[team.index].check = true

        setTeams(updatedTeams)
        setTable(updatedTable)
        setVisible(false)
    }

    renderChoices = ({ item }) => {
        if (!item.check) {
            return (
                <TouchableOpacity style={styles.choicesModal} onPress={() => choice(item)}>
                    <Text style={styles.choiceName}>{item.name}</Text>
                    <Image source={item.shield} style={styles.choiceShield} />
                </TouchableOpacity>
            )
        }
    }

    renderTable = ({ item }) => {
        if (item.team) {
            return (
                <TouchableOpacity style={styles.choices}>
                    <Text style={styles.choiceName}>{`${item.index + 1} ${item.team.name}`}</Text>
                    <Image source={item.team.shield} style={styles.choiceShield} />
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.choices} onPress={() => openChoices(item.index)}>
                    <Text style={styles.choiceName}>{`${item.index + 1}º colocado...`}</Text>
                </TouchableOpacity>
            )
        }
    }

    saveTable = () => {
        const valid = table.filter(el => el.team === null)

        if (valid.length > 0) {
            Alert.alert(
                'Vai com calma, cara!',
                'Você ainda não definiu toda a classificação',
                [
                    { text: 'OK', onPress: () => { } },
                ],
            );
        } else {
            const object = {
                table: table
            }

            AsyncStorage.setItem('table', JSON.stringify(object))

            Alert.alert(
                'Sucesso!',
                'A classificação foi definida, você pode iniciar o sorteio',
                [
                    { text: 'OK', onPress: () => navigate('Home') },
                ],
            )
        }
    }

    useEffect(() => {
        const getTable = async () => {
            const savedTable = await AsyncStorage.getItem('table')
            if (savedTable) {
                setTable(JSON.parse(savedTable).table)
            }
        }
        getTable()
    }, [])

    return (
        <ImageBackground source={background} style={styles.background}>
            <View style={styles.container}>
                <FlatList
                    style={{ flex: 1, width: '100%' }}
                    contentContainerStyle={{ padding: 20 }}
                    keyExtractor={(item) => item.index.toString()}
                    data={table}
                    extraData={teams}
                    renderItem={renderTable}
                />
                <View style={styles.foot}>
                    <TouchableOpacity style={styles.footButtonSave} onPress={saveTable}>
                        <Text style={styles.textButton}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footButtonCancel} onPress={() => navigate('Home')}>
                        <Text style={styles.textButton}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={visible} >
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{title ? title : ''}</Text>
                    </View>
                    <FlatList
                        style={{ flex: 1, width: '100%' }}
                        contentContainerStyle={{ padding: 20 }}
                        keyExtractor={(item) => item.name}
                        data={teams}
                        extraData={table}
                        renderItem={renderChoices}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={() => { setVisible(false) }}>
                        <Text style={styles.textButton}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
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

    modalHeader: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalTitle: {
        fontSize: 14,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#3121d6'
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

    choicesModal: {
        width: '100%',
        height: 60,
        padding: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#ff3881',
    },

    choiceShield: {
        width: 40,
        aspectRatio: 1,
    },

    choiceName: {
        fontSize: 10,
        color: '#fff',
        fontWeight: 'bold',
        letterSpacing: 1,
        textTransform: 'uppercase'
    },

    closeButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3121d6',
    },

    textButton: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 1,
        textTransform: 'uppercase'
    },

    foot: {
        width: '100%',
        flexDirection: 'row',
    },

    footButtonSave: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3121d6',
    },

    footButtonCancel: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff3881',
    }
})

export default MultiplyScreen;