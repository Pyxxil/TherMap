import React from "react";

interface Props {
  destination: string;
}

const Dashboard: React.FC<Props> = (props) => {
  if (props.destination.length > 0) {
    return <div>Cool, lets go to {props.destination}</div>;
  }

  return <></>;
};

export default Dashboard;
