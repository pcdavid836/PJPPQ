import { connect } from "../database"

export const getParkTimeByID = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM horarios_atencion WHERE parqueo_idParqueo = ? AND Estado = 1;", [
        req.params.id,
    ]);
    res.json(rows)
}