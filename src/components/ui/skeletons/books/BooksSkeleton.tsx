
import BookSkeleton from './BookSkeleton';

const BooksSkeleton = () => {
    const books = [1, 2, 3, 4, 5];
    return (
        <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookSkeleton key={book} />
        ))}
      </div>
    );
};

export default BooksSkeleton;