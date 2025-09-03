// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import express from "npm:express@4.18.2";
import exchanger from "./exchanger.ts";
const app = express();
app.use("/mockserver", exchanger);
app.listen(8000);
