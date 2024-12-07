import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  console.log("ENV Var::", process.env.JWT_SECRET);

  res.json({
    msg: "Hi There",
  });
});

app.post("/signin", async (req, res) => {
  const payload = req.body as JwtPayload;
  const token = jwt.sign(payload, process.env.JWT_SECRET as string);
  res.cookie("token", token);
  res.send("Signed In");
});

app.get("/user", (req, res) => {
  const token = req.cookies.token;
  console.log("Token::", token);

  const verified = jwt.verify(token, process.env.JWT_SECRET as string);
  console.log("Token::", verified);
  res.send(verified);
});

app.post("/signout", (req, res) => {
  // res.clearCookie("token");
  res.cookie("token", "");
  res.send("Logged out");
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
