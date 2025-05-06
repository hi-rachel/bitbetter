const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
  subtext?: string;
  bgColor?: string;
  textColor?: string;
}> = ({
  icon,
  title,
  value,
  subtext,
  bgColor = "bg-slate-50",
  textColor = "text-slate-600",
}) => (
  <div className={`${bgColor} p-4 rounded-lg flex-1`}>
    <div className="flex items-center mb-1">
      {icon}
      <h3 className="text-slate-600 text-sm font-medium ml-1">{title}</h3>
    </div>
    <div className={`text-2xl font-bold ${textColor}`}>
      {value}
      {subtext && (
        <span className="text-xs text-slate-500 font-normal ml-1">
          {subtext}
        </span>
      )}
    </div>
  </div>
);

export default StatCard;
