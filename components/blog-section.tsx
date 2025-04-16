import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Right Football Boots",
    excerpt:
      "A comprehensive guide to selecting football boots based on your playing style, position, and field conditions.",
    date: "April 2, 2025",
    image: "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg",
    category: "Football",
    externalLink: "https://www.lovellsoccer.co.uk/blog/post/how-to-choose-the-right-football-boot-for-you",
  },
  {
    id: 2,
    title: "5 Essential Basketball Drills for Beginners",
    excerpt: "Master the fundamentals with these simple yet effective basketball drills designed for new players.",
    date: "March 28, 2025",
    image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg",
    category: "Basketball",
    externalLink: "https://scholarbasketball.com/5-fundamental-drills-for-begginers/",
  },
  {
    id: 3,
    title: "The Evolution of Tennis Racket Technology",
    excerpt: "Explore how tennis racket design has changed over the decades and how it affects modern gameplay.",
    date: "March 15, 2025",
    image: "https://images.pexels.com/photos/1432039/pexels-photo-1432039.jpeg",
    category: "Tennis",
    externalLink:
      "https://www.racquetpoint.com/blogs/racquet-point-news/the-evolution-of-tennis-racquets-from-wood-to-modern-technology?srsltid=AfmBOopscxrSFeB64STsqfAeg0rJ_lKnfidhwRPzXKuq7EcGJovkqKev",
  },
];

export function BlogSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#f58549] to-[#eda24e] text-transparent bg-clip-text">
              Latest Articles
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#f58549] to-[#eda24e] mt-4 mb-3 rounded-full"></div>
            <p className="text-muted-foreground text-lg">Tips, guides, and news from the world of sports</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 ${
                index % 2 === 0 ? "hover:border-[#f58549]" : "hover:border-[#eda24e]"
              }`}
            >
              <Link href={post.externalLink}>
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-xs font-medium px-3 py-1 ${
                      index % 2 === 0 ? "bg-[#f58549]/20 text-[#f58549]" : "bg-[#eda24e]/20 text-[#eda24e]"
                    } rounded-full`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <Link href={post.externalLink}>
                  <h3
                    className={`font-bold text-xl mb-3 hover:text-[${
                      index % 2 === 0 ? "#f58549" : "#eda24e"
                    }] transition-colors line-clamp-2`}
                  >
                    {post.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <Link
                  href={post.externalLink}
                  className={`inline-flex items-center text-sm font-medium text-[${
                    index % 2 === 0 ? "#f58549" : "#eda24e"
                  }] hover:text-[${index % 2 === 0 ? "#e07539" : "#d99239"}]`}
                >
                  Visit Article
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
