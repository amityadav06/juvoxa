import { useEffect, useState } from "react";
import MyLoader from "./components/MyLoader";
import { SortingTable } from "./components/SortingTable";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://canopy-frontend-task.vercel.app/api/transactions"
      );
      const resJson = await res.json();
      setData(resJson.transactions);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <MyLoader />;
  }

  return (
    <div className="App">
      <SortingTable mock_data={data} />
    </div>
  );
}
