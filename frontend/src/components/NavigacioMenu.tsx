import {} from "react";

export function Navigacio() {
  return (
    <>
      <nav className="flex bg-[#1f1f1f] w-full p-8 text-white font-bold underline text-2xl mb-7 justify-evenly items-center mx-auto"

      >
        <a href="/">Kezdőlap</a>
        <br />
        <a href="/tabletek">Tabletek listája</a>
        <br />
        <a href="/tabletekadd">Tabletek felvétele</a>
        <br />
        <a href="/tabletekdelete">Tabletek törlése</a>
        <br />
        <a href="/updateTablet">Tabletek frissítése</a>
        <br />
        
      </nav>
    </>
  );
}

export default Navigacio;
