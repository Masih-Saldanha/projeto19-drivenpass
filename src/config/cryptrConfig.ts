import Cryptr from "cryptr";
import "./dotenvConfig.js";

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

export default cryptr;