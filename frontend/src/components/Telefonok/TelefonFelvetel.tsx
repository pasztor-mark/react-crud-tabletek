import { useState } from "react"

export default function TelefonFelvetel(){
    const [brand, setBrand] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        const newPhone = {
            brand: brand,
            model: model,
            price: price,
        }
        //console.log(brand + ", " + model + ": " + price);
        try{
            const response = await fetch('http://localhost:3000/phones', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPhone)
            })
            if (!response.ok){
                throw new Error(`Szerverhiba: ${response.status}`);
            }
            setSuccess(true);
            setBrand('');
            setModel('');
            setPrice(0);

        } catch (err) {
            setError(err.message);
        } finally {
            // ...
        }
    }

    return <>
        <h1>Telefonok</h1>
        <h2>Menü</h2>
            <a href="/telefonlista">Telefonok listája</a><br/>
            <a href="/telefonfelvetel">Telefon felvétele</a><br/>
            <a href="/telefontorles">Telefonok törlése</a><br/>
        <h2>Telefonok felvételek</h2>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Brand:</p>
                <input 
                    type="text" 
                    value={brand}
                    required
                    onChange={ (e) => setBrand(e.target.value) }
                />
            </label>
            <label>
                <p>Model:</p>
                <input 
                    type="text" 
                    value={model}
                    required
                    onChange={ (e) => setModel(e.target.value) }
                />
            </label>   
            <label>
                <p>Price:</p>
                <input 
                    type="number" 
                    value={price}
                    required
                    onChange={ (e) => setPrice(parseInt(e.target.value)) }
                />
            </label>
            <button type="submit">Telefon felvétele</button>                   
        </form>
        { error && <p>Hiba történt: {error}.</p> }
        { success && <p>Sikeres a telefonfelvétel</p> }
    </>
}