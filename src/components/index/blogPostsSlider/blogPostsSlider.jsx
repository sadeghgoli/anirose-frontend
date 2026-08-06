'use client'
import React, {useState, useEffect} from "react";
import Link from "next/link";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Autoplay} from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import {fetchArticles} from "../../../api/services/articles.js";
import BlogPostsSliderSkeleton from "../../skeleton/BlogPostsSlider/BlogPostsSliderSkeleton.jsx";

const BlogPostsSlider = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const result = await fetchArticles({ per_page: 20 });
                const posts = (result?.articles || []).map((a) => ({
                    id: a.id,
                    title: a.title,
                    slug: a.slug,
                    image: a.image || a.featured_image || "/images/test/placeholder.jpg",
                }));
                setData({
                    titleIcon: "/images/test/Group-3-min.png",
                    titleEn: "AniRoz Blog",
                    titleFa: "مجله سلامت آنی روز",
                    posts,
                });
            } catch {
                setData({ posts: [], titleIcon: "", titleEn: "", titleFa: "" });
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <BlogPostsSliderSkeleton/>;
    if (!data) return null;

    const {titleIcon, titleEn, titleFa, posts = []} = data;

    return (
        <section className="relative py-10 overflow-x-clip max-w-[1460px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-10">
            {/* ???????? ???? */}
            <div
                className="absolute top-0 right-0 w-[90px] h-full z-0 pointer-events-none"
                style={{
                    backgroundImage: "url('/images/test/Frame-41-2.png')",
                    backgroundPosition: "center right",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                }}
            />
            {/* ???????? ?? */}
            <div
                className="absolute top-0 left-0 w-[90px] h-full z-0 pointer-events-none"
                style={{
                    backgroundImage: "url('/images/test/Frame-74.png')",
                    backgroundPosition: "center left",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                }}
            />
            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-10">
                <div className="text-center mb-4">
                    <Image src={titleIcon} alt="" width={64} height={0} sizes="100vw" className="w-12 md:w-16 mx-auto" loading="lazy" />
                </div>
                <h3 className="text-base md:text-sm font-normal text-gray-500 text-center mb-1">
                    {titleEn}
                </h3>
                <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold text-[#0C5505] text-center mb-8">
                    {titleFa}
                </h2>
                <div className="relative blog-slider-wrapper">
                    <div className="overflow-hidden">
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            loop={true}
                            breakpoints={{
                                640: {slidesPerView: 2, spaceBetween: 20},
                                768: {slidesPerView: 3, spaceBetween: 20},
                                1024: {slidesPerView: 4, spaceBetween: 20},
                            }}
                            navigation={{
                                nextEl: ".blog-swiper-next",
                                prevEl: ".blog-swiper-prev",
                            }}
                            autoplay={{delay: 5000, disableOnInteraction: false}}
                            className="blog-posts-slider"
                        >
                            {posts.map((post) => (
                                <SwiperSlide className="mb-20 max-h-[230px]" key={post.id}>
                                    <div className="relative rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                        {/* ????? */}
                                        <div className="overflow-hidden rounded-lg">
                                            <Link href={`/blog/${post.id}/${post.slug}`}>
                                                <Image
                                                    src={post.image}
                                                    alt={post.title}
                                                    width={0}
                                                    height={0}
                                                    sizes="100vw"
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                                 loading="lazy" />
                                            </Link>
                                        </div>
                                        {/* ????? */}
                                        <div className="absolute -bottom-20 left-4 right-4 bg-white rounded-lg shadow-lg p-4 text-center z-10">
                                            <h4 className="text-gray-500 text-base md:text-lg font-semibold mb-2 line-clamp-2">
                                                <Link href={`/blog/${post.id}/${post.slug}`} className="">
                                                    {post.title}
                                                </Link>
                                            </h4>
                                            <div className="w-full h-[0.5px] bg-[#0C5505] mx-auto mb-3"/>
                                            <Link
                                                href={`/blog/${post.id}/${post.slug}`}
                                                className="inline-block bg-[#0C5505] text-white text-xs md:text-sm font-medium px-4 w-full py-1.5 rounded-lg transition hover:bg-[#0C5505]/80"
                                            >
                                                مشاهده
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    {/* ???????? ?????? */}
                    <button
                        className="blog-swiper-prev piner absolute p-4 md:p-2 -left-4 top-1/2 -translate-y-1/2 z-20 w-5 h-5 md:w-7 md:h-7 rounded-full bg-white text-[#0C5505] shadow-md hover:text-white hover:bg-[#0C5505] text-[30px] font-bold flex items-center justify-center transition-all">
                        ›
                    </button>
                    <button
                        className="blog-swiper-next piner absolute p-4 md:p-2 -right-4 top-1/2 -translate-y-1/2 z-20 w-5 h-5 md:w-7 md:h-7 rounded-full bg-white text-[#0C5505] shadow-md hover:text-white hover:bg-[#0C5505] text-[30px] font-bold flex items-center justify-center transition-all">
                        ‹
                    </button>
                </div>
            </div>
            <style>{`
                .blog-posts-slider .swiper {
                    overflow: visible !important;
                    padding: 10px 0;
                }
                .blog-posts-slider .swiper-wrapper {
                    overflow: visible !important;
                }
                .blog-posts-slider .swiper-slide {
                    overflow: visible !important;
                    height: auto !important;
                    padding-bottom: 30px;
                }
            `}</style>
        </section>
    );
};

export default BlogPostsSlider;