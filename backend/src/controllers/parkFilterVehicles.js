import { connect } from "../database"

export const getVehicleFilterById = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM vehiculos_filtro WHERE parqueo_idParqueo = ? AND Estado = 1;", [
        req.params.id,
    ]);
    res.json(rows)
}

export const getVehicleFilterToEdit = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM vehiculos_filtro WHERE parqueo_idParqueo = ?;", [
        req.params.id,
    ]);
    res.json(rows);
}


export const updateVehicleFilter = async (req, res) => {
    try {
        const connection = await connect();

        // Iterar sobre los valores de tipo_vehiculo_idTipo_Vehiculo desde 1 al 7
        for (let tipo_vehiculo_idTipo_Vehiculo = 1; tipo_vehiculo_idTipo_Vehiculo <= 7; tipo_vehiculo_idTipo_Vehiculo++) {
            // Filtrar el elemento correspondiente al tipo de vehículo actual
            const dataForVehicleType = req.body.find((data) => data.tipo_vehiculo_idTipo_Vehiculo === tipo_vehiculo_idTipo_Vehiculo);

            if (dataForVehicleType) {
                const { Estado, idFiltro } = dataForVehicleType;

                // Construir la consulta SQL
                const sql = `
                    UPDATE vehiculos_filtro
                    SET
                        Estado = ?
                    WHERE idFiltro = ?;
                `;

                // Ejecutar la consulta SQL con los parámetros
                await connection.execute(sql, [
                    Estado,
                    idFiltro,
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
