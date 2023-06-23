const API = "http://192.168.1.13:3000/user";
const API2 = "http://192.168.1.13:3000/usermail";

export const saveUser = async (newUser) => {
    const res = await fetch(API, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
    });
    return await res.json();
};

export const getUserMail = async (newLogser) => {
    const res = await fetch(API2, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(newLogser)
    });
  
    return await res.json();
};