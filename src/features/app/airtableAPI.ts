import Airtable from "airtable";

//see readme for .env
Airtable.configure({
  apiKey: process.env.REACT_APP_AIRTB_KEY,
});

const base = new Airtable().base(process.env.REACT_APP_DB_ID || "");

export async function getData(
  table: string,
  ids: string[] = [],
  use_name: boolean = false
) {
  const field = use_name ? "{Name}" : "RECORD_ID()";
  let query: string[] = [];

  for (let id of ids) {
    query.push(`${field}='${id}'`);
  }

  const final_query = `OR(${query.join(",")})`;

  const res = await base(table)
    .select({
      filterByFormula: `OR(${final_query})`,
    })
    .firstPage();

  return res.map((record) => {
    const id = record.id;
    const name = record.get("Name");
    const data = record.get("Classes") || record.get("Students");

    return {
      id,
      name,
      data,
    };
  });
}
