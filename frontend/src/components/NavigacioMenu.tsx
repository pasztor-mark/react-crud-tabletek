import {} from "react";

export function Navigacio() {
  return (
    <>
      <nav
        style={{
          display: "flex",
          backgroundColor: "#1f1f1f",
          width: "100vw",
          padding: 8,
          fontSize: 24,
          marginBottom: 28  ,
          justifyContent: "space-evenly",
          margin: "auto",
        }}
      >
        <a href="/telefonlista">Telefonok listája</a>
        <br />
        <a href="/telefonfelvetel">Telefon felvétele</a>
        <br />
        <a href="/telefontorles">Telefonok törlése</a>
        <br />
      </nav>
    </>
  );
}

export default Navigacio;
