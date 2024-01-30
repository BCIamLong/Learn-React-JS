import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // * a nice that we can use form submit event to have two actions that user can click and hit enter to trigger this submit event instead create two events one for click and one for enter key right
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;

    navigate(`/order/${query}`);
    setQuery('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="rounded-full border-2 border-yellow-100  bg-yellow-100 px-3 py-1 text-stone-700 transition-all duration-500 placeholder:text-sm placeholder:text-stone-400  focus:border-2 focus:border-yellow-400 focus:outline-none  active:border-2 active:border-yellow-400 active:outline-none sm:py-2 sm:focus:w-72"
        type="text"
        placeholder="Search order to #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
