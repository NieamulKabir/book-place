import "./BookSkeleton.css";

// react components.


const BookSkeleton = () => {
  return (
    <div className="bg-white">
      <div className="h-[240px] w-[170px] sk-image"></div>
      <div className="flex-1 h-full pr-2 pt-2 flex flex-col">
        <div className="flex items-center justify-between">
          <span className="lws-badge sk-featured">featured</span>
          <div className="text-gray-500 space-x-2">
            <button className="lws-edit sk-button"></button>
            <button className="lws-deleteBook sk-button"></button>
          </div>
        </div>
        <div className="space-y-2 mt-4 h-full">
          <h4 className="lws-book-name sk-name">
            Eloquent JavaScript, 3rd Edition
          </h4>
          <p className="lws-author sk-author">Marijn Haverbeke</p>
          {/* <Rating rating={5} color="#dfdfdf" /> */}
          <p className="lws-price sk-price">BDT 23.998</p>
        </div>
      </div>
    </div>
  );
};

export default BookSkeleton;