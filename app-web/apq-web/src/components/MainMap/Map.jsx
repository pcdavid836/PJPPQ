'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export function Map({ onSelectPark }) {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
                version: 'weekly',
            });

            const google = await loader.load();

            const position = {
                lat: -17.393614614288733,
                lng: -66.15691232441363,
            };

            // map options
            const mapOptions = {
                center: position,
                zoom: 17,
                mapId: 'MY_NEXTJS_MAP_ID',
            };

            // setup the map
            const map = new google.maps.Map(mapRef.current, mapOptions);
            setMap(map);
        };

        initMap();
    }, []);

    useEffect(() => {
        if (!map) return;

        const loadParks = async () => {
            const response = await fetch('http://localhost:3000/api/parks');
            const parks = await response.json();
            let image = "LOADING";

            parks.forEach(park => {
                
                switch (park.Tipo_Parqueo_idTipo_Parqueo) {
                    case 1:
                        image = "https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/Iconos%2FPIconOwn.png?alt=media&token=49505b1c-87b5-4c9c-866a-029465194c19";
                        break;
                    case 2:
                        image = "https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/Iconos%2FPIconPublic.png?alt=media&token=c2e22fd5-3420-409d-8036-bca7f1ea733e";
                        break;
                    case 3:
                        image = "https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/Iconos%2FPIconMechanic.png?alt=media&token=83208edd-1786-483e-a008-0a2ca4dbba5f";
                        break;
                    case 4:
                        image = "https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/Iconos%2FPIconBicile.png?alt=media&token=aeda1d6a-50e4-4457-8de5-c76c8edb70ae";
                        break;
                    default:
                        image = "https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/Iconos%2FPIconOwn.png?alt=media&token=49505b1c-87b5-4c9c-866a-029465194c19";
                }
                const marker = new google.maps.Marker({
                    map: map,
                    position: { lat: park.Latitud, lng: park.Longitud },
                    icon: {
                        url: image,
                        scaledSize: new google.maps.Size(50, 50),
                    },
                });

                marker.addListener('click', () => {
                    onSelectPark(park);
                });
            });
        };

        loadParks();
    }, [map, onSelectPark]);

    return <div style={{ height: '600px' }} ref={mapRef} />;
}
