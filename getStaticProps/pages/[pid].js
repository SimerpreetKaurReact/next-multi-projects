import React from "react";
import path from "path";
import fs from "fs/promises";

const ProductDetailsPage = (props) => {
  const { loadedProduct } = props;
  if (!loadedProduct) return <p>Loading...</p>;
  return (
    <div>
      <h1>ProductDetailsPage</h1>
      <h2>{loadedProduct.title}</h2>
      <p>{loadedProduct.description}</p>
    </div>
  );
};
export async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonDate = await fs.readFile(filePath);
  const data = JSON.parse(jsonDate);
  return data;
}
export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();
  const product = data.products.find((product) => product.id === productId);
  if (!product) {
    return { notFound: true };
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
}
export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));
  return {
    // paths: [
    //   { params: { pid: "p1" } },
    //   { params: { pid: "p2" } },
    //   { params: { pid: "p3" } },
    // ],
    paths: pathsWithParams,
    fallback: true,
  };
}

export default ProductDetailsPage;
