import ViatorService from "../../../lib/viator-service";

interface ProductDetails {
  productCode: string;
  title: string;
  description: string;
}

export default async function ProductPage({ params }: { params: { code: string } }) {
  const api = new ViatorService({
    apiKey: process.env.VIATOR_API_KEY || "",
    partnerId: process.env.VIATOR_PARTNER_ID,
  });

  const product: ProductDetails = await api.getProduct(params.code);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p>{product.description}</p>
      <h2 className="font-bold mt-4">Product Code: {product.productCode}</h2>
    </div>
  );
}