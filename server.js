import express from "express";
import cors from "cors";
import mysql from "mysql2";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

const port = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "students2004",
  password: "students2004",
  database: "students2004",
});

app.post("/add_user", (req, res) => {
  let sql =
    "INSERT INTO student_details (`name`, `email`, `gender`, `age`) VALUES(?)";
  const values = [req.body.name, req.body.email, req.body.gender, req.body.age];
  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error(err); // Ajoutez ceci pour voir l'erreur exacte dans la console
      return res.json({ message: "Something went wrong" });
    }
    return res.json({ message: "User added successfully"});
  });
});

app.get("/get_users", (req, res) => {
    let sql = "SELECT * FROM student_details";
    db.query(sql, (err, result) => {
        if (err) {
        console.error(err); // Ajoutez ceci pour voir l'erreur exacte dans la console
        return res.json({ message: "Something went wrong" });
        }
        return res.json(result);
    });
} )

app.get("/get_users/:id", (req, res) => {
    const id = req.params.id;
    let sql = "SELECT * FROM student_details WHERE id = ?";

    db.query(sql,[id], (err, result) => {
        if (err) {
        console.error(err); // Ajoutez ceci pour voir l'erreur exacte dans la console
        return res.json({ message: "Something went wrong" });
        }
        return res.json(result);
    });
} )

app.put("/edit_user/:id", (req, res) => {
    const id = req.params.id;
    let sql = "UPDATE student_details SET `name` = ?, `email` = ?, `gender` = ?, `age` = ? WHERE id = ?";
    const values = [req.body.name, req.body.email, req.body.gender, req.body.age];
    db.query(sql, [...values, id], (err, result) => {
        if (err) {
        console.error(err); // Ajoutez ceci pour voir l'erreur exacte dans la console
        return res.json({ message: "Something went wrong" });
        }
        return res.json({ message: "User updated successfully"});
    });
})


app.delete("/delete_user/:id", (req, res) => {
    const id = req.params.id;
    let sql = "DELETE FROM student_details WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
        console.error(err); // Ajoutez ceci pour voir l'erreur exacte dans la console
        return res.json({ message: "Something went wrong" });
        }
        return res.json({ message: "User deleted successfully"});
    }); 
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
