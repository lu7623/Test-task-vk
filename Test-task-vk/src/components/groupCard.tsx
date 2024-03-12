import { Group } from "../api/types";

export default function GroupCard({ group }: { group: Group }) {
  return (
    <>
      <div className="card">
        <h2 className="group-name">{group.name.toUpperCase()}</h2>
        <p className="closed">
          {group.closed ? "Закрытая группа" : " Открытая группа"}
        </p>
        <div
          className="avatar"
          style={{ backgroundColor: group.avatar_color }}
        />
        <p>Участники:{group.members_count}</p>
        <p className="friends-list">
          Друзья в группе:
          {group.friends?.map((friend) => (
            <div key={friend.first_name}>
              <span className="friend">{friend.first_name}</span>
              <span className="friend">{friend.last_name}</span>
            </div>
          ))}
        </p>
      </div>
    </>
  );
}
