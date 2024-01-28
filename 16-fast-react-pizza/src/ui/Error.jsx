import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  // const navigate = useNavigate();

  // * so we use the useRouteError custom hook from react router dom to access to the error from our child routes right so from the loader in our route
  // * so like in the fetching data or some computation in our loader for some reason the error will throw in this case and react router will call the error element
  // * so in this case this error component and in here we can access to the error by use this hook and handle with this error like display message or do something

  // ! notice that some error can come from react router doesn't have the message property but instead the data property and some error can come from API and it has the message property
  // * so therefore we need to set condition to display both of them if it's one in two cases
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
      {/* <button onClick={() => navigate(-1)}>&larr; Go back</button> */}
    </div>
  );
}

export default Error;
