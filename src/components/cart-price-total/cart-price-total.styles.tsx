import styled from "styled-components";

export const CartPriceTotalBase = styled.div`
  border-bottom: 1px solid #444;
`;

export const TotalText = styled.span`
  font-weight: 700;
`;

export const CartPriceTotalSmall = styled(CartPriceTotalBase)`
  margin: 10px 0;
  padding: 10px 0;
`;

export const CartPriceTotalLarge = styled(CartPriceTotalBase)`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;
