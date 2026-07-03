import resumeApi from "../api/resumeApi";

const ComparAndAnalyze = ({ resumeText, jobDescription, onExtract }) => {
  const CompareAnalyze = async () => {
    const res = await resumeApi(resumeText, jobDescription);
    console.log(res.optimizedResume);
    onExtract(res.optimizedResume);
  };

  return (
    <div className="rounded-md mt-2 flex gap-3">
      <button
        onClick={CompareAnalyze}
        className="rounded-lg bg-blue-500 text-white py-3 px-5 uppercase font-semibold"
      >
        Compare and Analyze
      </button>
      <button className="rounded-lg bg-blue-500 text-white py-3 px-5 uppercase font-semibold">
        Regenerate AI Resume
      </button>
    </div>
  );
};

export default ComparAndAnalyze;
