import React, { useEffect, useState } from "react";
import useSWR from "swr";
const LastSales = (props) => {
  const [sales, setSales] = useState(props.sales);
  function fetcher(url) {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  const { data, error } = useSWR(
    "https://mealapp-f83a3-default-rtdb.firebaseio.com/meals.json",
    fetcher
  );

  console.log(data, error);

  useEffect(() => {
    console.log(data, error);

    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);
  console.log(data, error);

  if (error) {
    return <p>Failed to load</p>;
  }
  if (!data && !sales) {
    return <p>Loading...</p>;
  }
  return (
    <ul>
      {sales.map((sale) => (
        <li>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export default LastSales;

export async function getStaticProps() {
  const responseJSON = await fetch(
    "https://react-project-61e92-default-rtdb.firebaseio.com/sales.json"
  );

  const data = responseJSON.json();
  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return { props: { sales: transformedSales } };
}
