import { useEffect, useState } from "react";
import "./App.css";
import { getGroupsWithDelay } from "./api/getGroups";
import { Group } from "./api/types";
import GroupList from "./components/GroupList";
import { GroupsContext } from "./components/GroupsContext";
import Filters from "./components/Filters";

function App() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [filtered, setFiltered] = useState<Group[]>(groups);
  const [error, setError] = useState("");
  async function fetchData() {
    try {
      const groupsData = await getGroupsWithDelay();
      if (groupsData.data) setGroups(groupsData.data);
      setError("");
    } catch (e) {
      const err = e as Error;
      setError(err.message);
      setFiltered([]);
    }
  }
  useEffect(() => {
    fetchData();
    setFiltered(groups);
  }, [groups]);

  return (
    <>
      <GroupsContext.Provider value={groups}>
        <section className="main-container">
            <Filters callback={setFiltered} />
          {error.length > 0 && <p style={{ color: 'red' }}>{error}</p>}
          <GroupList groups={filtered} />
        </section>
      </GroupsContext.Provider>
    </>
  );
}

export default App;
