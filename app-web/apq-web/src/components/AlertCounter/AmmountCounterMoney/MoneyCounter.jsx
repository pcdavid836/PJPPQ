import React from 'react'

function UserReportsCounter({ countedMoney }) {
    // Verifica si countedMoney es null o si total_amount no está definido, y asigna "0.00" si es así
    const totalAmount = countedMoney && countedMoney.total_amount != null ? countedMoney.total_amount : "0.00";

    return (
        <div className="alert alert-success">
            <div className="row">
                <div className="col text-center">
                    <strong>Monto Total</strong>
                    <p>{totalAmount} Bs.</p>
                </div>
            </div>
        </div>
    )
}

export default UserReportsCounter;
