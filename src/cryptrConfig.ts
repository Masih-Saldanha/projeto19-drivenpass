import Cryptr from "cryptr";
import "./setup.js";

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

export default cryptr;