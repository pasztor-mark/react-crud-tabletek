import { useEffect, useState } from "react"
import { Tablet } from "../../types";
import TabletKartya from "../TabletKartya";




export default function TabletLista() {

    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchString, setSearchString] = useState("")
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState<string>("");
    const filtered = tablets.filter((tablet) => tablet.termek_nev.toLowerCase().includes(searchString.toLowerCase()))
    
    useEffect(() => {
        fetch("http://localhost:3000/tabletek")
            .then((response) => { 
                if (response.status === 404){
                    setErrorServer('A kért erőforrás nem található (404)!');
                    //throw new Error('A kért erőforrás nem található (404)!');
                }
                if (!response.ok) {
                    setErrorServer(`Server responded with status ${response.status}`);
                    //throw new Error(`Server responded with status ${response.status}`);
                }
                return response.json() 
            })
            .then((data) => {
                setTablets(data);
                setLoading(false);
                //console.log(data); 
            })
            .catch((error) => { 
                //console.log(error.message) 
                setError(error.message);
            })
    }, [])

    if(errorServer){
        return <p>{errorServer}</p>
    }
    if(loading) { 
        return <p>Loading...</p>
    }
    if(error){
        return <p>Hiba történt: {error}.</p>
    }

    return <>
        <h1 className="text-4xl m-5">Tablet Webshop</h1>
        <input type="text" placeholder="Keresés" className="border border-white" onChange={(e) => {setSearchString(e.target.value)}}/>

        <section className="flex flex-col gap-4">
            {filtered.map((tab) => (
                    <TabletKartya torles={false} key={tab.id} tablet={tab}/>

                    
                    )
                )
            }
        </section>
    </>
}