"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173",
}));
app.get("/", (req, res) => {
    console.log("ENV Var::", process.env.JWT_SECRET);
    res.json({
        msg: "Hi There",
    });
});
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.send("Signed In");
}));
app.get("/user", (req, res) => {
    const token = req.cookies.token;
    console.log("Token::", token);
    const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
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
