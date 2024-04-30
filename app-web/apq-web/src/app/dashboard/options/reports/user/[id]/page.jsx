import React from 'react'
import axios from 'axios';
import ReportsInfoUser from '@/components/ReportsInfoUser/AccordionReports';
import CounterUserReports from '@/components/AlertCounter/CounterFromUser/UserReportsCounter';


async function loadReportsFromUser(mainId) {
    const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/reports/fromuser/${mainId}`);
    return data;
}
async function loadCountReportsFromUser(mainId) {
    const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/reports/fromuser/counter/${mainId}`);
    return data;
}

async function ReportUserPage({ params }) {
    let reports;
    let countedReports;

    try {
        reports = await loadReportsFromUser(params.id);
    } catch (error) {
        reports = null;
    }

    try {
        countedReports = await loadCountReportsFromUser(params.id);
    } catch (error) {
        countedReports = null;
    }

    if (!reports || !countedReports) {
        return (
            <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
                <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
                        <h1 className="h2">Reportes del usuario:</h1>
                        <div className="btn-toolbar mb-2 mb-md-0">
                        </div>
                    </div>
                    <div className='p-4'>
                        <div className='my-1'>
                            <h1 className="h2"> Este usuario no tiene ningun reporte.</h1>
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
                    <h1 className="h2">Reportes del usuario:</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                    </div>
                </div>
                <div className='p-4'>
                    <div className='my-1'>
                        <CounterUserReports countedReports={countedReports} />
                    </div>
                    <ReportsInfoUser reports={reports} />
                </div>
            </main>
        </div>
    )
}

export default ReportUserPage;
