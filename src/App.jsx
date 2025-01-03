import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskDashboard from './pages/TaskDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
