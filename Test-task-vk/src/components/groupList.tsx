import { Group } from "../api/types";
import GroupCard from "./groupCard";

export default function GroupList({ groups }: { groups: Group[] }) {
  return (
    <>
      <div className="card-container">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </>
  );
}
