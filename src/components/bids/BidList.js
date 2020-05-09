import React from "react";
import BidItem from "../bids/BidItem";
import PropTypes from "prop-types";

const BidList = ({ bids, showButtons }) => {
  return bids.map((bid) => (
    <BidItem key={bid.bidID} bid={bid} showButtons={showButtons} />
  ));
};
BidList.propTypes = {
  bids: PropTypes.array.isRequired,
  showButtons: PropTypes.bool.isRequired,
};
export default BidList;
