import Layout from "@/Layout/home/Layout";
import { useGetMeQuery } from "./store/features/auth/auth.api";

function App() {
  const { data: user } = useGetMeQuery();
  console.log("getUserResponse", user?.data.account.role);
  return <Layout />;
}

export default App;
