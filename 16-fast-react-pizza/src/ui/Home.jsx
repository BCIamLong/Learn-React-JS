import CreateUser from '../features/user/CreateUser';

function Home() {
  return (
    <div className="my-12 text-center sm:my-20">
      <h1 className="text-3xl font-bold capitalize italic text-yellow-500 sm:text-5xl">
        The best pizza.
        <br />
        <span className="mb-3 mt-6 block text-xl normal-case not-italic text-stone-700 sm:mb-6 sm:mt-10 sm:text-3xl">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
