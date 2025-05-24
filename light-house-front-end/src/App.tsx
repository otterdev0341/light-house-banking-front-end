import { Typography } from "@mui/material"
import Navbar from "./ui/components/Navbar"

import ContactPage from "./ui/page/Contact"
import AssetPage from "./ui/page/Asset"
import ExpensePage from "./ui/page/Expense"
import IncomePage from "./ui/page/transaction/Income"
import PaymentPage from "./ui/page/transaction/Payment"
import TransferPage from "./ui/page/transaction/Transfer"
import CurrentSheetPage from "./ui/page/CurrentSheet"


function App() {
  

  return (
    <>
      <div className='container mx-auto'>
      <Navbar />
      {/* <SignInPage />
      <SignUpPage /> */}
      {/* <ContactPage />
      <AssetPage />
      <ExpensePage /> */}
      <IncomePage />
      <PaymentPage />
      <TransferPage />
      <CurrentSheetPage />
      </div>
      
    </>
  )
}

export default App
