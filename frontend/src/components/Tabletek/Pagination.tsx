import { useEffect, useState } from "react";
import { Tablet } from "../../types";
import TabletKartya from "../TabletKartya";

export default function Pagination() {
    const [tablets, setTablets] = useState<Tablet[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    function fetchData(page: number) {
        fetch(`http://localhost:3000/pages?page=${page}&limit=3`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setTablets(data.data);
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
            })
            
    }
    useEffect(() => {
        fetchData(currentPage)
    }, [currentPage])
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    return (
        <>
        <input type="text" />
            {tablets.map((tab) => (
                    <TabletKartya torles={false} key={tab.id} tablet={tab}/>

                    
                    )
                )
            }
            <div className="flex flex-row justify-between p-3">
                <button onClick={() => handlePageChange(currentPage -1)} className="bg-neutral-800 p-3">
                    Előző
                </button>
                <p>{currentPage}/{totalPages}</p>
                <button onClick={() => handlePageChange(currentPage +1)} className="bg-neutral-800 p-3">
                    Következő
                </button>
            </div>
        </>
    )
}