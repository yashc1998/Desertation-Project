import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts != null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div className="fixed inset-x-0 top-0 mt-12 flex items-center justify-center px-4 py-6">
      <div
        className={`max-w-sm w-full rounded px-4 py-3 rounded relative ${
          alert.alertType === "danger"
            ? "bg-red-400 border-red-400"
            : "bg-green-500 border-green-500"
        } text-white`}
      >
        <div className="p-2">
          <div className="flex items-start" key={alert.id}>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm leading-5 font-medium">{alert.msg}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alertReducer,
});

export default connect(mapStateToProps)(Alert);
