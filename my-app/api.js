const API = 'http:10.0.2.2:3000/user'
const API2 = 'http:10.0.2.2:3000/usermail'

export const saveUser = async (newUser) => {
    await fetch(API, {
        method: 'POST',
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
    });
    return await res.json();
};

export const getUserMail = async (getUserMail) => {
    await fetch(API2, {
        method: 'GET',
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(getUserMail)
    });
    return await res.json();
};