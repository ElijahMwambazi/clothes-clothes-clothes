import { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectCurrentUser } from "../../store/user/user.selector";

import {
  DirectoryContainer,
  BackgroundImage,
  DirectoryContent,
  DirectoryTitle,
  ShopNow,
} from "./directory-item.styles";

type TCategories = {
  id: number;
  imageUrl: string;
  title: string;
  route: string;
};

export type TDirectoryProps = {
  category: TCategories;
};

const DirectoryItem: FC<TDirectoryProps> = ({
  category,
}) => {
  const { imageUrl, title, route } = category;
  const currentUser = useSelector(
    selectCurrentUser
  );

  const navigate = useNavigate();

  const onNavigateHundler = () => {
    if (currentUser) {
      navigate(route);
    }
    if (!currentUser) {
      navigate("/auth");
    }
  };

  return (
    <DirectoryContainer
      onClick={() => onNavigateHundler()}
    >
      <BackgroundImage
        imageUrl={imageUrl}
      ></BackgroundImage>
      <DirectoryContent>
        <DirectoryTitle>{title}</DirectoryTitle>
        <ShopNow>Shop Now</ShopNow>
      </DirectoryContent>
    </DirectoryContainer>
  );
};

export default DirectoryItem;
