import { useState } from "react";
import { TabletKartyaProps } from "../types";
import TorlesMegerosites from "./Tabletek/TorlesMegerosites";

export function TabletKartya({ tablet, torles }: TabletKartyaProps) {
    const [mutat, setMutat] = useState(false)
  return (
    <article className="flex flex-col lg:flex-row  justify-between bg-neutral-800 p-4 rounded-xl">
      <p
        className=" text-2xl m-5 p-2  border rounded-full border-white"
        id={`${tablet.id}`}
      >
        #{tablet.id}
      </p>
      <div className="flex flex-col gap-5 justify-center ml-12 text-left flex-1">
        <h3 className="text-2xl">{tablet.termek_nev}</h3>
        <p>{tablet.ar} Ft. </p>
      </div>
      <div className="flex-col flex justify-center items-center text-center">
        <h3>Részletek</h3>
        <hr />
        <table cellPadding={5} border={1} className="table-auto">
          <thead>
            <tr>
              <th>Operációs rendszer</th>
              <th>Processzor órajel (GHz)</th>
              <th>Processzormagok száma</th>
              <th>Kijelző mérete (col)</th>
              <th>Kijelző felbontása</th>
              <th>RAM mérete (GB)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{tablet.operacios_rendszer}</td>
              <td>{tablet.processzor_orajel}</td>
              <td>{tablet.processzormagok_szama}</td>
              <td>{tablet.kijelzo_merete}</td>
              <td>{tablet.kijelzo_felbontasa}</td>
              <td>{tablet.ram_merete}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {torles && (
        <div className="w-10 h-10 flex justify-center items-center m-auto mx-5 ">
          <button onClick={() => {setMutat((prevState) => !prevState)}} className="bg-red-400 w-full h-full rounded-full hover:bg-red-500">
            X
          </button>
          
          <TorlesMegerosites tablet={tablet} className={mutat ? "block" : "hidden"}/>
        </div>
      )}
    </article>
  );
}

export default TabletKartya;
