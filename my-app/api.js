const API_BASE = "http://192.168.1.9:3000";

const APIUser = `${API_BASE}/user`;
const APIVerify = `${API_BASE}/verify`;
const APIUsermail = `${API_BASE}/usermail`;
const APIUsermailExistence = `${API_BASE}/usermailexist`;
const APIUserImage = `${API_BASE}/userimage`;
const APIVehicle = `${API_BASE}/vehicle`;
const APIVehicleInfo = `${API_BASE}/vehicleInfo`;
const APIVehicleDelete = `${API_BASE}/deletevehicle`;
const APIPark = `${API_BASE}/park`;
const APIParkTime = `${API_BASE}/parktime`;
const APIParkFilterVehicle = `${API_BASE}/parkvehiclefilter`;
const APIParkFilterVehicleEdit = `${API_BASE}/parkvehiclefilteredit`;
const APIMyPark = `${API_BASE}/mypark`;
const APIMyPost = `${API_BASE}/mypost`;
const APIDeletePark = `${API_BASE}/deletepark`;
const APISelectAllMyParks = `${API_BASE}/myparkaprobed`;
const APISelectParkToEdit = `${API_BASE}/parktimetoedit`;
const APIBooking = `${API_BASE}/book`;
const APIBookingUser = `${API_BASE}/bookuser`;
const APIBookingUserTrue = `${API_BASE}/bookusertrue`;
const APIBookingPark = `${API_BASE}/bookpark`;
const APIBookingCancel = `${API_BASE}/bookcancel`;
const APIBookingDeny = `${API_BASE}/bookdeny`;
const APIParkVehicleEnter = `${API_BASE}/parkvehicleenter`;
const APIParkVehicle = `${API_BASE}/parkvehicle`;
const APIParkVehicleDeny = `${API_BASE}/parkvehicledeny`;
const APIParkVehicleFinish = `${API_BASE}/parkvehiclefinish`;
const APIParkOwner = `${API_BASE}/parkuser`;
const APISearchFilterParks = `${API_BASE}/searchfilterparks`;
const APISearchRecover = `${API_BASE}/passwordsearchrecover`;
const APIUpdatePassword = `${API_BASE}/updatepassword`;
const APIBookingParkFilter = `${API_BASE}/bookfilterpark`;
const APIParkVehicleFilter = `${API_BASE}/parkvehiclefilter`;
const APIParkReportUser = `${API_BASE}/reporttouser`;
const APIUserReportPark = `${API_BASE}/reporttopark`;




//Nota la ip local siempre varia en todas las redes ver la ipconfig en cmd.

export const saveUser = async (newUser) => {
  const res = await fetch(APIUser, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
  });
  return await res.json();
};

export const getUserMail = async (newLogser) => {
  const res = await fetch(APIUsermail, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(newLogser)
  });

  return await res.json();
};

export const updateUser = async (idUser, newData) => {
  //console.log(idUser, newData) Ver contenido que llega a la api.
  const res = await fetch(`${APIUser}/${idUser}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  return res;
};

export const updateImageUser = async (idUser, newUriImage) => {
  try {
    //console.log("archivo json: " + JSON.stringify(newUriImage)); Cadena json enviada a la api para modificar la imagen de perfil de usuario.
    const res = await fetch(`${APIUserImage}/${idUser}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Url_imagen: newUriImage,
      }),
    });

    return res;
  } catch (error) {
    // Maneja el error
    console.log(error);
    throw error;
  }
};

export const getCars = async (idUser) => {
  const res = await fetch(`${APIVehicle}/${idUser}`);
  return await res.json();
};

export const saveVehicle = async (newVehicle) => {
  //console.log("archivo json: " + JSON.stringify(newVehicle)); 
  const res = await fetch(APIVehicle, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(newVehicle)
  });
  return await res.json();
};

export const getVehicleInfo = async (idVehicle) => {
  const requestBody = {
    idVehiculo: idVehicle, // Otra información si es necesario
  };

  const res = await fetch(APIVehicleInfo, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  return await res.json();
};

export const updateVehicle = async (idVehicle, newData) => {
  //console.log(idVehicle, newData)
  const res = await fetch(`${APIVehicle}/${idVehicle}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  return res;
};

export const deleteVehicle = async (idVehicle) => {
  const res = await fetch(`${APIVehicleDelete}/${idVehicle}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const getParks = async () => {
  const res = await fetch(APIPark, {
    method: "GET",
  });

  return await res.json();
};

export const getParksTime = async (idPark) => {
  const res = await fetch(`${APIParkTime}/${idPark}`, {
    method: "GET",
  });

  return await res.json();
};

export const getUserPark = async (idUser) => {
  const res = await fetch(`${APIMyPark}/${idUser}`, {
    method: "GET",
  });

  return await res.json();
};

export const postulate = async (newPostulation) => {
  //console.log("archivo json: " + JSON.stringify(newPostulation)); 
  const res = await fetch(APIPark, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(newPostulation)
  });
  return await res.json();
};

export const getParkById = async (idPark) => {
  const res = await fetch(`${APIPark}/${idPark}`, {
    method: "GET",
  });

  return await res.json();
};

export const getInfoPark = async (idMyPost) => {
  const requestBody = {
    idParqueo: idMyPost,
  };
  const res = await fetch(APIMyPost, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  return await res.json();
};

export const updatePost = async (idMyPost, newData) => {
  //console.log(idMyPost, newData)
  const res = await fetch(`${APIMyPost}/${idMyPost}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  return res;
};

export const deletePark = async (idMyPost) => {
  const res = await fetch(`${APIDeletePark}/${idMyPost}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const getUserParkAprobed = async (idUser) => {
  const res = await fetch(`${APISelectAllMyParks}/${idUser}`, {
    method: "GET",
  });

  return await res.json();
};


export const getParkTimetoEdit = async (idPark) => {
  const res = await fetch(`${APISelectParkToEdit}/${idPark}`, {
    method: "GET",
  });

  return await res.json();
};


export const updateParkTime = async (newData) => {
  const res = await fetch(APIParkTime, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  return res;
};

//ESTE ES PARA EL FORMULARIO DE MODIFICACION DE PARQUEOS
export const getParkVehicleFilter = async (idPark) => {
  const res = await fetch(`${APIParkFilterVehicleEdit}/${idPark}`, {
    method: "GET",
  });

  return await res.json();
};


export const updateParkFilter = async (newData) => {
  const res = await fetch(APIParkFilterVehicle, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  return res;
};


export const getParkFilterVehicle = async (idPark) => {
  const res = await fetch(`${APIParkFilterVehicle}/${idPark}`, {
    method: "GET",
  });

  return await res.json();
};


export const updateBasicPark = async (idPark, newData) => {
  //console.log(idMyPost, newData)
  const res = await fetch(`${APIPark}/${idPark}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  return res;
};

export const createBooking = async (newData) => {
  //console.log("archivo json: " + JSON.stringify(newData)); 
  const res = await fetch(APIBooking, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(newData)
  });
  return await res.json();
};

export const getBookByUser = async (idUser) => {
  const res = await fetch(`${APIBookingUser}/${idUser}`, {
    method: "GET",
  });

  return await res.json();
};

export const getBookByUserTrue = async (idUser) => {
  const res = await fetch(`${APIBookingUserTrue}/${idUser}`, {
    method: "GET",
  });

  return await res.json();
};

export const getBookByPark = async (idPark) => {
  const res = await fetch(`${APIBookingPark}/${idPark}`, {
    method: "GET",
  });
  const data = await res.json();
  //console.log(data);
  return data;
};


export const cancelBook = async (idBook) => {
  const res = await fetch(`${APIBookingCancel}/${idBook}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const denyBook = async (idBook) => {
  const res = await fetch(`${APIBookingDeny}/${idBook}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const parkVehicleEnter = async (idBook, newData) => {
  //console.log(idBook, newData)
  const res = await fetch(`${APIParkVehicleEnter}/${idBook}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  return res;
};

export const getParkVehicleByPark = async (idPark) => {
  const res = await fetch(`${APIParkVehicle}/${idPark}`, {
    method: "GET",
  });
  const data = await res.json();
  //console.log(data);
  return data;
};


export const parkVehicleFinish = async (idBook) => {
  const res = await fetch(`${APIParkVehicleFinish}/${idBook}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const parkVehicleDeny = async (idParqueo_Vehiculo, idBook ) => {
  //console.log(idBook, idParqueo_Vehiculo)
  const res = await fetch(`${APIParkVehicleDeny}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idParqueo_Vehiculo, idBook })
  });
  return res;
};


export const getParkOwnerByIdPark = async (idPark) => {
  const res = await fetch(`${APIParkOwner}/${idPark}`, {
    method: "GET",
  });

  return await res.json();
};

export const getParksByFilter = async (searchData) => {
  //console.log(JSON.stringify(searchData));
  const res = await fetch(APISearchFilterParks, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(searchData)
  });
  return await res.json();
};

export const getUserExistenceByEmail = async (searchData) => {
  const res = await fetch(APIUsermailExistence, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(searchData)
  });
  return await res.json();
};

export const sendVerificationSMS = async (getPhone) => {
  //console.log(JSON.stringify(getPhone));
  const res = await fetch(APIVerify, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(getPhone)
  });
  return await res.json();
};


export const emailSearchPasswordRecover = async (getMail) => {
  //console.log(JSON.stringify(getMail));
  const res = await fetch(APISearchRecover, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(getMail)
  });
  return await res.json();
};

export const updateUserPassword = async (newData) => {
  const res = await fetch(APIUpdatePassword, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  return res;
};

export const getBooksByFilter = async (getPetition) => {
  //console.log(JSON.stringify(getPhone));
  const res = await fetch(APIBookingParkFilter, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(getPetition)
  });
  return await res.json();
};

export const getParkedVehicleByFilter = async (getPetition) => {
  //console.log(JSON.stringify(getPetition));
  const res = await fetch(APIParkVehicleFilter, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(getPetition)
  });
  return await res.json();
};

export const createReportParkUser = async (getPetition) => {
  //console.log(JSON.stringify(getPetition));
  const res = await fetch(APIParkReportUser, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(getPetition)
  });
  return await res.json();
};

export const createReportUserPark = async (getPetition) => {
  //console.log(JSON.stringify(getPetition));
  const res = await fetch(APIUserReportPark, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(getPetition)
  });
  return await res.json();
};


