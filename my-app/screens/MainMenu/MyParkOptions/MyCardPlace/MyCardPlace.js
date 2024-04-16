import * as React from 'react';
import { View, useWindowDimensions, StyleSheet, ScrollView, TouchableOpacity, Text, Image, Modal } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import PrivateHour from '../../../../components/PrivateHour';
import MyCardModInfo from '../MyCardModInfo/MyCardModInfo';
import { getInfoPark, getBookByPark, getParkVehicleByPark, getBooksByFilter, getParkedVehicleByFilter, saveShareCode, generateNewCode, getSideKickByPark, getMutedByPark } from '../../../../api'
import BookingList from '../../../../components/BookingComponentsPark/BookingList';
import ParkedVehicleList from '../../../../components/ParkedVehicle/ParkedVehicleList';
import SidekickList from '../../../../components/SideKicksComponentsPark/SidekickList';
import MutedUserList from '../../../../components/MutedUserComponents/MutedUserList';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectCountry } from 'react-native-element-dropdown';
import { CheckBox } from 'react-native-elements';
import CryptoES from 'crypto-es';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../../../context/AuthContext';


export default function MyCardPlace({ myparkto, onModifyComplete }) {
    //console.log(myparkto)
    const local_data = [
        {
            value: '1',//{ Estado: '0', Rechazado: '1', Cancelado: '1', Realizado: '0' },
            lable: 'Denegados',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        },
        {
            value: '2',//{ Estado: '1', Rechazado: '0', Cancelado: '0', Realizado: '0' },
            lable: 'Pendientes',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        },
        {
            value: '3',//{ Estado: '0', Rechazado: '0', Cancelado: '0', Realizado: '1' },
            lable: 'Realizados',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        },
    ];

    const local_data2 = [
        {
            value: '1',//{ Estado: '1',Cancelado: '0', ConfirmarSalida: '0' },
            lable: 'Pendientes',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        },
        {
            value: '2',//{ Estado: '0', Cancelado: '0', ConfirmarSalida: '1' },
            lable: 'Finalizados',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        },
        {
            value: '3',//{ Estado: '0', Cancelado: '1', ConfirmarSalida: '0' },
            lable: 'Cancelados',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        },
    ];



    const { userInfo } = React.useContext(AuthContext);
    const [country, setCountry] = React.useState('1');
    const [country2, setCountry2] = React.useState('1');
    const [checked, setChecked] = React.useState(false);


    const [visible, setVisible] = React.useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const [infoVisible, setInfoVisible] = React.useState(false);
    const [infoCodeVisible, setInfoCodeVisible] = React.useState(false);
    const [newModalVisible, setNewModalVisible] = React.useState(false);
    const [modalListStunned, setmodalListStunned] = React.useState(false);

    const [isCoCuidador, setIsCoCuidador] = React.useState(false);
    const [book, setBook] = React.useState([]);
    const [vehicles, setVehicles] = React.useState([]);
    const [stunnedUsers, setStunnedUsers] = React.useState([]);
    const [sidekicks, setSidekicks] = React.useState([]);
    const [myShareCode, setMyShareCode] = React.useState(null);
    const showInfo = () => setInfoVisible(true);
    const hideInfo = () => setInfoVisible(false);
    const [mypark, setMyPark] = React.useState(null);
    const [date, setDate] = React.useState(new Date());
    const [filterVisible, setFilterVisible] = React.useState(false);
    const [filterParkVisible, setFilterParkVisible] = React.useState(false);
    const showCodeInfo = () => setInfoCodeVisible(true);
    const hideCodeInfo = () => setInfoCodeVisible(false);
    const showListStunnedUsers = () => setmodalListStunned(true);
    const hideListStunnedUsers = () => setmodalListStunned(false);

    const openNewModal = () => {
        setInfoCodeVisible(false);
        setNewModalVisible(true);
    };

    const closeNewModal = () => {
        setNewModalVisible(false);
    };


    const [info, setInfo] = React.useState({
        Parqueo_idParqueo: myparkto,
        Fecha_Reserva: new Date().toISOString().split('T')[0], // Fecha de hoy
        Rechazado: 0,
        Cancelado: 0,
        Realizado: 0,
        Estado: 1
    });

    const [infoParkVehicle, setInfoParkVehicle] = React.useState({
        Parqueo_idParqueo: myparkto,
        Fecha_Creacion: new Date().toISOString().split('T')[0], // Fecha de hoy
        Estado: 1,
        ConfirmacionSalida: 0,
        Cancelado: 0
    });

    const [showDatePicker, setShowDatePicker] = React.useState(false);
    // Actualiza la función handleDateChange para ocultar el DateTimePicker después de seleccionar una fecha
    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        const localDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        setInfo({ ...info, Fecha_Reserva: localDate.toISOString().split('T')[0] });
        setShowDatePicker(false);
    };

    const handleDateChange2 = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        const localDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        setInfoParkVehicle({ ...infoParkVehicle, Fecha_Creacion: localDate.toISOString().split('T')[0] });
        setShowDatePicker(false);
    };

    React.useEffect(() => {
        fetchData();
        loadBooks();
        loadParkedVehicles();
        loadSidekicks();
        loadMutedUsers();
        //console.log(mypark);
    }, []);

    //VISOR DEL CHECKBOX DE mypark,Compartir
    React.useEffect(() => {
        if (mypark) {
            setChecked(mypark.Compartir === 1);
        }
    }, [mypark]);


    const fetchData = async () => {
        try {
            const response = await getInfoPark(myparkto);
            setMyPark(response);
        } catch (error) {
            console.error('Error fetching park details.', error);
        }
    };

    const loadBooks = async () => {
        try {
            const response = await getBookByPark(myparkto);
            setBook(response);
            //console.log(book);
        } catch (error) {
            console.error('Error fetching park details.', error);
        }
    };

    const loadParkedVehicles = async () => {
        try {
            const response = await getParkVehicleByPark(myparkto);
            setVehicles(response);
            //console.log(vehicles);
        } catch (error) {
            console.error('Error fetching park details.', error);
        }
    };

    const loadMutedUsers = async () => {
        try {
            const response = await getMutedByPark(myparkto);
            setStunnedUsers(response);
            //console.log(vehicles);
        } catch (error) {
            console.error('Error fetching park details.', error);
        }
    };

    const loadSidekicks = async () => {
        try {
            const response = await getSideKickByPark(myparkto);
            setSidekicks(response);
            //console.log(response);

            // Busca al usuario actual en la respuesta
            const currentUser = response.find(sidekick => sidekick.usuario_idUsuario === userInfo.idUsuario);

            // Si el usuario actual es un co-cuidador, actualiza el estado de isCoCuidador
            if (currentUser && currentUser.Co_cuidador === 0) {
                setIsCoCuidador(true);
            } else {
                setIsCoCuidador(false);
            }
        } catch (error) {
            console.error('Error fetching park details.', error);
        }
    };

    const showMenuHour = () => {
        show();
    };

    const showMenuInfo = () => {
        showInfo();
    };

    const showShareInfo = () => {
        showCodeInfo();
    };

    const showStunnedButton = () => {
        showListStunnedUsers();
    };


    const showFilterReserves = () => {
        setFilterVisible(true);
    };

    const handleFilterSubmit = async () => {
        //console.log(info);
        const response = await getBooksByFilter(info);
        setBook(response);
        setFilterVisible(false);
    };

    const showFilterComplete = () => {
        //SI LOGRA HACERCE UN FILTRO ES SOLO PARA VER LOS VEHICULOS QUE ESTUVIERON EN EL PARQUEO Y NO EL SPAM
        setFilterParkVisible(true);
    };

    const handleFilterParkSubmit = async () => {
        //console.log(info);
        const response = await getParkedVehicleByFilter(infoParkVehicle);
        setVehicles(response);
        setFilterParkVisible(false);
    };

    const handleCheckBoxChangeShare = () => {
        const newCheckedValue = !checked;
        setChecked(newCheckedValue);
        // Actualizamos el valor de 'Compartir' en 'mypark' dependiendo del nuevo valor de 'checked'
        if (mypark) { // Verificamos que 'mypark' no sea nulo
            mypark.Compartir = newCheckedValue ? 1 : 0;
        }
    };


    const updateShareCode = async () => {
        // Genera algo aleatorio
        const randomValue = Math.random().toString();

        // Genera un hash SHA256
        const hash = CryptoES.SHA256(randomValue);
        let hashString = hash.toString(CryptoES.enc.Hex);

        // Convierte el hashString en un código de 6 caracteres
        hashString = hashString.substring(0, 6);

        mypark.Codigo = hashString;

        // Prepara los datos para enviar
        const dataToSend = {
            Codigo: mypark?.Codigo,
        };

        // Llama a la función de la API para actualizar el código
        const response = await generateNewCode(myparkto, dataToSend);

        // Actualiza el estado de 'mypark' con los nuevos datos
        setMyPark(prevState => ({ ...prevState, Codigo: dataToSend.Codigo }));

    };


    const saveShareCodeConfig = async () => {
        // Genera algo aleatorio
        const randomValue = Math.random().toString();

        // Genera un hash SHA256
        const hash = CryptoES.SHA256(randomValue);
        let hashString = hash.toString(CryptoES.enc.Hex);

        // Convierte el hashString en un código de 6 caracteres
        hashString = hashString.substring(0, 6);

        // Si mypark.Codigo es '******', actualiza mypark.Codigo con el nuevo código
        if (mypark && mypark.Codigo === '******') {
            mypark.Codigo = hashString;
        }

        // Prepara los datos para enviar
        const dataToSend = {
            Codigo: mypark?.Codigo,
            Compartir: mypark?.Compartir
        };

        // Llama a la función de la API para guardar el código
        const response = await saveShareCode(myparkto, dataToSend);

        // Actualiza el estado de 'mypark' con los nuevos datos
        setMyPark(prevState => ({ ...prevState, Codigo: dataToSend.Codigo }));

        // Maneja la respuesta de la API...

        setInfoCodeVisible(false);
    };

    const toggleModals = () => {
        // Cierra el modal actual
        setInfoCodeVisible(false);

        // Abre el nuevo modal
        setNewModalVisible(true);
    };


    //TabMenu
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Reservas' },
        { key: 'second', title: 'Vehículos' },
        { key: 'third', title: 'Información' },
    ]);


    const FirstRoute = () => (
        <View>
            <View style={styles.modalContainer}>
                <View style={styles.addToCarContainer}>
                    <TouchableOpacity style={styles.modButton} onPress={() => showFilterReserves()}>
                        <Text style={styles.shareButtonText}>Filtrar</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={filterVisible}
                    onRequestClose={() => setFilterVisible(false)}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.title}>Ver reservas por dia</Text>
                                <TouchableOpacity style={styles.modButton2} onPress={() => setShowDatePicker(true)}>
                                    <View style={styles.buttonTextContainer}>
                                        <Text style={styles.shareButtonText}>{date.toLocaleDateString()}</Text>
                                    </View>
                                </TouchableOpacity>
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={date}
                                        mode={'date'}
                                        display="default"
                                        onChange={handleDateChange}
                                    />
                                )}
                                <Text style={styles.dispT}>Estado de reserva:</Text>
                                <SelectCountry
                                    style={styles.dropdown}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    placeholderStyle={styles.placeholderStyle}
                                    imageStyle={styles.imageStyle}
                                    iconStyle={styles.iconStyle}
                                    maxHeight={200}
                                    value={country}
                                    data={local_data}
                                    valueField="value"
                                    labelField="lable"
                                    imageField="image"
                                    placeholder="Selecciona una opcion"
                                    searchPlaceholder="Search..."
                                    onChange={e => {
                                        setCountry(e.value);
                                        switch (e.value) {
                                            case '1':
                                                setInfo({ ...info, Estado: '0', Rechazado: '1', Cancelado: '1', Realizado: '0' });
                                                break;
                                            case '2':
                                                setInfo({ ...info, Estado: '1', Rechazado: '0', Cancelado: '0', Realizado: '0' });
                                                break;
                                            case '3':
                                                setInfo({ ...info, Estado: '0', Rechazado: '0', Cancelado: '0', Realizado: '1' });
                                                break;
                                            default:
                                                break;
                                        }
                                    }}
                                />
                                {/* Tus otros inputs aquí */}
                                <TouchableOpacity style={styles.modButton2} onPress={handleFilterSubmit}>
                                    <View style={styles.buttonTextContainer}>
                                        <Text style={styles.shareButtonText}>Mostrar reservas</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
            <BookingList book={book} onDeleteComplete={loadBooks} />
        </View>
    );

    const SecondRoute = () => (
        <View>
            <View style={styles.modalContainer}>
                <View style={styles.addToCarContainer}>
                    <TouchableOpacity style={styles.modButton} onPress={() => showFilterComplete()}>
                        <Text style={styles.shareButtonText}>Filtrar</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={filterParkVisible}
                    onRequestClose={() => setFilterParkVisible(false)}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.title}>Ver reservas por dia</Text>
                                <TouchableOpacity style={styles.modButton2} onPress={() => setShowDatePicker(true)}>
                                    <View style={styles.buttonTextContainer}>
                                        <Text style={styles.shareButtonText}>{date.toLocaleDateString()}</Text>
                                    </View>
                                </TouchableOpacity>
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={date}
                                        mode={'date'}
                                        display="default"
                                        onChange={handleDateChange2}
                                    />
                                )}
                                <Text style={styles.dispT}>Estado de reserva:</Text>
                                <SelectCountry
                                    style={styles.dropdown}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    placeholderStyle={styles.placeholderStyle}
                                    imageStyle={styles.imageStyle}
                                    iconStyle={styles.iconStyle}
                                    maxHeight={200}
                                    value={country2}
                                    data={local_data2}
                                    valueField="value"
                                    labelField="lable"
                                    imageField="image"
                                    placeholder="Selecciona una opcion"
                                    searchPlaceholder="Search..."
                                    onChange={e => {
                                        setCountry2(e.value);
                                        switch (e.value) {
                                            case '1':
                                                setInfoParkVehicle({ ...infoParkVehicle, Estado: '1', Cancelado: '0', ConfirmacionSalida: '0' });
                                                break;
                                            case '2':
                                                setInfoParkVehicle({ ...infoParkVehicle, Estado: '0', Cancelado: '0', ConfirmacionSalida: '1' });
                                                break;
                                            case '3':
                                                setInfoParkVehicle({ ...infoParkVehicle, Estado: '0', Cancelado: '1', ConfirmacionSalida: '0' });
                                                break;
                                            default:
                                                break;
                                        }
                                    }}
                                />
                                {/* Tus otros inputs aquí */}
                                <TouchableOpacity style={styles.modButton2} onPress={handleFilterParkSubmit}>
                                    <View style={styles.buttonTextContainer}>
                                        <Text style={styles.shareButtonText}>Mostrar reservas</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
            <ParkedVehicleList vehicles={vehicles} onDeleteComplete={loadParkedVehicles} />
        </View>
    );

    const ThirdRoute = () => (
        <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.form}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{mypark ? mypark.Titulo : ''}</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
                        <Image
                            style={styles.productImg}
                            source={{ uri: mypark ? mypark.Url_imagen : 'placeholder_image_url' }}
                        />
                    </View>
                    <Text style={styles.name}>{mypark ? mypark.Ubicacion : ''}</Text>
                    <View style={styles.headerContent}>
                        <Text style={styles.dispT}>Disponibilidad: </Text>
                        <Text style={{ color: mypark ? (mypark.Disponibilidad ? 'green' : 'red') : 'black', fontWeight: 'bold' }}>
                            {mypark ? (mypark.Disponibilidad ? 'Abierto' : 'Cerrado') : ''}
                        </Text>
                    </View>
                    <View style={styles.headerContent}>
                        <Text style={styles.dispT}>Lleno?: </Text>
                        <Text style={{ color: mypark ? (mypark.Lleno ? 'red' : 'green') : 'black', fontWeight: 'bold' }}>
                            {mypark ? (mypark.Lleno ? 'Sí' : 'No') : ''}
                        </Text>
                    </View>
                    <Text style={{ textAlign: 'justify' }}>{mypark ? mypark.Descripcion : ''}</Text>
                    <View style={styles.addToCarContainer}>
                        {isCoCuidador &&
                            <TouchableOpacity style={styles.modButton} onPress={() => showMenuInfo()}>
                                <Text style={styles.shareButtonText}>Modificar</Text>
                            </TouchableOpacity>
                        }
                        <Modal
                            animationType="none"
                            visible={infoVisible}
                            onRequestClose={hideInfo}
                        >
                            <MyCardModInfo parkId={mypark ? mypark.idParqueo : null} closeModal={hideInfo} updateMod={fetchData} />
                        </Modal>
                        {isCoCuidador && (
                            <TouchableOpacity style={styles.hourButton} onPress={() => showMenuHour()}>
                                <Text style={styles.shareButtonText}>Horario de atención</Text>
                            </TouchableOpacity>
                        )}
                        <Modal
                            animationType="none"
                            transparent={true}
                            visible={visible}
                            onRequestClose={hide}
                        >
                            <View style={styles.modalBackground}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <TouchableOpacity style={styles.closeButton} onPress={hide}>
                                            <Ionicons name="close-circle-outline" size={30} color="gray" />
                                        </TouchableOpacity>
                                        <PrivateHour parkId={mypark ? mypark.idParqueo : null} />
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        {isCoCuidador && (
                            <TouchableOpacity style={styles.ShareButton} onPress={() => showShareInfo()}>
                                <Text style={styles.shareButtonText}>Agregar Co-Propietarios</Text>
                            </TouchableOpacity>
                        )}
                        <Modal
                            animationType="none"
                            transparent={true}
                            visible={infoCodeVisible}
                            onRequestClose={hideCodeInfo}
                        >
                            <View style={styles.modalBackground}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <TouchableOpacity style={styles.closeButton} onPress={() => setInfoCodeVisible(false)}>
                                            <Ionicons name="close-circle-outline" size={30} color="gray" />
                                        </TouchableOpacity>
                                        <View style={styles.checkboxContainer}>
                                            <Text style={styles.label}>Activar invitacion por codigo: </Text>
                                            <CheckBox
                                                checked={checked} // Usamos 'checked' para controlar el estado del checkbox
                                                onPress={handleCheckBoxChangeShare}
                                                iconType="material-community"
                                                checkedIcon="checkbox-outline"
                                                uncheckedIcon={'checkbox-blank-outline'}
                                                title={"Activo?"}
                                            />
                                        </View>
                                        <Text style={{ ...styles.label, textAlign: 'center', marginTop: 20 }}>
                                            Codigo actual: {mypark?.Codigo || '******'} {/* Usamos el operador de encadenamiento opcional aquí */}
                                        </Text>
                                        <Text style={{ textAlign: 'center' }}>
                                            Al activar este codigo permite que cualquier usuario que tenga acceso a este tambien tenga control de su parqueo.
                                        </Text>
                                        <TouchableOpacity style={styles.saveButton} onPress={saveShareCodeConfig}>
                                            <View style={styles.buttonTextContainer}>
                                                <Text style={styles.shareButtonText}>Guardar cambios</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.generateButton} onPress={updateShareCode}>
                                            <View style={styles.buttonTextContainer}>
                                                <Text style={styles.shareButtonText}>Generar nuevo codigo</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.newButton} onPress={openNewModal}>
                                            <View style={styles.buttonTextContainer}>
                                                <Text style={styles.shareButtonText}>Ver lista de ayudantes</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        {isCoCuidador && (
                            <TouchableOpacity style={styles.focusButton} onPress={() => showStunnedButton()}>
                                <Text style={styles.shareButtonText}>Lista de usuarios silenciados</Text>
                            </TouchableOpacity>
                        )}
                        <Modal
                            animationType="none"
                            transparent={true}
                            visible={newModalVisible}
                            onRequestClose={() => setNewModalVisible(false)}
                        >
                            <View style={styles.modalBackground}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <TouchableOpacity style={styles.closeButton} onPress={closeNewModal}>
                                            <Ionicons name="close-circle-outline" size={30} color="gray" />
                                        </TouchableOpacity>
                                        <Text style={styles.centeredBoldText}>Staff del Parqueo</Text>
                                        <SidekickList sidekick={sidekicks} onDeleteComplete={loadSidekicks} />
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        {//HORA DE MODIFICAR UN MODAL NUEVO
                            <Modal
                                animationType="none"
                                transparent={true}
                                visible={modalListStunned}
                                onRequestClose={() => setmodalListStunned(false)}
                            >
                                <View style={styles.modalBackground}>
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <TouchableOpacity style={styles.closeButton} onPress={hideListStunnedUsers}>
                                                <Ionicons name="close-circle-outline" size={30} color="gray" />
                                            </TouchableOpacity>
                                            <Text style={styles.centeredBoldText}>Usuarios silenciados</Text>
                                            <MutedUserList users={stunnedUsers} onDeleteComplete={loadMutedUsers} />
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        }
                    </View>
                </View>
            </View>
        </ScrollView>
    );
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
    });

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}

        />
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImg: {
        width: 300,
        height: 200,
        marginBottom: 10
    },
    name: {
        fontSize: 20,
        color: '#696969',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modButton: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#00BFFF',
    },
    modButton2: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#00BFFF',
        width: '100%'
    },
    hourButton: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'green',
    },
    ShareButton: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'purple',
    },
    focusButton: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'magenta',
    },
    newButton: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'brown',
    },
    shareButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    addToCarContainer: {
        marginHorizontal: 30,
    },
    disp: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dispT: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 20
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    cardList: {
        marginBottom: 160,
    },
    dropdown: {
        margin: 16,
        height: 50,
        width: 200,
        backgroundColor: '#EEEEEE',
        borderRadius: 22,
        paddingHorizontal: 8,
    },
    imageStyle: {
        width: 24,
        height: 24,
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
    buttonTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ajusta el último valor (0.5) para cambiar la opacidad
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        marginBottom: 5,
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    saveButton: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'green', // Color verde para el botón de guardar
        width: '100%'
    },
    generateButton: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'orange', // Color naranja para el botón de generar
        width: '100%'
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        left: 40,
        zIndex: 1,
    },
    centeredBoldText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 10,
    },
});
