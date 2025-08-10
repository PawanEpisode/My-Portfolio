import { useTheme } from "../lib/theme";

const GithubIcon = () => {
  const { theme } = useTheme();
  return theme === "dark" ? (
    <i className="devicon-github-original text-[40px]"></i>
  ) : (
    <i className="devicon-github-original colored text-[40px]"></i>
  );
};

export default GithubIcon;
