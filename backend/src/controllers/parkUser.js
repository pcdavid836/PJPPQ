import { connect } from "../database"

export const getOwnerByPark = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM usuario_has_parqueo WHERE parqueo_idParqueo = ? AND Estado = 1;", [
        req.params.id,
    ]);
    res.json(rows)
}
