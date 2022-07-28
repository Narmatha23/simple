import Task from './pages/Task';
import './App.css';

function App() {
  return(
    <div className='container'>
       <div className='nav-bar'>
         <nav className='task'>
            <div className='logo'>
              Tasks | Oyelabs
            </div>
              <div className='pages'>
                <ul>
                  <li>Info</li>
                  <li className='active'>Task</li>
                </ul>
              </div>
         </nav>
         <Task/>
       </div>
    </div>
  )
}

export default App;
