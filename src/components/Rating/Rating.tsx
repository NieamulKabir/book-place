
import { IBook } from "../../types/globalTypes";
import CountRating from "./CountRating";

const Rating = ({ book }: { book: IBook | number }) => {
  let finalRating;
  if (typeof book === "number") {
    finalRating = book;
  } else {
    finalRating = CountRating(book);
  }

  const maxRating = 5;
  const stars = [];
  const roundedRating = Math.round(finalRating * 2) / 2;
  for (let i = 0; i < Math.floor(roundedRating); i++) {
    stars.push(<i className="fa-solid fa-star" key={i} />);
  }

  if (roundedRating % 1 !== 0) {
    stars.push(
        <i className="fa-regular fa-star-half-stroke" key={stars.length}></i>
  
    );
  }

  for (let i = stars.length; i < maxRating; i++) {
    stars.push(
        <i className="fa-regular fa-star"  key={i}></i>
    );
  }

  return (
    <div className="flex text-green-400 font-bold">
      {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </div>
  );
};

export default Rating;
