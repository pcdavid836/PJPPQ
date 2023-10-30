import * as React from 'react';
import { View, useWindowDimensions, StyleSheet, ScrollView, TouchableOpacity, Text, Image, Modal } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import PrivateHour from '../../../../components/PrivateHour';
import MyCardModInfo from '../MyCardModInfo/MyCardModInfo';
import { getInfoPark, getBookByPark, getParkVehicleByPark } from '../../../../api'
import BookingList from '../../../../components/BookingComponentsPark/BookingList';
import ParkedVehicleList from '../../../../components/ParkedVehicle/ParkedVehicleList';


export default function MyCardPlace({ myparkto, onModifyComplete }) {
    const [visible, setVisible] = React.useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const [infoVisible, setInfoVisible] = React.useState(false);
    const [book, setBook] = React.useState([]);
    const [vehicles, setVehicles] = React.useState([]);
    const showInfo = () => setInfoVisible(true);
    const hideInfo = () => setInfoVisible(false);
    const [mypark, setMyPark] = React.useState(null);

    React.useEffect(() => {
        fetchData();
        loadBooks();
        loadParkedVehicles();
    }, []);

    const fetchData = async () => {
        try {
            const response = await getInfoPark(myparkto);
            setMyPark(response);
            //console.log(mypark);
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

    const showMenuHour = () => {
        show();
    };

    const showMenuInfo = () => {
        showInfo();
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
            <BookingList book={book} onDeleteComplete={loadBooks} />
        </View>
    );

    const SecondRoute = () => (
        <View>
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
                    <Text style={{ textAlign: 'justify' }}>{mypark ? mypark.Descripcion : ''}</Text>
                    <View style={styles.addToCarContainer}>
                        <TouchableOpacity style={styles.modButton} onPress={() => showMenuInfo()}>
                            <Text style={styles.shareButtonText}>Modificar</Text>
                        </TouchableOpacity>
                        <Modal
                            animationType="slide"
                            visible={infoVisible}
                            onRequestClose={hideInfo}
                        >
                            <MyCardModInfo parkId={mypark ? mypark.idParqueo : null} closeModal={hideInfo} updateMod={fetchData} />
                        </Modal>

                        <TouchableOpacity style={styles.hourButton} onPress={() => showMenuHour()}>
                            <Text style={styles.shareButtonText}>Horario de atención</Text>
                        </TouchableOpacity>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={visible}
                            onRequestClose={hide}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <PrivateHour parkId={mypark ? mypark.idParqueo : null} />
                                </View>
                            </View>
                        </Modal>
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
    hourButton: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'green',
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
});
