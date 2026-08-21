import axios from "axios";
export const fetchBlogPosts = async () => {
  const response = await axios.get("/jsons/blog-posts.json");
  return response.data.data;
};
