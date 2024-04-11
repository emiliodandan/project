import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import { userCartBaseUrl, mediaBaseUrl } from "../constants/url.constant";
import "./UserCart.css";
import Layout from "../layout/layout";
import BookRanking from "../layout/BookRanking";

const UserCart = () => {
  const [cart, setCart] = useState([]);
  const [mediaMap, setMediaMap] = useState({});
  const location = useLocation();
  const redirect = useNavigate();
  const userId = 1;

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        userCartBaseUrl + "GetCartItems/" + userId
      );
      setCart(response.data);
      // Fetch media for each cart item
      const mediaFetchPromises = response.data.map((cartItem) =>
        fetchMedia(cartItem.mediaId)
      );

      // Wait for all media fetch promises to resolve
      await Promise.all(mediaFetchPromises);
    } catch (error) {
      alert("An error occurred while fetching the cart items.");
    }
  };

  const fetchMedia = async (mediaId) => {
    try {
      const response = await axios.get(mediaBaseUrl + "GetBookById/" + mediaId);
      setMediaMap((prevState) => ({
        ...prevState,
        [mediaId]: response.data,
      }));
    } catch (error) {
      alert("An error occurred while fetching the media.");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (cartItemId) => {
    try {
      const response = await axios.delete(
        userCartBaseUrl + "DeleteCartItem/" + cartItemId
      );
      setCart((prevCart) =>
        prevCart.filter((cartItem) => cartItem.CartItemId !== cartItemId)
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="products">
        <h1>User's Cart</h1>
        {cart.length === 0 ? (
          <h2>No Media Added</h2>
        ) : (
          <div>
            <div className="table-wrapper">
              <h2>Book Cart</h2>
              <table>
                <thead>
                  <tr>
                    <th>Cover</th>
                    <th>Title</th>
                    <th>Creator</th>
                    <th>Date Added</th>
                    <th>Ranking</th>
                    <th>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((cartItem) => (
                    <tr key={cartItem.cartItemId}>
                      <td>
                        <img src={mediaMap[cartItem.mediaId]?.cover} />
                      </td>
                      <td>{mediaMap[cartItem.mediaId]?.title}</td>
                      <td>{mediaMap[cartItem.mediaId]?.creator}</td>
                      <td>{moment(cartItem.dateAdded).fromNow()}</td>
                      <td>
                        <BookRanking maxStars={5} />
                      </td>
                      <td>
                        <button
                          onClick={() => handleRemove(cartItem.cartItemId)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default UserCart;
