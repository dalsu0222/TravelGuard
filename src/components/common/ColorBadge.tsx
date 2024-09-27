interface ColorBadgeProps {
  number: 0 | 1 | 2 | 3 | 4 | null;
}

export default function ColorBadge({ number }: ColorBadgeProps) {
  const getColor = (num: number) => {
    switch (num) {
      case 0:
        return "#d3d3d3";
      case 1:
        return "#8AB5FF";
      case 2:
        return "#80FFCF";
      case 3:
        return "#FFF9A5";
      case 4:
        return "#FF9D82";
      default:
        return "";
    }
  };
  return (
    <div
      className="colorbadge"
      style={{
        display: "inline-flex",
        marginRight: "8px",
        backgroundColor: number !== null ? getColor(number) : "",
        width: "10px",
        height: "10px",
        borderRadius: "3px",
      }}
    ></div>
  );
}
