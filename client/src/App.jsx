import JobDescriptionInput from "./components/JobDescriptionInput";
import ResumeUploader from "./components/ResumeUploader";
import ComparAndAnalyze from "./components/ComparAndAnalyze";
import { useState } from "react";
import AnalyzationReport from "./components/AnalyzationReport";

const App = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeGenerated, setResumeGenerated] = useState(null);
  return (
    <div className="max-w-5xl  mx-auto py-5">
      <h2 className="text-center text-3xl font-semibold">AI Resume Builder</h2>
      <ResumeUploader onExtract={setResumeText} />
      <JobDescriptionInput onExtract={setJobDescription} />
      <ComparAndAnalyze
        resumeText={resumeText}
        jobDescription={jobDescription}
        onExtract={setResumeGenerated}
      />
      <AnalyzationReport resumeGenerated={resumeGenerated} />
    </div>
  );
};

export default App;
