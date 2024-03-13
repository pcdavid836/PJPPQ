'use client';
import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export function DemoMap({mainlat, mainlng}) {
    const mapRef = useRef(null);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
                version: 'weekly',
            });

            const google = await loader.load();

            const position = {
                lat: mainlat, // usa la variable lat importada
                lng: mainlng, // usa la variable lng importada
            };

            // map options
            const mapOptions = {
                center: position,
                zoom: 17,
                mapId: 'MY_NEXTJS_MAP_ID',
                disableDefaultUI: true, // desactiva la interfaz de usuario predeterminada
                draggable: false, // hace que el mapa no sea arrastrable
                zoomControl: false, // desactiva el control de zoom
                scrollwheel: false, // desactiva el scroll del ratón
                disableDoubleClickZoom: true, // desactiva el zoom al hacer doble clic
                clickableIcons: false, // desactiva la interactividad de los iconos
                styles: [
                    {
                        featureType: 'poi',
                        stylers: [{ visibility: 'off' }]
                    },
                    {
                        featureType: 'transit',
                        stylers: [{ visibility: 'off' }]
                    }
                ]
            };

            // setup the map
            const map = new google.maps.Map(mapRef.current, mapOptions);

            // put up a marker
            const marker = new google.maps.Marker({
                map: map,
                position: position
            });
        };

        initMap();
    }, []);

    return <div style={{ height: '200px' }} ref={mapRef} />;
}
