'use client';

import { useState, useEffect } from 'react';

// These fields match the GitHub API response structure
interface Repository {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    updated_at: string;
}

// Color mappings for programming languages (matches GitHub's language colors)
const languageColors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    Java: '#b07219',
    Shell: '#89e051',
    HTML: '#e34c26',
    CSS: '#563d7c',
};

// Converts an ISO date string to a human-readable relative time (e.g., "3 days ago")
function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    // Calculate the difference in days between now and the given date
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    // Return appropriate string based on time elapsed
    if (diffInDays === 0) return 'today';
    if (diffInDays === 1) return 'yesterday';
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
}

export default function RepositoryList() {
    // Component state management
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);          
    const [loading, setLoading] = useState<boolean>(true);              
    const [error, setError] = useState<string | null>(null);            
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);      

    // Fetches repositories from GitHub API for the given page number
    const fetchRepos = async (page: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.github.com/orgs/github/repos?sort=name&per_page=10&page=${page}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch Github repositories');
            }

            const data: Repository[] = await response.json();
            setRepositories(data);
            
            // If we get fewer than 10 results, we've reached the last page
            setHasNextPage(data.length === 10);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    // Re-fetch repositories whenever the page number changes
    useEffect(() => {
        fetchRepos(currentPage);
    }, [currentPage]);

    // Pagination handlers
    const handleNextPage = () => {
        if (hasNextPage) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        // Ensure we never go below page 1
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <section className="flex flex-col gap-6 w-full max-w-3xl" aria-labelledby="repo-heading">
            <h1 id="repo-heading" className="text-2xl font-semibold">
                Github Repositories
            </h1>

            {/* For screen reader announcements */}
            <div role="status" aria-live="polite" className="sr-only">
                {loading && 'Loading repositories...'}
                {error && `Error: ${error}`}
                {!loading && !error && `Page ${currentPage}, showing ${repositories.length} Github repositories`}
            </div>

            {/* Loading */}
            {loading && <p>Loading...</p>}

            {/* Error */}
            {error && (
                <div role="alert" className="text-red-400">
                    <p>Error: {error}</p>
                    <button
                        onClick={() => fetchRepos(currentPage)}
                        className="underline hover:no-underline mt-2"
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Repository list */}
            {!loading && !error && (
                <ul
                    className="border border-gray-700 rounded-lg divide-y divide-gray-700"
                    aria-label="GitHub repositories"
                >
                    {repositories.map((repo) => (
                        <li
                            key={repo.id}
                            className="hover:bg-gray-800 transition-colors"
                        >
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-4"
                                aria-label={`${repo.name}: ${repo.description || 'No description'}`}
                            >
                                <h2 className="text-blue-400 font-semibold hover:underline">
                                    {repo.name}
                                </h2>

                                <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                                    {repo.description || 'No description'}
                                </p>

                                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-400">
                                    {repo.language && (
                                        <span className="flex items-center gap-1">
                                            <span
                                                className="w-3 h-3 rounded-full inline-block"
                                                style={{ backgroundColor: languageColors[repo.language] || '#6b7280' }} // Fallback to gray if language not in map
                                            />
                                            {repo.language}
                                        </span>
                                    )}
                                    <span>★ {repo.stargazers_count.toLocaleString()}</span>
                                    <span>🍴 {repo.forks_count.toLocaleString()}</span>
                                    <span>Updated {formatRelativeTime(repo.updated_at)}</span>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            )}

            {/* Pagination */}
            <nav className="flex items-center justify-between" aria-label="Pagination">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-800 focus-visible:ring-amber-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    Previous
                </button>

                <span className="text-sm text-gray-400">
                    Page {currentPage}
                </span>

                <button
                    onClick={handleNextPage}
                    disabled={!hasNextPage}
                    aria-label="Next page"
                    className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-800 focus-visible:ring-amber-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    Next
                </button>
            </nav>
        </section>
    );
}