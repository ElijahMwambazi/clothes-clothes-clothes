import styled from "styled-components";
import Button from "../button/button.component";

export const ProductCardButton = styled(Button)`
  width: 80%;
  opacity: 0.7;
  position: absolute;
  top: 255px;
  display: none;
`;

export const Image = styled.img`
  width: 100%;
  height: 92%;
  object-fit: cover;
  margin-bottom: 5px;
  border-radius: 2px;
`;

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  &:hover {
    ${Image} {
      opacity: 0.8;
    }

    ${ProductCardButton} {
      opacity: 0.85;
      display: flex;
    }
  }
`;

export const Footer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
`;

export const Name = styled.span`
  margin-bottom: 15px;
  font-size: 16px;
`;

export const Price = styled.span`
  font-size: 18px;
`;
