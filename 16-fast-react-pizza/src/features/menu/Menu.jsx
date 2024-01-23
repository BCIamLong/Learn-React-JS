import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  // console.log(menu);
  return (
    <div>
      <h1>Menu</h1>
      <ul>
        {menu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </div>
  );
}

// * we will get the menu data from API, then we can use the new feature of the modern route way is called loader

// * to create loader we have 3 steps:
// ? 1 here we create loader: the loader can be create some other file but the convention that we create on the component we will use this loader data
// * so in this case we create it in the Menu component because now we're fetching menu data right
// * a loader function look like the normal async function right
// * and then we can export this loader function with named export and the default export for the component itself
// ? 2 we will provide loader into our route so the route in the app.jsx right
// * in this case that's menu route because this is menu data right
// * and to do that we use the loader property on our route to provide loader

// ? 3 get the data we fetched into our component and sync with UI component
// * so to do that we will use a custom hook by use the useLoaderData hook and we use it in the element of the route we provide loader
// * so in this case it's also the Menu component right

// ! notice that with fetching react router it's render as you fetch
// * so that mean that mean we fetching in the same time with render
// * this different before when we fetch in the useEffect hook so that the approach fetch on render and that mean after render the UI painted on the DOM the data fetching start
// * and this can create the problem called data loading waterfall
// * read more in docs

export const loader = async () => {
  const menu = await getMenu();
  return menu;
};

export default Menu;
