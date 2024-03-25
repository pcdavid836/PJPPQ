import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Modal, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { CheckBox } from 'react-native-elements';
import { getParkTimetoEdit, updateParkTime } from '../../../../api';

const MyTimeOptions = ({ parkToEdit, closeModal, onComplete }) => {
    const [parktime, setParkTime] = useState([]);
    const [isEnabled, setIsEnabled] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [timeDifference, setTimeDifference] = useState(false);

    const handleTimeChange = (event, selectedTime) => {
        setShowPicker(false);
        if (selectedTime) {
            // Ajusta 'selectedTime' a la zona horaria local
            selectedTime.setMinutes(selectedTime.getMinutes() - selectedTime.getTimezoneOffset());
            // Convierte 'selectedTime' a una cadena de tiempo en formato "HH:MM:SS"
            const timeString = selectedTime.toISOString().split('T')[1].split('.')[0];

            // Verifica si la hora seleccionada es mayor que 23:59
            if (timeString > '23:59:00') {
                // Muestra una alerta al usuario
                alert('La hora seleccionada no puede ser mayor que 23:59');
                return;
            }

            const itemIndex = parktime.findIndex((el) => el.idHorario === selectedItem.idHorario);
            const updatedParkTime = [...parktime];
            updatedParkTime[itemIndex][selectedItem.timeType] = timeString;
            setParkTime(updatedParkTime);
        }
    };

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
                return 'Día Desconocido, Juercoles';
        }
    };

    const loadTimes = async () => {
        const data = await getParkTimetoEdit(parkToEdit);
        const updatedData = data.map(item => ({
            ...item,
            isChecked: item.Estado === 1,
        }));
        setParkTime(updatedData);
    };

    const formatTimeAMPM = (time) => {
        if (typeof time === 'string') {
            // Divide el tiempo en horas, minutos y segundos
            const [hours, minutes] = time.split(':');

            // Determina si es AM o PM
            const ampm = hours < 12 ? 'AM' : 'PM';

            // Convierte las horas al formato de 12 horas
            const formattedHours = hours % 12 || 12;

            // Formatea el tiempo como "HH:MMAM/PM"
            return `${formattedHours}:${minutes}${ampm}`;
        } else {
            // Maneja el caso en que 'time' no es una cadena
            console.error('formatTimeAMPM fue llamado con un argumento no válido:', time);
            return '';
        }
    };

    //Cargar tiempos anteriores

    useEffect(() => {
        alert('Atención: Cada día debe corresponder a un formato de 24 horas y no puede cruzar horarios de distintos días en caso de atender en un horario nocturno (las horas, 23:59 y 00:00 están bloqueadas).');
        loadTimes();

    }, []);

    useEffect(() => {
        // Verifica si hay al menos 20 minutos de diferencia entre la hora de apertura y cierre
        const timeDiff = parktime.some(item => {
            const [startHours, startMinutes] = item.hora_apertura.split(':');
            const [endHours, endMinutes] = item.hora_cierre.split(':');
            const difference = (endHours - startHours) * 60 + (endMinutes - startMinutes);
            return difference < 20;
        });

        // Actualiza el estado de timeDifference
        setTimeDifference(timeDiff);
    }, [parktime]); // Recalcula timeDifference cada vez que parktime cambia

    useEffect(() => {
        // Verifica si la hora de cierre es menor o igual que la hora de apertura
        const timeDiff = parktime.some(item => {
            const [startHours, startMinutes] = item.hora_apertura.split(':');
            const [endHours, endMinutes] = item.hora_cierre.split(':');
            return endHours < startHours || (endHours === startHours && endMinutes <= startMinutes);
        });

        // Actualiza el estado de timeDifference
        setTimeDifference(timeDiff);
    }, [parktime]); // Recalcula timeDifference cada vez que parktime cambia


    const handleCheckChange = (item) => {
        // Encuentra el índice del elemento en el array
        const itemIndex = parktime.findIndex((el) => el.idHorario === item.idHorario);
        // Crea una copia del array de horarios
        const updatedParkTime = [...parktime];
        // Actualiza el estado del checkbox individualmente
        updatedParkTime[itemIndex].isChecked = !updatedParkTime[itemIndex].isChecked;
        // Actualiza el valor de 'Estado' basado en el estado del checkbox
        updatedParkTime[itemIndex].Estado = updatedParkTime[itemIndex].isChecked ? 1 : 0;
        setParkTime(updatedParkTime);
    };


    const renderItem = ({ item }) => (
        <View style={{ paddingBottom: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                {getDayOfWeek(item.dias_semana_idDia)}
            </Text>
            <View style={styles.card}>
                <CheckBox
                    title="Habilitar"
                    checked={item.isChecked || false}
                    onPress={() => handleCheckChange(item)}
                />
                <TouchableOpacity onPress={() => { setSelectedItem({ ...item, timeType: 'hora_apertura' }); setShowPicker(true); }}>
                    <Text style={styles.timeText}>
                        Inicio: {formatTimeAMPM(item.hora_apertura)}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.timeText}> - </Text>
                <TouchableOpacity onPress={() => { setSelectedItem({ ...item, timeType: 'hora_cierre' }); setShowPicker(true); }}>
                    <Text style={styles.timeText}>
                        Fin: {formatTimeAMPM(item.hora_cierre)}
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );

    const handleSubmit = () => {
        // Verifica si hay al menos 20 minutos de diferencia entre la hora de apertura y cierre
        const timeDifference = parktime.some(item => {
            const [startHours, startMinutes] = item.hora_apertura.split(':');
            const [endHours, endMinutes] = item.hora_cierre.split(':');
            const difference = (endHours - startHours) * 60 + (endMinutes - startMinutes);
            return difference < 20;
        });

        if (timeDifference) {
            // Muestra una alerta al usuario
            alert('Debe haber al menos 20 minutos de diferencia entre la hora de apertura y cierre');
            return;
        }

        // Si todo está bien, proceder con la solicitud
        updateParkTime(parktime);
        closeModal();
        onComplete(parktime);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <View style={styles.header}>
                    <Text style={styles.title}>Definir horarios</Text>
                </View>
                <FlatList
                    data={parktime}
                    renderItem={renderItem}
                    keyExtractor={item => item.idHorario.toString()}
                    scrollEnabled={false}
                />
                {showPicker && (
                    <DateTimePicker
                        value={new Date()}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={handleTimeChange}
                    />
                )}
                <TouchableOpacity
                    style={[styles.buttonSub, { backgroundColor: timeDifference ? 'gray' : '#1cab00' }]}
                    onPress={() => {
                        if (timeDifference) {
                            // Muestra un cuadro de alerta con las reglas
                            alert('Atención: La hora de cierre debe ser mayor que la hora de apertura.');
                        } else {
                            handleSubmit();
                        }
                    }}
                    disabled={timeDifference}
                >
                    <Text style={styles.buttonText}>Subir Horario</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10,
    },
    form: {
        width: '100%',
        paddingHorizontal: 20,
    },
    buttonSub: {
        backgroundColor: '#1cab00',
        borderRadius: 5,
        paddingVertical: 12,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5
    },
    timeText: {
        fontSize: 14,
    },
});

export default MyTimeOptions
