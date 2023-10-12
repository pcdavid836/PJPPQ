const APIUser = "http://192.168.1.7:3000/user";
const APIUsermail = "http://192.168.1.7:3000/usermail";
const APIUserImage = "http://192.168.1.7:3000/userimage";
const APIVehicle = "http://192.168.1.7:3000/vehicle";
const APIVehicleInfo = "http://192.168.1.7:3000/vehicleInfo";
const APIVehicleDelete = "http://192.168.1.7:3000/deletevehicle";

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
