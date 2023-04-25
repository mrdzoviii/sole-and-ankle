import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../constants";
import { formatPrice, isNewShoe, pluralize } from "../utils";
import Spacer from "./Spacer";

interface ShoeCardProps {
  slug: string;
  name: string;
  imageSrc: string;
  price: number;
  salePrice?: number | null;
  releaseDate: number | Date;
  numOfColors: number;
}

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}: ShoeCardProps) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price onSale={variant === "on-sale"}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" && salePrice ? (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          ) : null}
        </Row>
        {variant !== "default" ? (
          <Tag variant={variant}>
            {variant === "new-release" ? "Just released!" : "Sale"}
          </Tag>
        ) : null}
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Tag = styled.div<{ variant: "on-sale" | "new-release" }>`
  position: absolute;
  top: 12px;
  right: -4px;
  background-color: ${(p) =>
    p.variant === "on-sale" ? COLORS.primary : COLORS.secondary};
  color: ${COLORS.white};
  padding: 8px 10px;
  border-radius: 2px;
  font-size: 0.875rem;
  font-weight: ${WEIGHTS.bold};
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 16px 16px 4px 4px;
  overflow: clip;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span<{ onSale: boolean }>`
  color: ${(p) => (p.onSale ? COLORS.gray[700] : "inherit")};
  text-decoration: ${(p) => (p.onSale ? "line-through" : "inherit")};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
