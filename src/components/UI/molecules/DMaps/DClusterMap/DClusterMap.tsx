import { type FC } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'

import { type TCriticalAny } from '@core/types/critical-any'

import 'leaflet/dist/leaflet.css'

const DClusterMap: FC<TCriticalAny> = ({ clusters, center = [32.4279, 53.688], zoom = 5 }) => {
    const customIcon = new L.Icon({
        iconUrl: '/icons/marker.svg',
        iconSize: new L.Point(40, 47),
    })
    const createClusterCustomIcon = function (cluster: TCriticalAny) {
        return L.divIcon({
            html: `<span>${cluster.getChildCount()}</span>`,
            className:
                'bg-white flex items-center justify-center rounded-full border-[6px] border-solid border-general-brand font-iran-yekan',
            iconSize: L.point(45, 45, true),
        })
    }

    return (
        <div>
            <MapContainer
                className='sm:h-[500px] h-[400px] w-full z-0 rounded-xl'
                center={center}
                zoom={zoom}
                scrollWheelZoom={true}
            >
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                <MarkerClusterGroup
                    iconCreateFunction={createClusterCustomIcon}
                    maxClusterRadius={100}
                    spiderfyOnMaxZoom
                    showCoverageOnHover
                    chunkedLoading
                    spiderLegPolylineOptions={{
                        fillOpacity: 0.1,
                        fillColor: '#000000',
                        weight: 1,
                    }}
                    polygonOptions={{
                        fillColor: '#000000',
                        color: '#000000',
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.1,
                    }}
                >
                    {clusters.map((cluster: TCriticalAny, index: number) => (
                        <Marker key={index} position={cluster} icon={customIcon} />
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    )
}

export default DClusterMap
