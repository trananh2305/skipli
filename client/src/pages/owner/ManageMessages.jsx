
import { Outlet } from 'react-router-dom'
import ConversationList from '../../components/ConversationList'

const ManageMessages = () => {
  return (
    <div className="size-full gap-0 flex">
        <div className="flex-1 px-6">
          <ConversationList/>
        </div>
        <div className="flex-[2] ">
          <Outlet/>
        </div>
    </div>
  )
}

export default ManageMessages