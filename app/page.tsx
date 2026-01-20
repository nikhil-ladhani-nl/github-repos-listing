import RepositoryList from "./components/RepositoryList";

export default function Home() {
  return (
    <main className="min-h-screen p-4 sm:p-8 md:p-12 lg:p-16 flex justify-center">
      <RepositoryList />
    </main>
  );
}