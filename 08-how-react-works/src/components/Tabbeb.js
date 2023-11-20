import { useState } from "react";
import Tab from "./Tab";
import SpecialTab from "./SpecialTab";

export default function Tabbed({ content }) {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div className="tabbed">
      <ul className="list">
        {content?.map((ct, i) => (
          <Tab
            key={i}
            item={ct}
            index={i}
            selectedTab={selectedTab}
            onSelectedTab={setSelectedTab}
          />
        ))}
        <SpecialTab
          id={content.length + 1}
          selectedTab={selectedTab}
          onSetSelectedTab={setSelectedTab}
        />
        {/* {SpecialTab({
          id: content.length + 2,
          selectedTab: selectedTab,
          onSetSelectedTab: setSelectedTab,
        })} */}
      </ul>
    </div>
  );
}
