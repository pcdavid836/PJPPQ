import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Modal, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { getParksTime } from '../../../../api';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CardPlace = ({ park, closeModal }) => {
  let parkImage = "defaultPark";
  const [parktime, setParkTime] = useState([]);
  const [isTimeVisible, setTimeVisible] = useState(false);
  const [iconName, setIconName] = useState("chevron-down-outline");


  const loadTimes = async () => {
    const data = await getParksTime(park.idParqueo);
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
        return 'Día Desconocido';
    }
  };
  const getAvailabilityText = () => {
    if (park.Disponibilidad === 1) {
      return "Abierto";
    } else {
      return "Cerrado";
    }
  };

  const getAvailabilityColor = () => {
    if (park.Disponibilidad === 1) {
      return "green";
    } else {
      return "red";
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



  const toggleTimeVisibility = () => {
    setTimeVisible(!isTimeVisible);
    setIconName(isTimeVisible ? "chevron-down-outline" : "chevron-up-outline");
  };

  const closeCard = () => {
    closeModal();
  };


  if (park.Url_imagen === "defaultPark") {
    parkImage = "https://www.bestsheds.com.au/wp-content/uploads/2020/05/Double-Garage-001-1RD.jpg";
  } else {
    parkImage = park.Url_imagen;
  }

  return (
    <View style={styles.container}>
      {/* Botón para cerrar en la esquina superior izquierda */}
      <TouchableOpacity style={styles.closeButton} onPress={closeCard}>
        <Ionicons name="close-circle-outline" size={30} color="gray" />
      </TouchableOpacity>
      <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
        <Image
          style={styles.productImg}
          source={{
            uri: parkImage,
          }}
        />
        <View style={styles.header}>
          <Text style={styles.name}>{park.Titulo}</Text>
          <Text style={styles.description}>
            {park.Descripcion}
          </Text>
          <View style={styles.headerContent}>
            <Text style={styles.dispT}>Disponibilidad: </Text>
            <Text style={{ ...styles.disp, color: getAvailabilityColor() }}>{getAvailabilityText()}</Text>
          </View>
          <TouchableOpacity onPress={toggleTimeVisibility}>
            <View style={styles.headerContent}>
              <Text style={styles.price}>Horarios de atención</Text>
              <Ionicons name={iconName} size={22} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {isTimeVisible && (
        <FlatList
          contentContainerStyle={{ alignItems: 'center' }}
          data={parktime}
          renderItem={renderTimeItem}
          keyExtractor={item => item.idHorario}
        />
      )}
      <View style={styles.addToCarContainer}>
        <TouchableOpacity style={styles.shareButton} onPress={() => clickEventListener()}>
          <Text style={styles.shareButtonText}>Solicitar Reserva</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  },
  productImg: {
    width: 300,
    height: 200,
    marginBottom: 10
  },
  name: {
    fontSize: 26,
    color: '#696969',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disp: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dispT: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'justify',
    marginTop: 10,
    color: '#696969',
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3,
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: '#778899',
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentColors: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  contentSize: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  separator: {
    height: 2,
    backgroundColor: '#eeeeee',
    marginTop: 20,
    marginHorizontal: 30,
  },
  shareButton: {
    marginTop: 10,
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
  },
  addToCarContainer: {
    marginHorizontal: 30,
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
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    color: 'purple',
    fontWeight: 'bold',
    marginRight: 10, // Espacio entre el texto y el icono
  },
  closeButton: {
    position: 'absolute',
    top: -30,
    zIndex: 1, // Asegura que el botón esté sobre otros elementos
  },
})

export default CardPlace