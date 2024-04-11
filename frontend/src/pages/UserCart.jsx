import UserCartBook from "./UserCartBook";
import UserCartMovie from "./UserCartMovie";
import "./UserCart.css";
import Layout from "../layout/layout";

const UserCart = () => {
  return (
    <div>
      <Layout>
        <UserCartMovie />
        <UserCartBook />
      </Layout>
    </div>
  );
};

export default UserCart;
