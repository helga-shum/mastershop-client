import React from "react";
import Heading from "../../ui/heading";
import FirstHeading from "../../ui/heading/firstHeading";
import SecondHeading from "../../ui/heading/secondHeading";

const Page404 = () => {
  return (
    <>
      <Heading>
        <FirstHeading>ERROR 404</FirstHeading>
        <SecondHeading>
          This page does not exist, please return to the main page.
        </SecondHeading>
      </Heading>
    </>
  );
};

export default Page404;
