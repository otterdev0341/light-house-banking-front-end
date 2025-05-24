import { useLocation } from "react-router-dom"
import Navbar from "./ui/components/Navbar"
import RouteRegister from "./routes/RouteRegister"


function App() {
  const location = useLocation()

  // Define routes where the Navbar should be hidden
  const hideNavbarRoutes = ["/sign-in", "/sign-up"]
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname)

  return (
    <>
      <div className='container mx-auto'>
        {!shouldHideNavbar && <Navbar />}
        <RouteRegister />
      </div>
      
    </>
  )
}

export default App
