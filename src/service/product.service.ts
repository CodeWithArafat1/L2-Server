import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "./src/database/db.json");

export const readProducts = () => {
  const products = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(products);
};

export const insertProduct = (payload: any) => {
  //   const products = readProducts();
  //   products.push(payload);
  fs.writeFileSync(filePath, JSON.stringify(payload));
};
