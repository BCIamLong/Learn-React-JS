import Button from './Button';

function Login() {
  return (
    <form className="flex w-80 flex-col gap-3">
      <h1 className="mb-6 text-center text-4xl font-bold uppercase tracking-widest text-yellow-50">
        Login
      </h1>
      <div className="flex flex-col gap-2 text-xl">
        <label className="text-yellow-50" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="test@example.com"
          className="w-full rounded-full px-3 py-1 text-[1rem] text-yellow-950 focus:outline-4 focus:outline-offset-4 focus:outline-yellow-400"
        />
      </div>
      <div className="mb-4 flex flex-col gap-2 text-xl">
        <label htmlFor="password" className="text-yellow-50">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          className="w-full rounded-full px-3 py-1 text-[1rem]  text-yellow-950 focus:outline-4 focus:outline-offset-4 focus:outline-yellow-400"
        />
      </div>
      <Button type="primary">Login</Button>
    </form>
  );
}

export default Login;
