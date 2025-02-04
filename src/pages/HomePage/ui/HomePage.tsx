import { RoutesPath } from "@/shared/Router/config/RouterConfig";
import { Link } from "react-router-dom";

const HomePage = () => {
  return <Link to={RoutesPath.SeminarsPage}>Seminars Page</Link>;
};

export default HomePage;
