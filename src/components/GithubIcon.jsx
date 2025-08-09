import { useTheme } from "../lib/theme";

const GithubIcon = () => {
  const { theme } = useTheme();
  return theme === "dark" ? (
    <i className="devicon-github-original text-[24px]"></i>
  ) : (
    <i className="devicon-github-original colored text-[24px]"></i>
  );
};

export default GithubIcon;
