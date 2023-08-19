import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeroSection from "../hero";
import Feed from "./feed";

function Feeds() {
  const feedList = [
    { name: "All articles", link: "all" },
    { name: "Career", link: "career" },
    { name: "Start ups", link: "start-up" },
    { name: "soft skills", link: "soft-skills" },
  ];

  const [newBlogs, setNewBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [trendingBlogs, setTrendingBlogs] = useState([]);

  async function getAllBlogs() {
    setLoading(true);
    try {
      console.log("Getting blog");
      // const response = await axios.get(
      //   `https://api.buttercms.com/v2/posts?auth_token=${read_token}`
      // );
      // const blogs = response.data.data;
      // setAllBlogs(blogs);
      // setLoading(false);
    } catch (err) {
      console.log(err);
      alert(err.message + ", Please reload the page");
    }

    setLoading(false);
  }

  let params = useParams();

  useEffect(() => {
    getAllBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoading) {
      const preloader = new Array(6).fill({
        seo_title: "Loading contents",
        author: { first_name: "Konectin" },
        tags: [{ slug: "1 min read" }],
        title: "Loading contents",
        updated: new Date().getDate(),
        blurred: true,
      });

      setAllBlogs(preloader);
    }
  }, [isLoading]);

  useEffect(() => {
    if (params.feed === "all") {
      setNewBlogs(allBlogs);
    } else {
      const currentFeed = allBlogs.filter(
        (blog) =>
          blog.categories &&
          blog.categories.some((cat) => cat.name === params.feed)
      );

      setNewBlogs(currentFeed);
    }

    const shuffled = allBlogs
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    setTrendingBlogs(shuffled.slice(0, 3));
  }, [params, allBlogs]);

  return (
    <div
      className={`w-11/12 mx-auto flex flex-col gap-10 ${
        isLoading && "text-neutral-500"
      }`}
    >
      <HeroSection isLoading={isLoading} />
      <div className="flex flex-col gap-8">
        <div className="flex gap-6 text-sm sm:text-md sm:gap-8 items-center">
          {feedList.map((feedItem, index) => (
            <Link
              key={index}
              to={isLoading ? "/blog/all" : `/blog/${feedItem.link}`}
              className={`
                ${
                  isLoading
                    ? "text-neutral-500"
                    : params.feed === feedItem.link
                    ? "border-b-2 border-secondary-600"
                    : "text-neutral-200"
                } capitalize`}
            >
              {feedItem.name}
            </Link>
          ))}
        </div>
        <Feed
          newBlogs={newBlogs}
          trendingBlogs={trendingBlogs}
          gridNumber={9}
        />
      </div>
    </div>
  );
}

export default Feeds;
