import { useState, useEffect } from "react";
import { Tablet } from "../../types";
import TabletKartya from "../TabletKartya";
export function Home() {
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [errorServer, setErrorServer] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/tabletek")
      .then((response) => {
        if (response.status === 404) {
          setErrorServer("A kért erőforrás nem található (404)!");
          //throw new Error('A kért erőforrás nem található (404)!');
        }
        if (!response.ok) {
          setErrorServer(`Server responded with status ${response.status}`);
          //throw new Error(`Server responded with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTablets(data);
        setLoading(false);
        //console.log(data);
      })
      .catch((error) => {
        //console.log(error.message)
        setError(error.message);
      });
  }, []);

  if (errorServer) {
    return <p>{errorServer}</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Hiba történt: {error}.</p>;
  }
  const utolso3Tablet = tablets.sort((a, b) => b.id - a.id).slice(0, 3);
  const legdragabb = tablets.reduce((max, tablet) => {
    return tablet.ar > max.ar ? tablet : max;
  });
  const legolcsobb = tablets.reduce((min, tablet) => {
    return tablet.ar < min.ar ? tablet : min;
  });
  return (
    <>
      <section>
        <h1 className="text-3xl font-bold">Üdvözlünk a webshopunkban!</h1>
      </section>
      <article className="my-3 border border-white p-2 rounded-xl">
        <h3 className="text-xl">Legújabb kínálatunk</h3>
        {utolso3Tablet.map((tablet) => (
          <TabletKartya tablet={tablet} torles={false} />
        ))}
      </article>

      <article className="flex gap-3 items-center flex-row">
        <div className="flex-1">
          <h3 className="text-2xl">Pénzes vásárlóinknak kiemelt:</h3>
          <TabletKartya tablet={legdragabb} torles={false} />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl">Szerényebb vásárlóinknak kiemelt:</h3>
          <TabletKartya tablet={legolcsobb} torles={false} />
        </div>
      </article>
    </>
  );
}

export default Home;
