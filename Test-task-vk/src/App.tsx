import { useEffect, useState } from 'react'
import './App.css'
import { getGroupsWithDelay } from './api/getGroups'
import { Group } from './api/types'
import GroupList from './components/groupList'

function App() {
  const [groups, setGroups] = useState<Group[]>([])
  async function fetchData() {
    const groupsData = await getGroupsWithDelay();
    if (groupsData.data) setGroups(groupsData.data)
  }
  useEffect(() => {
 fetchData()
})

  return (
    <>
    <GroupList groups={groups}/>
    </>
  )
}

export default App
