// server.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import firebaseConfig from "./firebase.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const server = express();
server.use(bodyParser.json());
server.use(cors()); // Habilitar CORS

server.post("/add-user", async (req, res) => {
  try {
    const { email, username, password, rol } = req.body;

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const docRef = await addDoc(collection(db, "Users"), {
      email,
      username,
      password: hashedPassword,
      last_login: null,
      rol,
    });
  } catch (error) {
    res.status(500).send("Error al agregar el usuario: " + error.message);
  }
});

server.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Realizar una consulta para obtener el documento del usuario por email
    const usersCollection = collection(db, "Users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(401).send("Usuario no encontrado.");
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    // Comparar la contraseña ingresada con la contraseña hasheada
    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return res.status(401).send("Contraseña incorrecta.");
    }

    // Actualizar el campo last_login
    await updateDoc(doc(db, "Users", userDoc.id), {
      last_login: new Date(),
    });

    res.status(200).send(`Inicio de sesión exitoso para el usuario: ${userData.email}`);
  } catch (error) {
    res.status(500).send("Error al iniciar sesión: " + error.message);
  }
});

server.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});

const checkConnection = async () => {
  try {
    const docRef = doc(db, "test-collection", "test-doc");
    await getDoc(docRef);

    console.log("Conexión exitosa a la base de datos.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};

checkConnection();