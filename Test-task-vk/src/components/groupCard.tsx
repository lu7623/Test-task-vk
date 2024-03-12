import { Group } from "../api/types";
import { useState } from 'react';

export default function GroupCard({ group }: { group: Group }) {
  const [showFriends, setShowFriends] = useState(false);
  return (
    <>
      <div className="card">
        <h2 className="group-name">{group.name.toUpperCase()}</h2>
        {group.avatar_color && <div
          className="avatar"
          style={{ backgroundColor: group.avatar_color }}
        />}
        <p className="closed">
          {group.closed ? "Закрытая группа" : " Открытая группа"}
        </p>
        
        <p>Участники:{group.members_count}</p>
        {group.friends && <p className="friends-list">
          Друзья в группе:
          <button className="show-friends" onClick={() => setShowFriends(!showFriends)}>{group.friends.length }</button>
           { showFriends && (group.friends?.map((friend) => (
            <div key={friend.first_name}>
              <span className="friend">{friend.first_name}</span>
              <span className="friend">{friend.last_name}</span>
            </div>
          )))}
        </p>}
      </div>
    </>
  );
}
