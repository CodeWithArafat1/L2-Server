import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProducts } from "../service/product.service";
import type { IProduct } from "../types/product.types";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  let products = readProducts();

  const urlParts = url?.split("/");
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  if (url === `/products` && method === "GET") {
    try {
      sendResponse(res, 200, true, "Data retrive successfully", products);
    } catch (error) {
      sendResponse(res, 500, false, "Server Error", error);
    }
  } else if (method === "POST" && url === "/products") {
    try {
      const body = await parseBody(req);
      const newProduct = {
        id: Date.now(),
        ...body,
      };
      products.push(newProduct);
      insertProduct(products);
      sendResponse(res, 200, true, "Product created successfully!", products);
    } catch (error) {
      sendResponse(res, 500, false, "Server Error", error);
    }
  } else if (method === "PUT" && id !== null) {
    try {
      const body = await parseBody(req);
      const index = products.findIndex((p: IProduct) => p.id === id);
      products[index] = { id: products[index].id, ...body };
      insertProduct(products);
      sendResponse(
        res,
        200,
        true,
        "Product updated successfully!",
        products[index],
      );
    } catch (error) {
      sendResponse(res, 500, false, "Server Error", error);
    }
  } else if (method === "GET" && id !== null) {
    try {
      const findProduct = products.find((p: IProduct) => p.id === id);
      if (findProduct) {
        sendResponse(res, 200, true, "product get successfully", findProduct);
      } else {
        sendResponse(res, 404, false, "404 Not found", null);
      }
    } catch (error) {
      sendResponse(res, 500, false, "Server Error", error);
    }
  } else if (method === "DELETE" && id !== null) {
    try {
      const findIndex = products.findIndex((p: IProduct) => p.id === id);
      if (findIndex !== -1) {
        products.splice(findIndex, 1);
        insertProduct(products);
        sendResponse(res, 200, true, "Product deleted successfully!", null);
      } else {
        sendResponse(res, 404, false, "404 Not found", null);
      }
    } catch (error) {
      sendResponse(res, 500, false, "Server Error", error);
    }
  } else {
    sendResponse(res, 404, false, "404 Not found", null);
  }
};
