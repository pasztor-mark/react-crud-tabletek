import Home from "./Home";
import Pagination from "./Pagination";
import TabletFelvetel from "./TabletFelvetel";
import TabletLista from "./TabletLista";
import TabletTorles from "./TabletTorles";

export default function Minden() {
    return (
        <>
            <Home></Home>
            <Pagination>

            </Pagination>
            <TabletLista/>
            <TabletFelvetel/>
            <TabletTorles/>
        </>
    )
}