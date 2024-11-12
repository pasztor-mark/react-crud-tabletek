import {} from 'react'
import { TabletKartyaProps } from '../types'

export function TabletKartya({tablet}: TabletKartyaProps) {

   return (
        <article className='tabletKartya'>
            <p className='tablet-id' id={`${tablet.id}`}>#{tablet.id}</p>
            <div>

            <h3>{tablet.termek_nev}</h3>
            <sub>{tablet.ar} Ft. </sub>
            </div>
        </article>
    )
}

export default TabletKartya