import { Repository } from "../../types/types";

const RepositoryCard = ({ repository }: { repository: Repository }) => {
  const { html_url, name, stargazers_count, description } = repository;
  return (
    <a
      href={html_url}
      target="_blank"
      rel="noreferrer"
      className="group block border p-4 hover:bg-black/5 hover:border-black/20"
    >
      <div className="sm:flex justify-between items-center mb-2">
        <h2 className="text-xl sm:text-2xl group-hover:underline mb-2 sm:mb-0 break-all">
          {name}
        </h2>

        <div>
          <span role="img" aria-label="star">
            ⭐️
          </span>{" "}
          {stargazers_count}
        </div>
      </div>
      <p className="text-black/50">{description}</p>
    </a>
  );
};

export default RepositoryCard;
