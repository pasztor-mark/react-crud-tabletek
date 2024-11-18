import {useState, useEffect} from 'react'
import { Tablet } from '../../types';

export default function UpdateTablet() {
    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        fetch("http://localhost:3000/tabletek")
            .then((response) => { 
                return response.json() 
            })
            .then((data) => {
                setTablets(data);
                setLoading(false);
                //console.log(data); 
            })
            .catch((error) => { 
                //console.log(error.message) 
                
            })
    }, [])
    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const termek_nev = formData.get("termek_nev")
        const id = formData.get("id")
        const ar = formData.get("ar")
        await fetch(`http://localhost:3000/tabletek/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({termek_nev, ar}) 
        })
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <select>
                <option value={0}>Frissítendő tablet</option>
                {
                    tablets.map((tablet) => (
                        <option value={tablet.id}>{tablet.termek_nev}</option>
                    ))
                }
            </select>
            <input type="text" name='termek_nev' placeholder='Új terméknév' />
            <input type="number" name='termek_nev' placeholder='Új ár' />
            <button type='submit'>Frissítés</button>
        </form>
        </>
    )
}