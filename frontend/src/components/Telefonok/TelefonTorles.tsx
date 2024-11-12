import { useEffect, useState } from "react"


interface Phone {
    Id: number;
    Brand: string;
    Model: string;
    Price: number;
}

export default function TelefonTorles() {

    const [phones, setPhones] = useState<Phone[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState<string>("");
    
    const handleDelete = async(id) => { 
        const answer = confirm("Biztosan akarod törölni?");
        if(answer){
            //alert("Törlendő telefon: " + id) 
            try {
                const response = await fetch(`http://localhost:3000/phones/${id}`, {
                    method: 'DELETE',
                } )
                setPhones(phones.filter( (phone)=>phone.Id !== id))
            } catch (err) {
                //...
            }
        }
    }

    useEffect(() => {
        fetch("http://localhost:3000/phones")
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
                setPhones(data);
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
        <h1>Telefonok</h1>
        <h2>Menü</h2>
            <a href="/telefonlista">Telefonok listája</a><br/>
            <a href="/telefonfelvetel">Telefon felvétele</a><br/>
            <a href="/telefontorles">Telefonok törlése</a><br/>
        <h2>Telefonok törlése</h2>
        
        <ul>
            {phones.map((phone) => (
                    <li key={phone.Id}>
                        {phone.Brand}: {phone.Model} - {phone.Price}
                        <span
                            style={{ cursor: 'pointer', marginLeft: '10px'}}
                            onClick={ () => handleDelete(phone.Id) }
                        >törlés</span>
                    </li>
                    )
                )
            }
        </ul>
    </>
}