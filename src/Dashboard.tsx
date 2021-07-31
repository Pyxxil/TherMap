import React from "react";

import Tree from "./img/tree.png";

import "./styles.css"

interface Props {
  destination: string;
}

const Dashboard: React.FC<Props> = (props: any) => {
  let temperature = 0; // 0 cold, 100 hot

  if (props.destination.length > 0) {
    return <div>Cool, lets go to {props.destination}
      <img src={Tree} className="tree" />
    </div>;
  }

  return <></>;
};

export default Dashboard;
