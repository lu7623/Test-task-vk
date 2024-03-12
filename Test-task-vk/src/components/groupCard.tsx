import { Group } from "../api/types";
import { useState } from 'react';

export default function GroupCard({ group }: { group: Group }) {
  const [showFriends, setShowFriends] = useState(false);
  return (
    <>
      <div className="card">
      {group.avatar_color && <div
          className="avatar"
          style={{ backgroundColor: group.avatar_color }}
        />}
        <h2 className="group-name">{group.name.toUpperCase()}</h2>
        <p className="closed">
          {group.closed ? "Закрытая группа" : " Открытая группа"}
        </p>
        
        <p>Участники:{group.members_count}</p>
        {group.friends && <p className="friends-list">
          Друзья в группе:
          <button onClick={()=>setShowFriends(!showFriends)}> tt</button>
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
