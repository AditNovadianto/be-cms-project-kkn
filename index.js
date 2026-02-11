import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import { connectMongoDB } from "./config/db_mongo.js";
import authRoute from "./routes/authRoute.js";
import roleRoute from "./routes/roleRoute.js";
import sectionRoute from "./routes/sectionRoute.js";
import berandaRoute from "./routes/berandaRoute.js";
import demografiRoute from "./routes/demografiRoute.js";
import petaWilayahRoute from "./routes/petaWilayahRoute.js";
import visiMisiRoute from "./routes/visiMisiRoute.js";
import batasWilayahRoute from "./routes/batasWilayahRoute.js";
import pemerintahanRoute from "./routes/pemerintahanRoute.js";
import potensiRoute from "./routes/potensiRoute.js";
import sejarahRoute from "./routes/sejarahRoute.js";
import wisataRoute from "./routes/wisataRoute.js";
import saranaPrasaranaRoute from "./routes/saranaPrasaranaRoute.js";
import galeriRoute from "./routes/galeriRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Test database SQL connection
async function testDBConnection() {
  try {
    await db.query("SELECT 1");
    console.log("✅ Database SQL connected successfully!");
    return true;
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error.message);
    return false;
  }
}

testDBConnection();
//

// Test database MongoDB connection
connectMongoDB();
//

app.get("/", (req, res) => {
  res.send("Welcome to the allakuangdesaku API");
});

app.use(authRoute);
app.use(sectionRoute);
app.use(berandaRoute);
app.use(demografiRoute);
app.use(petaWilayahRoute);
app.use(visiMisiRoute);
app.use(batasWilayahRoute);
app.use(pemerintahanRoute);
app.use(potensiRoute);
app.use(sejarahRoute);
app.use(wisataRoute);
app.use(saranaPrasaranaRoute);
app.use(galeriRoute);
app.use(roleRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
