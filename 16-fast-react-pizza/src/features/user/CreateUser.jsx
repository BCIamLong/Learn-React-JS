import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  // console.log(user);
  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;

    dispatch(updateName(username));
    navigate('/menu');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 text-[1rem] font-semibold text-stone-600 sm:space-y-4 sm:text-xl"
    >
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
        className="w-72 py-2 text-center  text-[1rem] sm:text-xl"
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />

      {username !== '' && (
        // <div className="inline-block rounded-sm border-2 border-stone-400 bg-yellow-50 px-3 py-2 text-yellow-700">
        <div>
          <Button type="primary">Start ordering</Button>
          {/* <button>Start ordering</button> */}
        </div>
      )}
    </form>
  );
}

export default CreateUser;
