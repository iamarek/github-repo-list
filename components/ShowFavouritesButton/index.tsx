import { Dispatch, SetStateAction } from "react";
import HeartIcon from "../../public/heartFilled.svg";

type Props = {
  showFavourites: boolean;
  setShowFavourites: Dispatch<SetStateAction<boolean>>;
};

const ShowFavouritesButton = ({ showFavourites, setShowFavourites }: Props) => {
  return (
    <button
      className="py-4 px-6 bg-black text-white grid grid-flow-col justify-between items-center gap-3 hover:translate-y-1 transition-transform min-w-[220px]"
      onClick={() => setShowFavourites(!showFavourites)}
    >
      {showFavourites ? "See all" : "See your favourite"}
      <span role="img" aria-label="heart">
        <HeartIcon className="fill-white" />
      </span>
    </button>
  );
};

export default ShowFavouritesButton;
