import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [posts, setPosts] = useState([]);
	const [classified, setClassified] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);

	const allCategories = [
		"business",
		"education",
		"entertainment",
		"food",
		"news",
		"parenting",
		"politics",
		"science",
		"sports",
		"style & beauty",
		"technology",
		"travel",
		"wellness",
		"women & minorities",
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
				const responses = await Promise.all(
					endpoints.map((url) => fetch(url))
				);
				const jsons = await Promise.all(
					responses.map((res) => res.json())
				);

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
				const response = await axios.post(
					"http://localhost:5000/predict",
					{
						titles,
					}
				);

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

	// Remove handleApplyFilter and update toggleCategory to filter immediately
	const toggleCategory = (category) => {
		setSelectedCategories((prev) => {
			const newSelected = prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category];
			// Apply filter immediately
			if (newSelected.length === 0) {
				setFilteredPosts(classified);
			} else {
				const filtered = classified.filter((post) =>
					newSelected.includes(post.category.toLowerCase())
				);
				setFilteredPosts(filtered);
			}
			return newSelected;
		});
	};

	return (
		<div className="p-6">
			<h1 className="text-5xl font-bold text-gray-800 mb-4 text-left font-dmserif sm:text-7xl">
				Filte/r/eddit
			</h1>
			<hr className="border-black-200 mb-2" />
			<div className="flex justify-between items-center mb-2 text-sm text-gray-600 font-arvo">
				<span>
					{new Date().toLocaleDateString(undefined, {
						weekday: "long",
						month: "long",
						day: "numeric",
					})}
				</span>
				<span className="text-right font-sans">
					svhl |{" "}
					<a
						href="https://github.com/svhl"
						className="text-decoration-line: underline"
					>
						GitHub
					</a>
				</span>
			</div>
			<hr className="border-black-200 mb-2" />

			{/* Filter UI */}
			<div className="mb-6">
				<div className="flex flex-wrap justify-start gap-2 mb-10 mt-5">
					{allCategories.map((cat) => (
						<span
							key={cat}
							onClick={() => toggleCategory(cat)}
							className={`capitalize text-sm px-3 py-1 cursor-pointer transition select-none ${
								selectedCategories.includes(cat)
									? cat === "business" ||
									  cat === "technology" ||
									  cat === "science" ||
									  cat === "education"
										? "bg-news text-news-text"
										: cat === "politics" ||
										  cat === "news" ||
										  cat === "women & minorities"
										? "bg-opinion text-opinion-text"
										: cat === "sports" ||
										  cat === "entertainment"
										? "bg-sport text-sport-text"
										: cat === "food" ||
										  cat === "parenting" ||
										  cat === "style & beauty" ||
										  cat === "travel" ||
										  cat === "wellness"
										? "bg-lifestyle text-lifestyle-text"
										: "bg-gray-400 text-white"
									: "bg-gray-100 text-gray-800 hover:bg-gray-200"
							}`}
						>
							{cat}
						</span>
					))}
				</div>
				{/* Removed Apply Filter button */}
			</div>

			{/* Posts grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
				{filteredPosts.map((post, idx) => (
					<div
						key={idx}
						className="bg-white mb-4 break-inside-avoid flex flex-col h-full relative"
					>
						<h2 className="text-lg font-semibold mb-2">
							<a
								href={post.permalink}
								target="_blank"
								rel="noreferrer"
								className="text-gray-800 hover:underline font-arvo"
							>
								{post.title}
							</a>
						</h2>
						<p className="text-sm text-gray-600">
							{post.subreddit}
						</p>
						<span
							className={`mt-4 text-xs px-2 py-1 self-start capitalize
                ${
					post.category.toLowerCase() === "business" ||
					post.category.toLowerCase() === "technology" ||
					post.category.toLowerCase() === "science" ||
					post.category.toLowerCase() === "education"
						? "bg-news text-news-text opacity-80"
						: post.category.toLowerCase() === "politics" ||
						  post.category.toLowerCase() === "news" ||
						  post.category.toLowerCase() === "women & minorities"
						? "bg-opinion text-opinion-text opacity-80"
						: post.category.toLowerCase() === "sports" ||
						  post.category.toLowerCase() === "entertainment"
						? "bg-sport text-sport-text opacity-80"
						: post.category.toLowerCase() === "food" ||
						  post.category.toLowerCase() === "parenting" ||
						  post.category.toLowerCase() === "style & beauty" ||
						  post.category.toLowerCase() === "travel" ||
						  post.category.toLowerCase() === "wellness"
						? "bg-lifestyle text-lifestyle-text opacity-80"
						: "bg-gray-400 text-white"
				}`}
						>
							{post.category.charAt(0).toUpperCase() +
								post.category.slice(1)}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
