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
  const [colors, setColors] = useState("allColors");

  function filterOpen(event: React.ChangeEvent<HTMLInputElement>) {
    setOpenGroups(event.target.value);
  }

  function filterFriends(event: React.ChangeEvent<HTMLInputElement>) {
    setfriendsInGroup(event.target.value);
  }

  function filterColors(event: React.ChangeEvent<HTMLInputElement>) {
    setColors(event.target.value);
  }

  const colorsVariants = groups
    .filter((group) => !!group.avatar_color)
    .map((x) => x.avatar_color);
  colorsVariants.forEach((c, i) => {
    if (colorsVariants.indexOf(c) !== colorsVariants.lastIndexOf(c))
      colorsVariants.splice(i, 1);
  });

  const filteredGroupsIsOpen = (groups: Group[]) => {
    if (openGroups === "allOpen") return groups;
    else if (openGroups === "open")
      return groups.filter((group) => !group.closed);
    else return groups.filter((group) => group.closed);
  };

  const filteredHasFriends = (groups: Group[]) => {
    if (friendsInGroup === "allFriends") return groups;
    else if (friendsInGroup === "yes")
      return groups.filter((group) => group.friends);
    else return groups.filter((group) => !group.friends);
  };

  const filteredAvatarColor = (groups: Group[]) => {
    if (colors === "allColors") return groups;
    else return groups.filter((group) => group.avatar_color === colors);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const groupsList = filteredGroupsIsOpen(groups);
    const friendsList = filteredHasFriends(groupsList);
    const colorsList = filteredAvatarColor(friendsList);
    setTimeout(() => {
      callback(colorsList);
    }, 1000);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="filters-container">
        <div className="filters-open">
          <h3>Тип группы:</h3>
          {[
            ["allOpen", "Все"],
            ["closed", "Закрытые"],
            ["open", "Открытые"],
          ].map((x) => {
            return (
                <div className="radio" key={x[0]}>
                  <input
                    type="radio"
                    name="open"
                    value={x[0]}
                    id={x[0]}
                    checked={openGroups == x[0] ? true : false}
                    onChange={filterOpen}
                  />
                  <label htmlFor={x[0]}>{x[1]}</label>
                </div>
            );
          })}
        </div>
        <div className="filters-open">
          <h3>Друзья в группе:</h3>
          {[
            ["allFriends", "Все"],
            ["yes", "Есть"],
            ["no", "Нет"],
          ].map((x) => {
            return (
                <div className="radio" key={x[0]}>
                  <input
                    type="radio"
                    name="friends"
                    value={x[0]}
                    id={x[0]}
                    checked={friendsInGroup == x[0] ? true : false}
                    onChange={filterFriends}
                  />
                  <label htmlFor={x[0]}>{x[1]}</label>
                </div>
            );
          })}
        </div>
        <div className="filter-colors">
          <h3>Цвет аватарки</h3>
          <div className="radio">
            <input
              type="radio"
              value="allColors"
              id="allColors"
              name="colors"
              checked={colors == "allColors" ? true : false}
              onChange={filterColors}
            />
            <label htmlFor="allColors">Все</label>
          </div>
          {colorsVariants.map((color) => {
            return (
                <div className="radio" key={color}>
                  <input
                    type="radio"
                    name="colors"
                    value={color}
                    id={color}
                    checked={colors === color ? true : false}
                    onChange={filterColors}
                  />
                  <label htmlFor={color}>{color}</label>
                </div>
            );
          })}
        </div>
          <button className="submit" type="submit">Применить</button>
      </form>
    </>
  );
}
