import { useParams } from "react-router-dom";
import TabletKartya from "./TabletKartya";
import { useEffect, useState } from 'react'
import { Tablet } from "../types";

export default function KiemeltTablet() {
    const { id } = useParams<{ id: string }>();
    console.log(id)
    const [tablet, setTablet] = useState<Tablet>()
    useEffect(() => {
        fetch(`http://localhost:3000/tabletek/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {

                return response.json()
            })
            .then((data) => {
                setTablet(data);
                console.log(data)
            })
            .catch((error) => {
                //console.log(error.message) 
                
            })
            
    }, [])
    return (
        <>  
        <TabletKartya tablet={tablet!} torles={false} />
        </>
    )
}