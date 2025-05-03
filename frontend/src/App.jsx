import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home/Home"
import Order from "./pages/Orders/Order"
import Product from "./pages/Products/Product"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={< Home/>} />
        <Route path='/produtos' element={< Product/>} />
        <Route path='/pedidos' element={<Order/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
