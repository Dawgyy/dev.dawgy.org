import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import Home from './pages/Home';
import BlogPage from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Projects from './pages/Projects';
import ProjectPost from './pages/ProjectPost';
import WorkPost from './pages/WorkPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="projects" element={<Projects />} />
          <Route
            path="projects/professional"
            element={<Projects category="Professional" />}
          />
          <Route
            path="projects/personal"
            element={<Projects category="Personal" />}
          />
          <Route path="projects/:slug" element={<ProjectPost />} />
          <Route path="work/:slug" element={<WorkPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
