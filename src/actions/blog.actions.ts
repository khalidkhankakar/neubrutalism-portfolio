'use server'

import connectDB from "../db/mongoose";
import { Blog } from "../db/schemas";

export const getBlog = async (slug: string) => {
   try {
      await connectDB();
      const blog = await Blog.findOne({ slug }).populate('tags', 'name')
      return JSON.parse(JSON.stringify(blog));
   } catch (error) {
      console.log(error)
      return { success: false, message: "failed to get blog" }
   }
}



export const getAllBlogs = async () => {
   try {
      await connectDB();
      const blogs = await Blog.find().populate('tags', 'name').select('-content')
      return { success: true, data: JSON.parse(JSON.stringify(blogs)), message: "Blogs fetched successfully" };
   } catch (error) {
      console.log(error)
      return { success: false, data: [], message: "Unable to get blogs" }

   }
}