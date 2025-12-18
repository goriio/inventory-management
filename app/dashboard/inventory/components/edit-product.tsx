import { getProductById } from "~/data/products";
import { EditProductForm } from "./edit-product-form";

export async function EditProduct({ id }: { id: string }) {
  const product = await getProductById(id);

  return <EditProductForm product={product} />;
}
