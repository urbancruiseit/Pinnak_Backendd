import { app } from "./app.js";
import { connectMySQL } from "./config/mySqlDB.js";
import { admin } from "./config/firebase.js";

const PORT = process.env.PORT || 5000;
connectMySQL();

// Check Firebase connection
if (admin.apps.length) {
  console.log("✅ Firebase connected successfully");
} else {
  console.log("⚠️ Firebase not connected");
}

// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
   console.log(`🔥 Firebase API: http://localhost:${PORT}/api/v1/firebase`);

});
