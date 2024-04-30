'use client';
import Link from 'next/link'
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
    MdOutlineSpaceDashboard,
    MdPersonAddAlt,
    MdOutlineLibraryBooks,
    MdPeopleOutline,
    MdOutlineCarCrash,
    MdOutlineLogout,
    MdOutlineReport,
    MdOutlineMap
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { signOut } from 'next-auth/react'

export function SideNavbar({ ownData }) {
    //console.log(ownData);


    return (
        <div>
            <Disclosure as="nav">
                <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
                    <GiHamburgerMenu
                        className="block md:hidden h-6 w-6"
                        aria-hidden="true"
                    />
                </Disclosure.Button>
                <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
                    <div className="flex flex-col justify-start item-center">
                        <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
                            Virtual Dashboard
                        </h1>
                        <div className=" my-4 border-b border-gray-100 pb-4">
                            <Link className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto" href="/dashboard" style={{ textDecoration: 'none' }}>
                                <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                    Dashboard
                                </h3>
                            </Link>
                            <Link className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto" href="/dashboard/options/parks" style={{ textDecoration: 'none' }}>
                                <MdOutlineMap className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                    Parqueos
                                </h3>
                            </Link>
                            <Link className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto" href="/dashboard/options/requests" style={{ textDecoration: 'none' }}>
                                <MdOutlineLibraryBooks className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                    Solicitudes
                                </h3>
                            </Link>
                            <Link className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto" href="/dashboard/options/users" style={{ textDecoration: 'none' }}>
                                <MdPeopleOutline className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                    Usuarios
                                </h3>
                            </Link>
                            <Link className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto" href="/dashboard/options/vehicles" style={{ textDecoration: 'none' }}>
                                <MdOutlineCarCrash className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                    Vehículos
                                </h3>
                            </Link>
                            <Link className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto" href="/dashboard/options/reports" style={{ textDecoration: 'none' }}>
                                <MdOutlineReport className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                    Reportes
                                </h3>
                            </Link>
                        </div>
                        {/* setting  */}
                        <div className=" my-4 border-b border-gray-100 pb-4">
                            <Link className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto" href="/dashboard/options/myinfo" style={{ textDecoration: 'none' }}>
                                <CgProfile className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                    Mi perfil
                                </h3>
                            </Link>
                            {/* agregar un if si soy usuario tipo 4 */}
                            {ownData.Tipo_Usuario_idTipo_Usuario === 4 && (
                                <Link className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto" href="/dashboard/options/newplayer" style={{ textDecoration: 'none' }}>
                                    <MdPersonAddAlt className="text-2xl text-gray-600 group-hover:text-white " />
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                        Agregar usuario
                                    </h3>
                                </Link>
                            )}
                        </div>
                        {/* logout */}
                        <div className=" my-4">
                            <div
                                className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                                onClick={() => signOut()}
                            >
                                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                    Cerrar Sesión
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </Disclosure>
        </div>
    );
}

export default SideNavbar;
