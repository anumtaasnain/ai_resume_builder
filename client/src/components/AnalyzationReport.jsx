const AnalyzationReport = ({ resumeGenerated }) => {
  if (!resumeGenerated) return;
  return (
    <div className="bg-blue-200 p-5 rounded-md mt-2">
      <pre className="whitespace-pre-wrap">{resumeGenerated}</pre>
    </div>
  );
};

export default AnalyzationReport;
