'use client'
import dynamic from "next/dynamic";
import CategoriesSkeleton from "../../components/skeleton/Categories/CategoriesSkeleton.jsx";
import CategoryProductSliderSkeleton from "../../components/skeleton/CategoryProductSlider/CategoryProductSliderSkeleton.jsx";
import TestimonialsSkeleton from "../../components/skeleton/Testimonials/TestimonialsSkeleton.jsx";
import BlogPostsSliderSkeleton from "../../components/skeleton/BlogPostsSlider/BlogPostsSliderSkeleton.jsx";

export const LazyCategories = dynamic(
  () => import("../../components/index/categories"),
  { ssr: false, loading: () => <CategoriesSkeleton /> }
);

export const LazyCategoryProductSlider = dynamic(
  () => import("../../components/index/categoryProductSlider"),
  { ssr: false, loading: () => <CategoryProductSliderSkeleton /> }
);

export const LazyTestimonials = dynamic(
  () => import("../../components/index/testimonials"),
  { ssr: false, loading: () => <TestimonialsSkeleton /> }
);

export const LazyBlogPostsSlider = dynamic(
  () => import("../../components/index/blogPostsSlider"),
  { ssr: false, loading: () => <BlogPostsSliderSkeleton /> }
);
