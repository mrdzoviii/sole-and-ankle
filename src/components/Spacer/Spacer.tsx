import styled from "styled-components/macro";

function getHeight({
  axis,
  size,
}: {
  axis?: "horizontal" | "vertical";
  size: number;
}) {
  return axis === "horizontal" ? 1 : size;
}
function getWidth({
  axis,
  size,
}: {
  axis?: "horizontal" | "vertical";
  size: number;
}) {
  return axis === "vertical" ? 1 : size;
}

interface SpacerProps {
  size: number;
  axis?: "horizontal" | "vertical";
}

const Spacer = styled.span<SpacerProps>`
  display: block;
  width: ${getWidth}px;
  min-width: ${getWidth}px;
  height: ${getHeight}px;
  min-height: ${getHeight}px;
`;

export default Spacer;
