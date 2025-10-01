import CommonWrapper from "@/common/CommonWrapper"
import { Outlet } from "react-router-dom"

const RakibAdminLayout = () => {
  return (
    <CommonWrapper>
        <Outlet/>
    </CommonWrapper>
  )
}

export default RakibAdminLayout;