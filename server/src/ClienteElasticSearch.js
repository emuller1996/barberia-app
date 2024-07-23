import { Client } from "@elastic/elasticsearch";

export const client = new Client({
  node: "https://elasticsearch-production-3351.up.railway.app/",

  
});
