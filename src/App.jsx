import { Routes, Route } from 'react-router-dom';
import MatTable from './components/MatTable'
import Index from './components/Index';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Login from './components/Login';
import NewMail from './components/NewMail';
import { Register } from './components/Register';
import Depart from './components/Depart';
import DepartTable from './components/DepartTable';

function App() {

        return (  
        <div className='bg-slate-600 min-h-screen'> 
            <Navbar />
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/login' element={<Login />} />
                <Route path='/*' element={<Index />} />
                <Route path='/list' element={<MatTable />} />
                <Route path='/new' element={<NewMail />} />
                <Route path='/register' element={<Register />} />
                <Route path='/depart' element={<Depart />} />
                <Route path='/departTable' element={<DepartTable />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
