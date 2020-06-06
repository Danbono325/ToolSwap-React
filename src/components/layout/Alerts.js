import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import Info from "../../assets/info.svg";

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div
        key={alert.id}
        style={{ display: "flex" }}
        className={`alert alert-${alert.type}`}
      >
        <img
          src={Info}
          alt="IMG..."
          style={{ width: "20px", marginRight: "10px", marginLeft: "10px" }}
        />
        <p>{alert.msg}</p>
      </div>
    ))
  );
};

export default Alerts;
