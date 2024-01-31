import { useSelector } from 'react-redux';

function UserBox() {
  const user = useSelector((store) => store.user);
  // console.log(user);
  return (
    <div className="hidden bg-stone-300 p-3 text-sm font-semibold sm:block">
      <p>{user.username ? user.username : 'Login'}</p>
    </div>
  );
}

export default UserBox;
