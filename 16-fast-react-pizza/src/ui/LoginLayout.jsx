import { Outlet } from 'react-router-dom';

function LoginLayout() {
  return (
    <div className="flex h-dvh items-center justify-center bg-yellow-600">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default LoginLayout;
