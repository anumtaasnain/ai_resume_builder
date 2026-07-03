import { useState } from "react";

const ResumeUploader = ({ onExtract }) => {
  const [resumeName, setResumeName] = useState(null);

  const onChangeHandler = async (e) => {
    const file = e.target.files[0];
    setResumeName(file.name);
    const text = await file.text();
    onExtract(text);
  };

  return (
    <div className="mt-5 py-2">
      <label
        htmlFor="resume"
        className="flex hover:bg-blue-300 hover:scale-105 rounded-md px-5 py-2 items-center gap-2 bg-blue-200"
      >
        <span className="text-lg font-semibold"> Upload Resume : </span>
        {resumeName ? (
          <span className="text-gray-700"> {resumeName} </span>
        ) : (
          <img
            className="w-10 h-10 p-2 rounded bg-white"
            src="/upload.jpg"
            alt="Upload Image"
          />
        )}
      </label>
      <input
        onChange={onChangeHandler}
        id="resume"
        hidden
        type="file"
        accept=".docx, .txt, .pdf"
      />
    </div>
  );
};

export default ResumeUploader;
