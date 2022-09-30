import { useNavigate } from "react-router-dom";
import {
  DirectoryContainer,
  BackgroundImage,
  DirectoryContent,
  DirectoryTitle,
  ShopNow,
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;

  const navigate = useNavigate();

  const onNavigateHundler = () => {
    navigate(route);
  };

  return (
    <DirectoryContainer onClick={() => onNavigateHundler()}>
      <BackgroundImage imageUrl={imageUrl}></BackgroundImage>
      <DirectoryContent>
        <DirectoryTitle>{title}</DirectoryTitle>
        <ShopNow>Shop Now</ShopNow>
      </DirectoryContent>
    </DirectoryContainer>
  );
};

export default DirectoryItem;
