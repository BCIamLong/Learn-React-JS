import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ params, request }) {
  const updateData = { priority: false };
  //   console.log(updateData);

  // ! we will test later when the api allow writing post patch, or we can create our own API and test it
  await updateOrder(params.orderId, updateData);

  return null;
}
