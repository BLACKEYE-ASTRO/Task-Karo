import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskDashboard from './pages/TaskDashboard';
import TaskDetails from './pages/TaskDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tasks" element={<TaskDashboard />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
