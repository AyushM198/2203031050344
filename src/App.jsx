import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, Typography } from '@mui/material';
import Shortener from './components/Shortener';
import RedirectPage from './components/Redirect';

function App() {
  return (
    <Router>
      <Container className="pt-8 max-w-screen max-h-full ">
        <Routes>
          <Route path="/" element={
            <>
              <Shortener />
            </>
          } />
          <Route path="/:shortcode" element={<RedirectPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
