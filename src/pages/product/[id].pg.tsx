import Head from "next/head";
import Product from "../../components/__pages/product/Product";
import { testData } from "../../utils/utilsData";
import { ProductType } from "../../utils/ts-types/__store/typesProduct";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";

export default function ProductsPage({ product }: { product: ProductType }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Product product={product} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const paths = testData.map((path) => ({ params: { id: path.id } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = ({ params }) => {
  const product = params
    ? testData.find((prod) => prod.id === params.id)!
    : ({} as ProductType);
  console.log(product, params?.id, testData);
  return {
    props: {
      product,
    },
  };
};

interface Props {
  product: ProductType;
}

interface Params extends ParsedUrlQuery {
  id: string;
}
