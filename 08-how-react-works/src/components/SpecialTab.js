export default function SpecialTab({ id, selectedTab, onSetSelectedTab }) {
  return (
    <li className={`item ${selectedTab === id ? "clicked" : ""}`}>
      <button className="btn btn--tab" onClick={() => onSetSelectedTab(id)}>
        Tab {id}
      </button>
      <div className="description">
        <p className="title">I'm a DIFFERENT tab, so I reset state 💣💥</p>
      </div>
    </li>
  );
}
