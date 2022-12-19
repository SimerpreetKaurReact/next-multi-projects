import path from "path";
import fs from "fs/promises";

import Link from "next/link";
function HomePage(props) {
  return (
    <ul>
      {props.products.map((ele) => (
        <li key={ele.id}>
          <Link href={`/${ele.id}`}>{ele.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonDate = await fs.readFile(filePath);
  const data = JSON.parse(jsonDate);
  if (!data) {
    return { redirect: { destination: "/no-data" } };
  } //so if data doest nt exists then redirect prop can be used to redirect to some other route
  if (data.products.length == 0) {
    return { notFound: true };
    //this not found prop will now show 404 not found page if this data is not found to the client
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 60,
    //so page should be regenrated every 60sec instead of only at build time,
    //which happens otherwise with getStaticProps
  };
}

export default HomePage;

// in the current page there is not client side data fetching only static generation at build
// time, followed by prerendering this page on server every 30 sec, because of the revalidate
