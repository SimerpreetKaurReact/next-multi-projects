import React from "react";

const UserProfile = (props) => {
  return <div>{props.username}</div>;
};

export default UserProfile;

export async function gerServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      username: "Max",
    },
  };
}
