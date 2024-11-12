import { useState } from "react";

export default function TabletFelvetel() {
  
  const [error, setError] = useState(null);
  

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let ujTablet: any = {};
    formData.forEach((value, key) => (ujTablet[key] = value));
    console.log(ujTablet);
    console.log(typeof e)
    try {
      const response = await fetch("http://localhost:3000/tabletek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ujTablet),
      });
      if (!response.ok) {
        throw new Error(`Szerverhiba: ${response.status}`);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <h2>Tabletek felvétele</h2>
      {error && <p className="text-red">Error: {error}</p>}
      <form
        className="grid grid-cols-2 text-right w-1/3 p-5 space-x-3 bg-neutral-800 rounded-xl m-5"
        onSubmit={handleSubmit}
      >
        <label htmlFor="termek_nev">Termék név:</label>
        <input type="text" id="termek_nev" name="termek_nev" required />

        <label htmlFor="operacios_rendszer">Operációs rendszer:</label>
        <select id="operacios_rendszer" name="operacios_rendszer" required>
          <option value="Android">Android</option>
          <option value="iOS">iOS</option>
          <option value="Windows">Windows</option>
          <option value="Fire OS">Fire OS</option>
        </select>

        <label htmlFor="processzor_orajel">Processzor órajel (GHz):</label>
        <input
          type="number"
          id="processzor_orajel"
          name="processzor_orajel"
          step="0.1"
          required
        />

        <label htmlFor="processzormagok_szama">Processzormagok száma:</label>
        <input
          type="number"
          id="processzormagok_szama"
          name="processzormagok_szama"
          required
        />

        <label htmlFor="kijelzo_merete">Kijelző mérete (col):</label>
        <input
          type="number"
          id="kijelzo_merete"
          name="kijelzo_merete"
          step="0.1"
          required
        />

        <label htmlFor="kijelzo_felbontasa">Kijelző felbontása:</label>
        <input
          type="text"
          id="kijelzo_felbontasa"
          name="kijelzo_felbontasa"
          required
        />

        <label htmlFor="ram_merete">RAM mérete (GB):</label>
        <input type="number" id="ram_merete" name="ram_merete" required />

        <label htmlFor="ar">Ár (Ft):</label>
        <input type="number" id="ar" name="ar" required />

        <button
          className="bg-neutral-200 text-black p-2 text-lg rounded-3xl col-span-2 mt-5 hover:bg-neutral-300"
          type="submit"
        >
          Bevitel
        </button>
      </form>
    </>
  );
}
