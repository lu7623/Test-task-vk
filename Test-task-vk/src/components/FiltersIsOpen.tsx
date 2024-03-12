import { useContext, useEffect, useState } from "react";
import { GroupsContext } from "./GroupsContext";
import { Group } from "../api/types";


export default function FiltersIsOpen({ callback }: { callback: (gruops: Group[]) => void }) {
  const groups = useContext(GroupsContext);
  const [openGroups, setOpenGroups]= useState('all')
  function filterOpen(event: React.ChangeEvent<HTMLInputElement>) {
    setOpenGroups(event.target.value);
  }

  const filteredGroupsIsOpen = () => {
    if (openGroups === 'all') return groups;
    else if (openGroups === 'open') return groups.filter((group) => !group.closed);
else return groups.filter((group) => group.closed);
  }
  useEffect(() => {
    const groupsList = filteredGroupsIsOpen()
    callback(groupsList)
  }, [openGroups]);
  return (
    <>
      <div className="filters-container">
        
        <div>
        <input
            type="radio"
            name="radio"
            value="closed"
            id="closed"
            checked={openGroups == 'closed' ? true : false}
            onChange={filterOpen}
          />
          <label htmlFor="closed">Закрытые</label>
          <input
            type="radio"
            name="radio"
            value="open"
            id="open"
            checked={openGroups == 'open' ? true : false}
            onChange={filterOpen}
          
          />
          <label htmlFor="open">Открытые</label>
          <input
            type="radio"
            name="radio"
            value="all"
            id="all"
            checked={openGroups == 'all' ? true : false}
            onChange={filterOpen}
          />
          <label htmlFor="all">Все</label>
</div>

      </div>
    </>
  );
}
