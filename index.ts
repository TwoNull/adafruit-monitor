import { monitor } from "./src/monitor";
import dotenv from "dotenv";

dotenv.config();

const query = process.env.SEARCH_QUERY!;

monitor(query);
