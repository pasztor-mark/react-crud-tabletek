
import { Tablet } from '../../types'

export function TorlesMegerosites({tablet, className}: {tablet: Tablet, className?: string}) {
    const handleDelete = async (id: number) => {
        try {
            await fetch(`http://localhost:3000/tabletek/${id}`, {
                method: 'DELETE',
            } )
            window.location.reload()
            
        } catch (err) {
            
        }
    }
   return (
        <div className={`${className} fixed flex flex-col bg-neutral-900 left-[40%] top-[40%] w-[300px] h-[250px] rounded-2xl bg-neutral-900}`}>
            <div className='flex flex-col gap-4'>
                <h1 className='text-center text-lg'>Biztos szeretnéd kitörölni {tablet.id} azonosítójú {tablet.termek_nev} cikket?</h1>
                <hr />
                <p className='text-center'>Visszalépéshez kattints ismét az X gombra.</p>
                <div className='flex flex-row justify-center'>

                
                <button className='bg-red-500 p-2 text-lg rounded-2xl' onClick={() => handleDelete(tablet.id)}>Törlés</button>
                </div>
            </div>
        </div>
    )
}

export default TorlesMegerosites