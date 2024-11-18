import { useEffect, useState } from "react"
import { Tablet } from "../../types";
import TabletKartya from "../TabletKartya";




export default function TabletLista() {

    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchString, setSearchString] = useState("")
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState<string>("");
    const [sortConfig, setSortConfig] = useState<{ key: keyof Tablet; direction: 'asc' | 'desc' } | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState<Tablet[]>()

    useEffect(() => {
        fetch("http://localhost:3000/tabletek")
            .then((response) => {
                if (response.status === 404) {
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
                setFiltered(data);
                setLoading(false);
                //console.log(data); 
            })
            .catch((error) => {
                //console.log(error.message) 
                setError(error.message);
            })
    }, [])

    if (errorServer) {
        return <p>{errorServer}</p>
    }
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Hiba történt: {error}.</p>
    }
    const tabletSort = (key: keyof Tablet, direction: 'asc' | 'desc') => {
        const sortedTablets = [...filtered!].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setFiltered(sortedTablets);
        setSortConfig({ key, direction });
    };
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = tablets.filter(
            (tab) =>
                tab.termek_nev.toLowerCase().includes(term) ||
                tab.operacios_rendszer.toLowerCase().includes(term) ||
                tab.ar.toString().includes(term)
        );
        setFiltered(filtered);
    };
    return <>
        <h1 className="text-4xl m-5">Tablet Webshop</h1>
        <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Márka, op. rendszer vagy ár alapján..."
        />

        <section className="flex flex-col gap-4">
            <table>
                <thead>
                    <tr>
                        <th>
                            <button
                                onClick={() => tabletSort('id', 'asc')}

                            >
                                &#8593;
                            </button>
                            #
                            <button
                                onClick={() => tabletSort('id', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>
                        <th>
                            <button
                                onClick={() => tabletSort('termek_nev', 'asc')}

                            >
                                &#8593;
                            </button>
                            Terméknév
                            <button
                                onClick={() => tabletSort('termek_nev', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>
                        <th>
                            <button
                                onClick={() => tabletSort('termek_nev', 'asc')}

                            >
                                &#8593;
                            </button>
                            Ár
                            <button
                                onClick={() => tabletSort('ar', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>

                        <th>
                            <button
                                onClick={() => tabletSort('ar', 'asc')}

                            >
                                &#8593;
                            </button>
                            Órajel
                            <button
                                onClick={() => tabletSort('processzor_orajel', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>
                        <th>
                            <button
                                onClick={() => tabletSort('kijelzo_merete', 'asc')}

                            >
                                &#8593;
                            </button>
                            Kijelző méret
                            <button
                                onClick={() => tabletSort('kijelzo_merete', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>

                        <th>
                            <button
                                onClick={() => tabletSort('kijelzo_felbontasa', 'asc')}

                            >
                                &#8593;
                            </button>
                            Kijelző felbontása
                            <button
                                onClick={() => tabletSort('kijelzo_felbontasa', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>
                        <th>
                            <button
                                onClick={() => tabletSort('ram_merete', 'asc')}

                            >
                                &#8593;
                            </button>
                            RAM
                            <button
                                onClick={() => tabletSort('ram_merete', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>




                    </tr>
                </thead>
            </table>
            {filtered!.map((tab) => (
                <TabletKartya torles={false} key={tab.id} tablet={tab} />
            )
            )
            }
        </section>
    </>
}