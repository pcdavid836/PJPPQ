import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button, Alert } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';
import { AuthContext } from '../../../..//context/AuthContext';
import { getCars, createBooking } from '../../../../api';
import DateTimePicker from '@react-native-community/datetimepicker';


const ReserveSpace = ({ parkId, parktimer, closeModal }) => {
    const { userInfo } = useContext(AuthContext);
    const [vehicles, setVehicles] = useState([]);
    const [value, setValue] = useState(null);
    const [date, setDate] = useState(new Date());
    const [timeStart, setTimeStart] = useState(new Date());
    const [timeEnd, setTimeEnd] = useState(new Date(1970, 0, 1, 0, 0)); // Set initial time to 00:00
    const dayOfWeek = date.getDay();

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [showTimeStart, setShowStart] = useState(false);
    const [showTimeEnd, setShowEnd] = useState(false);
    const parkDay = parktimer.find(park => park.dias_semana_idDia === (dayOfWeek === 0 ? 7 : dayOfWeek));
    // Convierte las horas de apertura y cierre a objetos Date
    let openingTime = parkDay ? new Date(`1970-01-01T${parkDay.hora_apertura}Z`) : null;
    let closingTime = parkDay ? new Date(`1970-01-01T${parkDay.hora_cierre}Z`) : null;

    // Ajusta las horas a la zona horaria local
    if (openingTime) {
        let localOffset = openingTime.getTimezoneOffset() * 60000;
        openingTime.setTime(openingTime.getTime() + localOffset);
    }
    if (closingTime) {
        let localOffset = closingTime.getTimezoneOffset() * 60000;
        closingTime.setTime(closingTime.getTime() + localOffset);
    }

    // Formatea las horas al formato deseado
    const formattedOpeningTime = openingTime ? openingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : null;
    const formattedClosingTime = closingTime ? closingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : null;

    const [booking, setBooking] = useState({
        Parqueo_idParqueo: null,
        Usuario_idUsuario: null,
        Fecha_Reserva: null,
        Hora_Reserva_Inicio: null,
        Hora_Reserva_Fin: null,
        vehiculo_idVehiculo: null
    });

    const handleChange = (name, value) => setBooking({ ...booking, [name]: value });

    useEffect(() => {
        loadVehicles();
        //console.log(parkId);
        //console.log(parktimer);
    }, []);

    useEffect(() => {
        // Verifica si el día no está disponible
        if (!parkDay) {
            setIsButtonDisabled(true);
            return;
        }

        // Verifica si la fecha seleccionada es una fecha pasada
        let now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (date < today) {
            setIsButtonDisabled(true);
            return;
        }


        // Verifica si el horario de inicio y fin están fuera del horario establecido
        if (timeStart < openingTime || timeEnd > closingTime) {
            setIsButtonDisabled(true);
            return;
        }

        // Verifica si no se ha seleccionado un vehículo
        if (!value) {
            setIsButtonDisabled(true);
            return;
        }

        // Si ninguna de las condiciones anteriores se cumple, habilita el botón
        setIsButtonDisabled(false);
    }, [date, timeStart, timeEnd, value]);


    const loadVehicles = async () => {
        const data = await getCars(userInfo.idUsuario);
        const newData = data.map(vehicle => ({
            value: vehicle.idVehiculo.toString(),
            label: vehicle.Descripcion,
            image: {
                uri: vehicle.Url_imagen,
            },
        }));
        setVehicles(newData);
    };

    const onChangeDate = (event, selectedDate) => {
        setShowDate(Platform.OS === 'ios');
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const onChangeTimeStart = (event, selectedTime) => {
        const currentTime = selectedTime || timeStart;
        setShowStart(Platform.OS === 'ios');
        setTimeStart(currentTime);
    };

    const onChangeTimeEnd = (event, selectedTime) => {
        const currentTime = selectedTime || timeEnd;
        setShowEnd(Platform.OS === 'ios');
        setTimeEnd(currentTime);
    };

    async function sendBooking() {
        booking.Parqueo_idParqueo = parkId;
        booking.Usuario_idUsuario = userInfo.idUsuario;

        let localOffset = date.getTimezoneOffset() * 60000;
        let localTime = date.getTime();
        date.setTime(localTime + localOffset);

        booking.Fecha_Reserva = new Date(date.getTime() - localOffset).toISOString().split('T')[0];
        booking.Hora_Reserva_Inicio = new Date(timeStart.getTime() - localOffset).toISOString().split('T')[1].substring(0, 8);
        booking.Hora_Reserva_Fin = new Date(timeEnd.getTime() - localOffset).toISOString().split('T')[1].substring(0, 8);
        booking.vehiculo_idVehiculo = value;

        // Verifica que ninguno de los valores en 'booking' sea nulo
        if (Object.values(booking).every(value => value !== null)) {
            createBooking(booking);
            closeModal();
        } else {
            // Muestra una alerta al usuario con un título personalizado, mostrar alertas faltantes en caso de seleccionar tiempos excedidos y demas
            Alert.alert('Error', 'Por favor, selecciona un vehículo.');
        }
    }

    return (
        <View>
            <Text style={styles.title}>Realizar Reserva</Text>
            <SelectCountry
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                imageStyle={styles.imageStyle}
                iconStyle={styles.iconStyle}
                maxHeight={200}
                value={value}
                data={vehicles}
                valueField="value"
                labelField="label"
                imageField="image"
                placeholder="Selecciona uno de tus vehiculos..."
                searchPlaceholder="Buscar..."
                onChange={item => {
                    setValue(item.value);
                }}
            />
            <View style={styles.separator} />
            <View style={styles.row}>
                <Text>{date.toDateString()}</Text>
                <Button onPress={() => setShowDate(true)} title="Seleccionar Fecha" />
            </View>
            {showDate && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
            )}
            <View style={styles.row}>
                <Text>{timeStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
                <Button onPress={() => setShowStart(true)} title="Seleccionar Tiempo Inicio" />
            </View>
            {showTimeStart && (
                <DateTimePicker
                    value={timeStart}
                    mode="time"
                    display="default"
                    onChange={onChangeTimeStart}
                />
            )}
            <View style={styles.row}>
                <Text>{timeEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
                <Button onPress={() => setShowEnd(true)} title="Seleccionar Tiempo Fin" />
            </View>
            {showTimeEnd && (
                <DateTimePicker
                    value={timeEnd}
                    mode="time"
                    display="default"
                    onChange={onChangeTimeEnd}
                />
            )}
            <Text>Horario: {parkDay ? `${formattedOpeningTime} - ${formattedClosingTime}` : "DIA NO DISPONIBLE"}</Text>
            <TouchableOpacity style={styles.shareButton} onPress={sendBooking} disabled={isButtonDisabled}>
                <Text style={styles.shareButtonText}>Realizar Reserva</Text>
            </TouchableOpacity>

        </View>
    );
};

export default ReserveSpace;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    dropdown: {
        height: 100,
        width: '100%',
        backgroundColor: '#EEEEEE',
        borderRadius: 22,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#000',
        marginVertical: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 12,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    shareButton: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'green',
    },
    shareButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
});