import styled from "styled-components";

export type TBackgroundImageProps = {
  imageUrl: string;
};

export const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${({
    imageUrl,
  }: TBackgroundImageProps) =>
    `url(${imageUrl})`};
`;

export const DirectoryContent = styled.div`
  text-transform: uppercase;
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: white;
  opacity: 0.7;
  position: absolute;
`;

export const DirectoryContainer = styled.div`
  min-width: 30%;
  height: 240px;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 7.5px 15px;
  overflow: hidden;

  &:hover {
    cursor: pointer;

    & ${BackgroundImage} {
      transform: scale(1.1);
      transition: transform 6s
        cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }

    & ${DirectoryContent} {
      opacity: 0.9;
    }
  }

  &:first-child {
    margin-right: 7.5px;
  }

  &:last-child {
    margin-left: 7.5px;
  }

  @media screen and (max-width: 800px) {
    height: 200px;
  }
`;

export const DirectoryTitle = styled.h1`
  font-weight: bold;
  margin: 0 6px 0;
  font-size: 22px;
  color: #4a4a4a;
`;

export const ShopNow = styled.p`
  font-weight: lighter;
  font-size: 16px;
`;
