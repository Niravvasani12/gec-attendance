import "./AuthorBadge.css";

const AuthorBadge = () => {
  return (
    <div className="author-badge">
      <img
        src="https://thumbs.dreamstime.com/b/cute-cartoon-boy-character-face-smiling-expression-dark-hair-cute-cartoon-boy-character-face-featuring-happy-371435146.jpg"
        alt="Profile"
        className="author-photo"
      />
      <div className="author-info">
        <p className="author-name"> Nirav Vasani</p>
        <a
          href="https://github.com/Nirav231"
          target="_blank"
          rel="noopener noreferrer"
          className="author-link"
        >
          🔗 GitHub Profile
        </a>
      </div>
    </div>
  );
};
<AuthorBadge />;

export default AuthorBadge;
