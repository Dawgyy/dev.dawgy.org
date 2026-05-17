import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Layout';
import Home from './pages/Home';
import BlogPage from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Work from './pages/Work';
import ProjectPost from './pages/ProjectPost';
import WorkPost from './pages/WorkPost';
import About from './pages/About';
import CV from './pages/CV';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="cv" element={<CV />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<WorkPost />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          {/* Project detail pages stay; project index folds into /work */}
          <Route path="projects/:slug" element={<ProjectPost />} />
          <Route path="projects" element={<Navigate to="/work" replace />} />
          <Route
            path="projects/professional"
            element={<Navigate to="/work" replace />}
          />
          <Route
            path="projects/personal"
            element={<Navigate to="/work" replace />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
