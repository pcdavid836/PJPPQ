import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Modal, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import MyTimeOptions from '../../screens/MainMenu/MyParkOptions/MyTimeOptions';
import { getParksTime } from '../../api';

const PrivateHour = ({ parkId }) => {
    const [parktime, setParkTime] = useState([]);
    const [visible, setVisible] = React.useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const loadTimes = async () => {
        const data = await getParksTime(parkId);
        setParkTime(data);
    };

    useEffect(() => {
        loadTimes();
    }, []);

    const getDayOfWeek = (number) => {
        switch (number) {
            case 1:
                return 'Lunes';
            case 2:
                return 'Martes';
            case 3:
                return 'Miércoles';
            case 4:
                return 'Jueves';
            case 5:
                return 'Viernes';
            case 6:
                return 'Sábado';
            case 7:
                return 'Domingo';
            default:
                return 'Día Desconocido Juercoles';
        }
    };

    // En el componente CardPlace, usa esta función para mostrar el día de la semana:
    const renderTimeItem = ({ item }) => (
        <View style={styles.timeItem}>
            <Text style={styles.timeText}>
                <Text style={{ fontWeight: 'bold' }}>
                    {getDayOfWeek(item.dias_semana_idDia)}:
                </Text>{" "}
                {formatTimeAMPM(item.hora_apertura)} - {formatTimeAMPM(item.hora_cierre)}
            </Text>
        </View>
    );

    const formatTimeAMPM = (time) => {
        // Divide el tiempo en horas, minutos y segundos
        const [hours, minutes] = time.split(':');

        // Determina si es AM o PM
        const ampm = hours < 12 ? 'AM' : 'PM';

        // Convierte las horas al formato de 12 horas
        const formattedHours = hours % 12 || 12;

        // Formatea el tiempo como "HH:MMAM/PM"
        return `${formattedHours}:${minutes}${ampm}`;
    };

    const toModifyCard = () => {
        show();
    };

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>Tu Horario</Text>
            </View>
            <FlatList
                contentContainerStyle={{ alignItems: 'center' }}
                data={parktime}
                renderItem={renderTimeItem}
                keyExtractor={item => item.idHorario}
            />
            <TouchableOpacity style={styles.shareButton} onPress={() => toModifyCard()}>
                <Text style={styles.shareButtonText}>Modificar Horario</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                onRequestClose={hide}
                visible={visible}
            >
                <MyTimeOptions parkToEdit={parkId} closeModal={hide} onComplete={loadTimes}/>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    timeItem: {
        padding: 10,
        borderBottomColor: '#ccc',
    },
    timeText: {
        fontSize: 14,
    },
    header: {
        alignItems: 'center',
        margin: 5
    },
    shareButton: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#00BFFF',
    },
    shareButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        padding: 10,
    },
})

export default PrivateHour