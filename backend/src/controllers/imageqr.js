import { connect } from "../database"

export const getImageQR = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query('SELECT * FROM qr_source;');
    res.json(rows);
}
