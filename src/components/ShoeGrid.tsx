import styled from "styled-components/macro";

import SHOES from "../data";
import ShoeCard from "./ShoeCard";

const ShoeGrid = () => {
  return (
    <Wrapper>
      {SHOES.map((shoe) => (
        <ShowWrapper key={shoe.slug}>
          <ShoeCard {...shoe} />
        </ShowWrapper>
      ))}
    </Wrapper>
  );
};

const ShowWrapper = styled.div`
  flex: 1 0 275px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
`;

export default ShoeGrid;
