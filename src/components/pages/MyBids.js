import React, { useEffect, useContext } from "react";
import BidForm from "../../components/bids/BidForm";
import BidList from "../../components/bids/BidList";
import AuthContext from "../../context/auth/authContext";
import BidContext from "../../context/bids/bidContext";

const MyBids = () => {
  const authContext = useContext(AuthContext);
  const bidContext = useContext(BidContext);

  const { isAuthenticated, loadUser } = authContext;
  const { getUsersBids, bids } = bidContext;

  useEffect(() => {
    if (isAuthenticated) {
      loadUser(localStorage.getItem("idUser"));
    } else {
      loadUser(0);
    }
    getUsersBids(localStorage.getItem("idUser"));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="column left">
        <BidForm edit={true} />
      </div>
      <div className="column right">
        <BidList bidState={bids} showButtons={true} />
      </div>
    </div>
  );
};

export default MyBids;
