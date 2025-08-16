const SkillHeader = ({ title, length }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
        {title}
      </h3>
      <p className="text-base font-medium rounded-full w-6 h-6 flex items-center justify-center text-white dark:text-black bg-black dark:bg-white">
        {length}
      </p>
    </div>
  );
};

const SkillItems = ({ category, skills }) => {
  const skillColors = {
    languages:
      "bg-orange-50 text-orange-700 dark:bg-orange-50 dark:text-orange-600",
    frameworks: "bg-blue-50 text-blue-700 dark:bg-blue-50 dark:text-blue-600",
    tools: "bg-pink-50 text-pink-700 dark:bg-pink-50 dark:text-pink-600",
    practices:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-50 dark:text-emerald-600",
    softSkills:
      "bg-purple-50 text-purple-700 dark:bg-purple-50 dark:text-purple-600",
  };
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className={`text-md font-medium px-4 py-2 rounded-full hover:scale-105 transition-transform ${
            skillColors[category] ||
            "bg-slate-100 text-slate-700 dark:bg-slate-100 dark:text-slate-700"
          }`}
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

export default function Skills({ skillValues }) {
  const CATEGORY_LABELS = {
    practices: "Best Practices",
  };

  const formatCategoryTitle = (key) => {
    const withSpaces = key.replace(/([A-Z])/g, " $1");
    return withSpaces
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
      .trim();
  };

  const CATEGORY_ORDER = [
    "languages",
    "frameworks",
    "tools",
    "practices",
    "softSkills",
  ];

  const orderedEntries = Object.entries(skillValues).sort(([a], [b]) => {
    const indexA = CATEGORY_ORDER.indexOf(a);
    const indexB = CATEGORY_ORDER.indexOf(b);
    const safeA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA;
    const safeB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB;
    return safeA - safeB;
  });

  return (
    <div className="flex flex-col gap-6">
      {orderedEntries.map(([category, skills]) => (
        <div key={category} className="w-full px-4">
          <SkillHeader
            title={CATEGORY_LABELS[category] || formatCategoryTitle(category)}
            length={skills.length}
          />
          <SkillItems skills={skills} category={category} />
        </div>
      ))}
    </div>
  );
}
