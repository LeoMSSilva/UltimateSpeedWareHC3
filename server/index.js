import express from "express";
import {
  getCombos,
  processCombos,
  setCombosAvailability,
  getAvailableCombos,
} from "./awsDynamo.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => res.json({ api: "SPEEDWARE-API", version: 1.0 }));

app.get("/combos", async (req, res) => {
  try {
    getCombos().then((data) => {
      return res.json(data);
    });
  } catch (error) {
    res.status(500).json({ err: "SERVER ERROR" });
  }
});

app.get("/combos/available", async (req, res) => {
  try {
    getAvailableCombos().then((data) => {
      return res.json(data);
    });
  } catch (error) {
    res.status(500).json({ err: "SERVER ERROR" });
  }
});

app.post("/combos", async (req, res) => {
  try {
    const orderId = req.body.OrderId;
    await processCombos(orderId);
    return res.status(200).json({ success: "Combo Registered Successfully!" });
  } catch (error) {
    res.status(500).json({ err: "SERVER ERROR" });
  }
});

app.put("/combos", (req, res) => {
  try {
    const combos = req.body;
    setCombosAvailability(combos);
    return res.status(200).json({ success: "Combos update successful" });
  } catch (error) {
    return res.status(500).json({ err: "SERVER ERROR" });
  }
});

app.listen(3000, () => console.log("Servidor Iniciado na porta 3000"));
