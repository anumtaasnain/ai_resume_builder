import { useState } from "react";

const JobDescriptionInput = ({ onExtract }) => {
  const [jobDescription, setJobDescription] = useState("");

  const onChangeHandler = (e) => {
    setJobDescription(e.target.value);
    onExtract(jobDescription);
  };
  return (
    <div className="bg-orange-200 rounded-md px-5 py-5 flex flex-col gap-2">
      <label className="text-lg font-semibold" htmlFor="job">
        Job Description:
      </label>
      <textarea
        onChange={onChangeHandler}
        value={jobDescription}
        placeholder="Enter Job Description Here..."
        className="rounded-sm border-none py-2 px-5 outline-blue-400 placeholder:text-gray-500"
        id="job"
      ></textarea>
    </div>
  );
};

export default JobDescriptionInput;
