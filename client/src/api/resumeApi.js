import axios from "axios";

const base_url = "https://localhost:7217"; 

const resumeApi = async (resumeText, jobDescription) => {
  // YAHAN DEKHEIN: /llama add karna lazmi hai
  const fullUrl = `${base_url}/api/Optimize/llama`;
  
  console.log("React is sending request to:", fullUrl);

  try {
    const response = await axios.post(fullUrl, {
      resumeText: resumeText,
      jobDrscription: jobDescription 
    });
    return response.data;
  } catch (error) {
    console.error("API Error Detail:", error.response?.data || error.message);
    throw error;
  }
};

export default resumeApi;