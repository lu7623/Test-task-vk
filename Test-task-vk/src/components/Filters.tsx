import { useContext, useState } from "react";
import { GroupsContext } from "./GroupsContext";
import { Group } from "../api/types";

export default function Filters({
  callback,
}: {
  callback: (groups: Group[]) => void;
}) {
  const groups = useContext(GroupsContext);

  const [openGroups, setOpenGroups] = useState("allOpen");
  const [friendsInGroup, setfriendsInGroup] = useState("allFriends");
  const [colors, setColors] = useState('allColors');

  const colorsVariants = 
    groups.filter((group) => !!group.avatar_color).map((x) => x.avatar_color);
  colorsVariants.forEach((c, i) => { if (colorsVariants.indexOf(c) !== colorsVariants.lastIndexOf(c)) colorsVariants.splice(i, 1)})

  function filterOpen(event: React.ChangeEvent<HTMLInputElement>) {
    setOpenGroups(event.target.value);
  }

  const filteredGroupsIsOpen = (groups: Group[]) => {
    if (openGroups === "allOpen") return groups;
    else if (openGroups === "open")
      return groups.filter((group) => !group.closed);
    else return groups.filter((group) => group.closed);
  };

  function filterFriends(event: React.ChangeEvent<HTMLInputElement>) {
    setfriendsInGroup(event.target.value);
  }

  const filteredHasFriends = (groups: Group[]) => {
    if (friendsInGroup === "allFriends") return groups;
    else if (friendsInGroup === "yes")
      return groups.filter((group) => group.friends);
    else return groups.filter((group) => !group.friends);
  };

  function filterColors(event: React.ChangeEvent<HTMLInputElement>) {
    setColors(event.target.value);
  }

  const filteredAvatarColor= (groups: Group[], col: string) => {
    if (friendsInGroup === "allColors") return groups;
    else (friendsInGroup === col)
      return groups.filter((group) => group.avatar_color === col);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const groupsList = filteredGroupsIsOpen(groups);
    const friendsList = filteredHasFriends(groupsList);
    const colorsList = filteredAvatarColor(friendsList, colors)
    callback(colorsList);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="filters-open">
          <h3>Тип группы:</h3>
          <input
            type="radio"
            value="allOpen"
            id="allOpen"
            checked={openGroups == "allOpen" ? true : false}
            onChange={filterOpen}
          />
          <label htmlFor="allOpen">Все</label>
          <input
            type="radio"
            value="closed"
            name = 'friends'
            id="closed"
            checked={openGroups == "closed" ? true : false}
            onChange={filterOpen}
          />
          <label htmlFor="closed">Закрытые</label>
          <input
            type="radio"
            value="open"
            id="open"
            name = 'friends'
            checked={openGroups == "open" ? true : false}
            onChange={filterOpen}
          />
          <label htmlFor="open">Открытые</label>
        
        </div>
        <div className="filters-open">
          <h3>Друзья в группе:</h3>
          <input
            type="radio"
            value="allFriends"
            id="allFriends"
            name = 'friends'
            checked={friendsInGroup == "allFriends" ? true : false}
            onChange={filterFriends}
          />
          <label htmlFor="allFriends">Все</label>
          <input
            type="radio"
            value="yes"
            id="yes"
            name = 'friends'
            checked={friendsInGroup == "yes" ? true : false}
            onChange={filterFriends}
          />
          <label htmlFor="closed">Есть</label>
          <input
            type="radio"
            value="no"
            id="no"
            name = 'friends'
            checked={friendsInGroup == "no" ? true : false}
            onChange={filterFriends}
          />
          <label htmlFor="open">Нет</label>
        
        </div>

        <div className="filter-colors">
          <h3>Цвет аватарки</h3>
        <input
            type="radio"
            value="allColors"
            id="allColors"
            name = 'colors'
            checked={colors == "allColors" ? true : false}
            onChange={filterColors}
          />
          <label htmlFor="allColors">Все</label>
          {colorsVariants.map((color) => {
            return (
              <>
                 <input
                  type="radio"
                  name = 'colors'
            value={color}
            id={color}
            checked={colors === color ? true : false}
            onChange={filterColors}
          />
                <label htmlFor={color}>{color}</label>
              </>
            )
          })}
        </div>
        <button type="submit">Применить</button>
      </form>
    </>
  );
}
