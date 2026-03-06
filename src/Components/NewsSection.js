import React from "react";

function NewsSection() {
  const sidebarPosts = [
    {
      img: "./assets/images/pills.png",
      alt: "Heart disease study",
      category: "Health",
      date: "08 June 2024",
      title: "Gut microbe metabolite found to modulate heart disease risk through...",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris neque eros, scelerisque sed mauris in, venenatis vehicula felis. In aliquet fermentum",
    },
    {
      img: "./assets/images/women.png",
      alt: "IVF success diet",
      category: "Health",
      date: "08 June 2024",
      title: "Improved IVF success with the Mediterranean diet, study shows",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris neque eros, scelerisque sed mauris in, venenatis vehicula felis. In aliquet fermentum",
    },
    {
      img: "./assets/images/pills 2.png",
      alt: "Covid vaccine",
      category: "Health",
      date: "08 June 2024",
      title:
        "The new covid vaccine is out. Why you might not want to rush to get it.",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris neque eros, scelerisque sed mauris in, venenatis vehicula felis. In aliquet fermentum",
    },
  ];

  return (
    <section className="news-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            Our Latest <br />
            <span className="text-red big-span">News & Blogs</span>
          </h2>
          <a href="#" className="see-all">
            <p>See All </p>
            <svg
              width="15"
              height="13"
              viewBox="0 0 15 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.8223 7.10248C14.1659 6.75882 14.1659 6.20163 13.8223 5.85797L8.22197 0.257686C7.87831 -0.0859759 7.32112 -0.085976 6.97746 0.257686C6.6338 0.601347 6.6338 1.15853 6.97746 1.50219L11.9555 6.48023L6.97746 11.4583C6.6338 11.8019 6.6338 12.3591 6.97746 12.7028C7.32112 13.0464 7.87831 13.0464 8.22197 12.7028L13.8223 7.10248ZM0 6.48022L-7.6932e-08 7.36022L13.2 7.36023L13.2 6.48023L13.2 5.60023L7.6932e-08 5.60022L0 6.48022Z"
                fill="#D2222D"
              />
            </svg>
          </a>
        </div>

        {/* News Grid */}
        <div className="news-grid">
          {/* Featured Post */}
          <article className="featured-post">
            <div className="post-img-wrapper">
              <img
                src="./assets/images/women black.png"
                alt="Health Star Rating Study"
              />
            </div>
            <div className="post-meta">
              <span className="category-tag">Health</span>
              <span className="post-date">08 June 2024</span>
            </div>
            <h3 className="post-title-large">
              Reassessing the Health Star Rating: New study highlights need for
              ultra-processed food adjustments
            </h3>
            <p className="post-excerpt">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              neque eros, scelerisque sed mauris in, venenatis vehicula felis. In
              aliquet fermentum
            </p>
            <a href="#" className="read-more-btn">
              Read More
            </a>
          </article>

          {/* Sidebar Small Posts */}
          <div className="news-sidebar">
            {sidebarPosts.map((post, index) => (
              <article className="small-post" key={index}>
                <img src={post.img} alt={post.alt} className="small-post-img" />
                <div className="small-post-content">
                  <div className="post-meta">
                    <span className="category-tag">{post.category}</span>
                    <span className="post-date">{post.date}</span>
                  </div>
                  <h4 className="post-title-small">{post.title}</h4>
                  <p className="small-excerpt">{post.excerpt}</p>
                  <a href="#" className="read-more-link read-more-btn">
                    Read More
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsSection;
