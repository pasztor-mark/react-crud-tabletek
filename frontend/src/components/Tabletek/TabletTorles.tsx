import { useEffect, useState } from "react"
import { Tablet } from "../../types";
import TabletKartya from "../TabletKartya";

export default function TabletTorles() {

    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState<string>("");
    
    useEffect(() => {
        fetch("http://localhost:3000/tabletek")
            .then((response) => { 
                if (response.status === 404){
                    setErrorServer('A kért erőforrás nem található (404)!');
                    
                }
                if (!response.ok) {
                    setErrorServer(`Server responded with status ${response.status}`);
                    
                }
                return response.json() 
            })
            .then((data) => {
                setTablets(data);
                setLoading(false);
                
            })
            .catch((error) => { 
                
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
       
       {tablets.map((tab) => (
                    <TabletKartya torles={true} key={tab.id} tablet={tab}/>

                    
                    )
                )
            }
        
    </>
}