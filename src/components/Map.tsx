"use client";

import { FC } from 'react'
import { MapContainer, MapContainerProps, TileLayer } from 'react-leaflet'
import { MapOptions } from 'leaflet'
import 'leaflet/dist/leaflet.css'



const Map: FC<
  {
    center: [number, number]
    zoom: number
  } & MapContainerProps &
    MapOptions
> = ({ children, ...rest }) => {
  return (
    <MapContainer
      className='h-full flex-1'
      {...rest}
      style={
        {height: "100%"}
      }
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
      />
      {children}
    </MapContainer>
  )
}

export default Map