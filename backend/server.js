import 'dotenv/config';
import connectDB from './config/db.js';
import app from './app.js';

const PORT = process.env.PORT || 5000;

console.log("MONGO_URI chargée :", process.env.MONGO_URI ? "OK" : "NON");

connectDB();

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});