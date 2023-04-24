import { ChevronDown, Menu, Search, ShoppingBag } from "react-feather";
import styled from "styled-components/macro";

const icons = {
  search: Search,
  menu: Menu,
  "shopping-bag": ShoppingBag,
  "chevron-down": ChevronDown,
};

interface IconProps {
  id: keyof typeof icons;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

const Icon = ({ id, color, size, strokeWidth, ...delegated }: IconProps) => {
  const Component = icons[id];

  if (!Component) {
    throw new Error(`No icon found for ID: ${id}`);
  }

  return (
    <Wrapper strokeWidth={strokeWidth} {...delegated}>
      <Component color={color} size={size} />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ strokeWidth?: number }>`
  & > svg {
    display: block;
    stroke-width: ${(p) => p.strokeWidth}px;
  }
`;

export default Icon;
