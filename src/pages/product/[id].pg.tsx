import Head from "next/head";
import Product from "../../components/__pages/product/Product";
import { ProductType } from "../../utils/ts-types/__store/typesProduct";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import { getContentfulData } from "../../lib/contentful/contentful";
import { oneProductQuery, allProductsQuery } from "../../lib/contentful/query";
import {
  CmsAllProductsType,
  CmsProductType,
} from "../../utils/ts-types/contentful-types";

export default function ProductsPage({
  product,
  message,
}: {
  product: ProductType;
  message?: string;
}) {
  return (
    <>
      <Head>
        <title>Single Product Page</title>
        <meta name="description" content="Details for 1907Store product" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Product product={product} message={message} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { data } = (await getContentfulData(
    allProductsQuery
  )) as CmsAllProductsType;
  const paths = data?.productCollection.items.map((item) => ({
    params: { id: item.sys.id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { data } = (await getContentfulData(oneProductQuery, {
    id: params!.id,
  })) as { data: { product: CmsProductType } };

  if (data === undefined) {
    return {
      props: {
        message: "Server Error Occurred",
        revalidate: 60,
      },
    };
  }

  if (!data.product) {
    return {
      props: {
        message: "Not in Stock",
        revalidate: 60,
      },
    };
  }
  data.product.id = data.product.sys.id;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { sys, ...rest } = data.product;

  return {
    props: {
      product: rest,
      revalidate: 60,
    },
  };
};

interface Props {
  product?: ProductType;
  message?: string;
}

interface Params extends ParsedUrlQuery {
  id: string;
}
