import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [classified, setClassified] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const allCategories = [
    "news",
    "entertainment",
    "parenting",
    "technology",
    "sports",
    "politics",
    "education",
    "science",
    "wellness",
    "business",
    "style & beauty",
    "food",
    "women & minorities",
    "travel",
  ];

  useEffect(() => {
    const fetchSubreddits = async () => {
      try {
        const endpoints = [
          "https://www.reddit.com/r/news/new.json?limit=10",
          "https://www.reddit.com/r/sports/new.json?limit=10",
          "https://www.reddit.com/r/fauxmoi/new.json?limit=10",
          "https://www.reddit.com/r/music/new.json?limit=10",
        ];

        // Fetch all in parallel
        const responses = await Promise.all(endpoints.map((url) => fetch(url)));
        const jsons = await Promise.all(responses.map((res) => res.json()));

        // Extract and merge posts
        let rawPosts = [];
        jsons.forEach((json) => {
          const posts = json.data.children.map((p) => ({
            title: p.data.title,
            subreddit: p.data.subreddit_name_prefixed,
            permalink: `https://reddit.com${p.data.permalink}`,
          }));
          rawPosts = rawPosts.concat(posts);
        });

        // Shuffle posts
        rawPosts.sort(() => Math.random() - 0.5);

        setPosts(rawPosts);

        // Classify
        const titles = rawPosts.map((p) => p.title);
        const response = await axios.post("http://localhost:5000/predict", {
          titles,
        });

        const withCategory = rawPosts.map((post, i) => ({
          ...post,
          category: response.data.categories[i],
        }));

        setClassified(withCategory);
        setFilteredPosts(withCategory);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubreddits();
  }, []);

  const handleApplyFilter = () => {
    if (selectedCategories.length === 0) {
      setFilteredPosts(classified); // show all
    } else {
      const filtered = classified.filter((post) =>
        selectedCategories.includes(post.category.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Filtereddit 🔥</h1>

      {/* Filter UI */}
      <div className="mb-6">
        <div className="flex flex-wrap justify-center gap-4 mb-2">
          {allCategories.map((cat) => (
            <label key={cat} className="flex items-left gap-1">
              <input
                type="checkbox"
                value={cat}
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCheckboxChange(cat)}
              />
              <span className="capitalize text-sm">{cat}</span>
            </label>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={handleApplyFilter}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Apply Filter
          </button>
        </div>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.map((post, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded p-4 border border-gray-200"
          >
            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-600">{post.subreddit}</p>
            <a
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline text-sm block mt-1"
            >
              View Post
            </a>
            <p className="mt-2 text-sm">
              <span className="font-medium">Category:</span> {post.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
