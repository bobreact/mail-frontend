import { Routes, Route } from 'react-router-dom';
import ArrivTable from './components/ArriveTable'
import Index from './components/Index';
import Footer from './components/Footer';
import Navbar from './pages/Navbar';
import Login from './pages/Login';
import { Register } from './pages/Register';
import Depart from './pages/Depart';
import DepartTable from './components/DepartTable';
import Arrive from './pages/Arrive';


function App() {

        return (  
        <div className='bg-slate-600 min-h-screen'> 
            <Navbar />
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/login' element={<Login />} />
                <Route path='/*' element={<Index />} />
                <Route path='/list' element={<ArrivTable />} />
                <Route path='/new' element={<Arrive />} />
                <Route path='/register' element={<Register />} />
                <Route path='/depart' element={<Depart />} />
                <Route path='/departTable' element={<DepartTable />} />
            </Routes>
            <Footer />
            
        </div>
    );
}

export default App;
