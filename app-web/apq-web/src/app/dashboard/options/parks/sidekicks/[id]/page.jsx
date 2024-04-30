import React from "react"
import axios from 'axios';
import SideTable from '@/components/SidekicksTable/SideTable';

async function loadSidekicksList(mainId) {
    const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/parks/coop/${mainId}`);
    return data;
}

async function sidekicksPage({ params }) {
    const sidekicks = await loadSidekicksList(params.id);
    //console.log(sidekicks);

    return (
        <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
            <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
                    <h1 className="h2">Cuidador y Cocuidadores</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                    </div>
                </div>
                <div className="p-4">
                    <SideTable sidekicks={sidekicks} />
                </div>
            </main>
        </div>
    )
}

export default sidekicksPage;
