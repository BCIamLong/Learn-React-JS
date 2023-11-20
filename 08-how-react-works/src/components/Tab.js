import TabContent from "./TabContent";

export default function Tab({ item, index, selectedTab, onSelectedTab }) {
  return (
    <li className={`item ${selectedTab === index ? "clicked" : ""}`}>
      <button className="btn btn--tab" onClick={() => onSelectedTab(index)}>
        Tab {index + 1}
      </button>
      <TabContent item={item} />
    </li>
  );
}
