'use client'
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

const BLOG_META = {
    subtitle_en: "Blog",
    subtitle_fa: "مطالب آموزشی آنی رز",
    description: "جدیدترین مطالب و مقالات آموزشی در زمینه سلامتی، تغذیه و محصولات طبیعی.",
};

const BlogPage = ({ initialPosts = [] }) => {
    const [posts] = useState(initialPosts);
    const [visiblePosts, setVisiblePosts] = useState(6);
    const [activeCategory, setActiveCategory] = useState("all");

    const categories = useMemo(
        () => [...new Map(posts.map(p => [p.category?.name, p.category])).values()],
        [posts]
    );

    const filteredPosts = activeCategory === "all"
        ? posts
        : posts.filter(p => p.category?.name === activeCategory);

    const displayedPosts = filteredPosts.slice(0, visiblePosts);
    const hasMore = visiblePosts < filteredPosts.length;

    return (
        <>
            {/* Page Header */}
            <section className="relative bg-[#0C5505] py-16 md:py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                     style={{
                         backgroundImage: "url('/images/test/Frame-41-2.png')",
                         backgroundSize: "cover",
                         backgroundPosition: "center",
                     }}
                />
                <div className="absolute top-0 left-0 w-[120px] h-full opacity-20"
                     style={{
                         backgroundImage: "url('/images/test/Frame-74.png')",
                         backgroundRepeat: "no-repeat",
                         backgroundPosition: "center left",
                         backgroundSize: "contain",
                     }}
                />
                <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="mb-4">
                        <Image
                            src="/images/test/Group-3-min.png"
                            alt="آیکون"
                            width={72}
                            height={72}
                            sizes="72px"
                            className="w-[60px] md:w-[72px] h-auto mx-auto"
                            loading="lazy"
                        />
                    </div>
                    <h2 className="text-sm md:text-base text-gray-300 font-normal mb-2">
                        {BLOG_META.subtitle_en}
                    </h2>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                        {BLOG_META.subtitle_fa}
                    </h1>
                    <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        {BLOG_META.description}
                    </p>
                </div>
            </section>

            <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 my-4">
                <div className="w-full">
                    <Image src="/images/test/line.png" alt="" width={1200} height={24} sizes="100vw" className="w-full h-auto" loading="lazy" />
                </div>
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
                <section className="pb-4 pt-6">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap justify-center gap-2">
                            <button
                                onClick={() => { setActiveCategory("all"); setVisiblePosts(6); }}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                                    activeCategory === "all"
                                        ? "bg-[#0C5505] text-white shadow-lg"
                                        : "bg-white text-[#64748b] hover:bg-[#f0fdf4] hover:text-[#0C5505]"
                                }`}>
                                همه مطالب
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.name}
                                    onClick={() => { setActiveCategory(cat.name); setVisiblePosts(6); }}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                                        activeCategory === cat.name
                                            ? "bg-[#0C5505] text-white shadow-lg"
                                            : "bg-white text-[#64748b] hover:bg-[#f0fdf4] hover:text-[#0C5505]"
                                    }`}>
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Blog Posts Grid */}
            <section className="py-8">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedPosts.map((post) => (
                            <div key={post.id}
                                 className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                                <Link href={`/blog/${post.id}/${post.slug}`} className="block overflow-hidden relative w-full h-48 md:h-56">
                                    <Image
                                        src={post.image || "/images/test/placeholder.jpg"}
                                        alt={post.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </Link>
                                <div className="p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        {post.category && (
                                            <span className="text-xs font-medium text-[#64a39a] bg-[#f0fdf4] px-3 py-1 rounded-full">
                                                {post.category.name}
                                            </span>
                                        )}
                                        {post.published_at && (
                                            <span className="text-xs text-[#94a3b8]">{post.published_at}</span>
                                        )}
                                    </div>
                                    <Link href={`/blog/${post.id}/${post.slug}`}>
                                        <h3 className="text-base md:text-lg font-bold text-[#1e293b] mb-2 line-clamp-2 hover:text-[#0C5505] transition-colors">
                                            {post.title}
                                        </h3>
                                    </Link>
                                    {post.excerpt && (
                                        <p className="text-xs md:text-sm text-[#64748b] leading-relaxed line-clamp-3 mb-4">
                                            {post.excerpt}
                                        </p>
                                    )}
                                    <Link
                                        href={`/blog/${post.id}/${post.slug}`}
                                        className="inline-flex items-center gap-1 text-sm font-bold text-[#0C5505] hover:text-[#64a39a] transition-colors">
                                        ادامه مطلب
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"/>
                                            <polyline points="12 5 19 12 12 19"/>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {displayedPosts.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#f0fdf4] flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0C5505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                    <line x1="16" y1="13" x2="8" y2="13"/>
                                    <line x1="16" y1="17" x2="8" y2="17"/>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-[#1e293b] mb-2">مطلبی یافت نشد</h3>
                            <p className="text-sm text-[#64748b]">در این دسته‌بندی مطلبی وجود ندارد.</p>
                        </div>
                    )}

                    {/* Load More */}
                    {hasMore && (
                        <div className="text-center mt-10">
                            <button
                                onClick={() => setVisiblePosts(prev => prev + 6)}
                                className="inline-flex items-center gap-2 bg-white border-2 border-[#0C5505] text-[#0C5505] px-8 py-3 rounded-xl font-bold hover:bg-[#0C5505] hover:text-white transition-all shadow-md">
                                مشاهده مطالب بیشتر
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default BlogPage;