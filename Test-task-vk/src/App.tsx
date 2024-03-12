import { useEffect, useState } from 'react'
import './App.css'
import { getGroupsWithDelay } from './api/getGroups'
import { Group } from './api/types'
import GroupList from './components/GroupList'
import { GroupsContext } from './components/GroupsContext'
import FiltersIsOpen from './components/FiltersIsOpen'

function App() {
  const [groups, setGroups] = useState<Group[]>([])
  const [filtered, setFiltered] = useState<Group[]>(groups)
  async function fetchData() {
    const groupsData = await getGroupsWithDelay();
    if (groupsData.data) setGroups(groupsData.data)
  }
  useEffect(() => {
    fetchData()
    setFiltered(groups)
}, [groups])

  return (
    <>
      <GroupsContext.Provider value={groups}>
        <section className='main-container'>
        <GroupList groups={filtered} />
        <div className='filters-container'>
        <FiltersIsOpen callback={setFiltered}/>  
        </div>
          
          </section>
        </GroupsContext.Provider>
    </>
  )
}

export default App
