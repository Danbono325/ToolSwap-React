import React, { Fragment } from "react";
import BidForm from "../../components/bids/BidForm";
import UncompletedListingItem from "../listings/UncompletedListingItem";
import BidItem from "../bids/BidItem";

const MyBidList = ({ bids, listings }) => {
  return (
    <div>
      <div className="column left">
        <BidForm edit={true} />
      </div>
      <div className="column right">
        {listings.length ? (
          bids.map((bid, index) => (
            <div key={index * 1000} className="listingBid">
              <Fragment>
                <UncompletedListingItem
                  listing={listings[index]}
                  showButton={false}
                />
                <BidItem bid={bid} showButtons={true} />
              </Fragment>
            </div>
          ))
        ) : (
          <h3 style={{ textAlign: "center" }}>Place a bid on the home page.</h3>
        )}
      </div>
    </div>
  );
};

export default MyBidList;
