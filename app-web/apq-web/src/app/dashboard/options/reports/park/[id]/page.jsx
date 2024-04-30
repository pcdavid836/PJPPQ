import React from "react"
import axios from 'axios';
import ReportsInfoPark from '@/components/ReportsInfoPark/AccordionReports';
import CounterParkReports from '@/components/AlertCounter/CounterFromUser/UserReportsCounter';

async function loadReportsFromParK(mainId) {
    const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/reports/frompark/${mainId}`);
    return data;
}
async function loadCountReportsFromPark(mainId) {
    const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/reports/frompark/counter/${mainId}`);
    return data;
}

async function ReportParkPage({ params }) {
    let reports;
    let countedReports;

    try {
        reports = await loadReportsFromParK(params.id);
    } catch (error) {
        reports = null;
    }

    try {
        countedReports = await loadCountReportsFromPark(params.id);
    } catch (error) {
        countedReports = null;
    }

    if (!reports || !countedReports) {
        return (
            <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
                <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
                        <h1 className="h2">Reportes del Establecimiento:</h1>
                        <div className="btn-toolbar mb-2 mb-md-0">
                        </div>
                    </div>
                    <div className='p-4'>
                        <div className='my-1'>
                            <h1 className="h2"> Este establecimiento no tiene ningun reporte.</h1>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
            <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
                    <h1 className="h2">Reportes del Establecimiento:</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                    </div>
                </div>
                <div className='p-4'>
                    <div className='my-1'>
                        <CounterParkReports countedReports={countedReports} />
                    </div>
                    <ReportsInfoPark reports={reports} />
                </div>
            </main>
        </div>
    )
}

export default ReportParkPage;
