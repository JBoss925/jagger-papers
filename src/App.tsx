import { Navigate, Route, Routes, useParams } from "react-router-dom";
import PapersPage from "./features/papers/PapersPage";
import PaperPage from "./features/papers/PaperPage";

function LegacyPapersRedirect() {
  const { "*": rest = "" } = useParams();
  return <Navigate to={rest ? `/${rest}` : "/"} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/papers/*" element={<LegacyPapersRedirect />} />
      <Route path="/papers" element={<Navigate to="/" replace />} />
      <Route path="/jagger-papers" element={<Navigate to="/" replace />} />
      <Route path="/" element={<PapersPage />} />
      <Route path="/:slug" element={<PaperPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
