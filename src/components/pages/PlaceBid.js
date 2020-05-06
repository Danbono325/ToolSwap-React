import React from "react";
import BidForm from "../bids/BidForm";
import UncompletedListingItem from "../listings/UncompletedListingItem";

const PlaceBid = () => {
  return (
    <div>
      <div className="column left">
        <BidForm />
      </div>
      {/* <div className="column right">
        <UncompletedListingItem listing={listing} showButton={false} />
      </div> */}
    </div>
  );
};

export default PlaceBid;
