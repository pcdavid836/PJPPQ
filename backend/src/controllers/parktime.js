import { connect } from "../database"

export const getParkTimeByID = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM horarios_atencion WHERE parqueo_idParqueo = ? AND Estado = 1;", [
        req.params.id,
    ]);
    res.json(rows)
}

export const getParkTimetoEdit = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM horarios_atencion WHERE parqueo_idParqueo = ?;", [
        req.params.id,
    ]);
    res.json(rows);
}

export const updateParkTime = async (req, res) => {
    try {
        const connection = await connect();

        // Iterar sobre los valores de días desde 1 al 7
        for (let dias_semana_idDia = 1; dias_semana_idDia <= 7; dias_semana_idDia++) {
            // Filtrar el elemento correspondiente al día actual
            const dataForDay = req.body.find((data) => data.dias_semana_idDia === dias_semana_idDia);

            if (dataForDay) {
                const { Estado, hora_apertura, hora_cierre, idHorario } = dataForDay;

                // Construir la consulta SQL
                const sql = `
                    UPDATE horarios_atencion
                    SET
                        hora_apertura = ?,
                        hora_cierre = ?,
                        Estado = ?
                    WHERE idHorario = ? AND dias_semana_idDia = ?;
                `;

                // Ejecutar la consulta SQL con los parámetros
                await connection.execute(sql, [
                    hora_apertura,
                    hora_cierre,
                    Estado,
                    idHorario,
                    dias_semana_idDia,
                ]);
            }
        }

        // Cerrar la conexión a la base de datos
        await connection.end();

        res.sendStatus(204); // Respuesta exitosa (código 204)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
