//import Userlist from "./dashboard-component/Userlist"
import PaginatedUsers from "../component/dashboard-component/PaginatedList"
import BarChartPage from "../component/project-component/Projectchart"
import PageGrid from "../component/grid-component/Grids.jsx"
import { Box } from "@mui/material";


function Project() {
  return (
    <>
      {/* <Userlist /> */}
      <PageGrid>
      <Box flex={1} minWidth={300}>
        <PaginatedUsers />
      </Box>
        <Box flex={1} minWidth={300}>
        <BarChartPage />
      </Box>
      </PageGrid>
    </>
  )
}

export default Project