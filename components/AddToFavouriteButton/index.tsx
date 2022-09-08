import { useEffect, useState } from "react";
import { Repository } from "../../types/types";
import { useFavourites } from "../../utils/favouritesContext";

const AddToFavouriteButton = ({ id }: { id: Repository["id"] }) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const { favouritesData, toggleFavourite } = useFavourites();

  // Define if button should be active or not based on array of favourite ids
  useEffect(() => {
    setIsFavourite(favouritesData.ids.includes(id));
  }, [favouritesData, id]);

  return (
    <button
      className="border border-t-0 sm:border-t sm:border-l-0 group py-6 md:py-1"
      onClick={() => toggleFavourite(id)}
    >
      <span
        role="img"
        aria-label="heart"
        className={`flex justify-center items-center h-full ${
          isFavourite ? "text-black" : "text-black/10 group-hover:text-black/50"
        }`}
      >
        ♥️
      </span>
    </button>
  );
};

export default AddToFavouriteButton;
