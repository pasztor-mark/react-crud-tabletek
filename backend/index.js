import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();

app.use(cors());

app.use(express.json());

const db = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "tabletek",
  })
  .promise();

app.get("/tabletek", async (req, res) => {
  try {
    const temp = await db.query("SELECT * FROM tabletek");
    const rows = temp[0];
    const fields = temp[1];
    res.status(200).json(rows);
  } catch (error) {
    console.error(`Hiba a tabletek betöltésénél: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/tabletek/:id", async (req, res) => {
  try {
    const {id} = req.params.id
    const temp = await db.query("SELECT * FROM tabletek WHERE id = ?", id);
    const rows = temp[0];
    const fields = temp[1];
    res.status(200).json(rows);
  } catch (error) {
    console.error(`Hiba a tabletek betöltésénél: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/tabletek", async (req, res) => {
  try {
    const {
      termek_nev,
      operacios_rendszer,
      processzor_orajel,
      processzormagok_szama,
      kijelzo_merete,
      kijelzo_felbontasa,
      ram_merete,
      ar,
    } = req.body;

    //SQLT CSATOLNI!!!
    if (termek_nev.length < 1) {
      return res
        .status(400)
        .json({ error: "A terméknév min. 1 karakterből állhat!" });
    }
    if (processzor_orajel < 1 || processzor_orajel > 6) {
      return res
        .status(400)
        .json({ error: "Érvénytelen processzor órajel érték." });
    }
    if (ar < 1) {
      return res.status(400).json({ error: "Érvénytelen ár érték." });
    }
    if (processzormagok_szama < 1 || processzormagok_szama > 6) {
      return res
        .status(400)
        .json({ error: "Érvénytelen processzor mag szám érték." });
    }
    if (kijelzo_merete < 1 || kijelzo_merete > 32) {
      return res
        .status(400)
        .json({ error: "Érvénytelen kijelző méret érték." });
    }
    if (ram_merete < 1 || ram_merete > 32) {
      return res.status(400).json({ error: "Érvénytelen RAM méret érték." });
    }
    if (
      parseInt(kijelzo_felbontasa.split("x")[0]) > 4500 ||
      parseInt(kijelzo_felbontasa.split("x")[1]) > 4500 ||
      parseInt(kijelzo_felbontasa.split("x")[0]) < 360 ||
      parseInt(kijelzo_felbontasa.split("x")[1]) < 360
    ) {
      return res.status(400).json({
        error:
          "Érvénytelen kijelző felbontás érték. Helyes formátum: 1920x1080",
      });
    }

    const query =
      "INSERT INTO tabletek (termek_nev, operacios_rendszer, processzor_orajel, processzormagok_szama, kijelzo_merete, kijelzo_felbontasa, ram_merete, ar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    await db.execute(query, [
      termek_nev,
      operacios_rendszer,
      processzor_orajel,
      processzormagok_szama,
      kijelzo_merete,
      kijelzo_felbontasa,
      ram_merete,
      ar,
    ]);
    res.status(200).json({ message: "Tablet sikeresen hozzáadva!" });
  } catch (error) {
    console.error(`Nem sikerült hozzáadni a tableteket: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/tabletek/:id', async (req, res) => {
  const tabletId = parseInt(req.params.id);  
  const query = `SELECT *
  FROM tabletek
  WHERE
  id = ?`
  const tablet = await db.execute(query, tabletId)

  if (!tablet) {
    return res.status(404).json({ error: 'Tablet not found' });
  }
  return res.json(tablet);  
});
app.delete("/tabletek/:tabletId", async (req, res) => {
  try {

    let tabletId = parseInt(req.params.tabletId);
    const [rows, fields] = await db.query("DELETE FROM tabletek WHERE id =?", [
      tabletId,
    ]);
    if (rows.length === 0) {
      res.status(404).json({ error: "Tablet not found" });
    } else {
      res.status(200).json({ message: "Tablet kitörölve" });
    }
  } catch (error) {
    console.error(`Sikertelen törlés:  ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/tabletek/:tabletId", async (req, res) => {
  try {

    let tabletId = parseInt(req.params.tabletId);
    if (tabletId === 0 | tabletId === null) {
      return
    } 
    const {termek_nev, ar} = req.body
    
    
    const query = 'UPDATE tabletek SET termek_nev = ?, ar = ? WHERE id = ?'
    await db.execute(query, [termek_nev, ar, tabletId])
  } catch (error) {
    console.error(`Sikertelen törlés:  ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get('/pages', async (req, res) => {
  
  const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {        
        const countResult = await db.query('SELECT COUNT(*) as total FROM tabletek');
        const total = countResult[0][0].total;
        const temp = await db.query('SELECT * FROM tabletek LIMIT ? OFFSET ?', [limit, offset]);
        const rows = temp[0];
        res.status(200).json({
            data: rows,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error(`Error retrieving phones ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(3000);
