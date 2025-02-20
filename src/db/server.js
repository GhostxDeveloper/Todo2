import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import firebaseConfig from "./firebase.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const server = express();
server.use(bodyParser.json());
server.use(cors());

server.post("/add-user", async (req, res) => {
  try {
    const { email, username, password, rol } = req.body;

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

server.post("/add-task", async (req, res) => {
  try {
    const { name, description, timeUntilFinish, remindMe, status, category, tag, userId } = req.body;

    const docRef = await addDoc(collection(db, "Tasks"), {
      name,
      description,
      timeUntilFinish,
      remindMe,
      status,
      category,
      tag,
      userId,
      created_at: new Date(),
    });

    res.status(200).send("Tarea agregada exitosamente con ID: " + docRef.id);
  } catch (error) {
    res.status(500).send("Error al agregar la tarea: " + error.message);
  }
});

server.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const usersCollection = collection(db, "Users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(401).send("Usuario no encontrado.");
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return res.status(401).send("Contraseña incorrecta.");
    }

    await updateDoc(doc(db, "Users", userDoc.id), {
      last_login: new Date(),
    });

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: userDoc.id,
        email: userData.email,
        username: userData.username,
        rol: userData.rol
      }
    });
  } catch (error) {
    res.status(500).send("Error al iniciar sesión: " + error.message);
  }
});

server.get("/tasks/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const tasksCollection = collection(db, "Tasks");
    const q = query(tasksCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const tasks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send("Error al obtener las tareas: " + error.message);
  }
});

server.put("/tasks/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { name, description, timeUntilFinish, remindMe, status, category, tag, userId } = req.body;

    const taskRef = doc(db, "Tasks", taskId);
    await updateDoc(taskRef, {
      name,
      description,
      timeUntilFinish,
      remindMe,
      status,
      category,
      tag,
      userId,
      updated_at: new Date(),
    });

    res.status(200).send("Tarea actualizada exitosamente");
  } catch (error) {
    res.status(500).send("Error al actualizar la tarea: " + error.message);
  }
});

server.delete("/tasks/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    await deleteDoc(doc(db, "Tasks", taskId));
    res.status(200).send("Tarea eliminada exitosamente");
  } catch (error) {
    res.status(500).send("Error al eliminar la tarea: " + error.message);
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