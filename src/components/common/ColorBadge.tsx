interface ColorBadgeProps {
  number: 0 | 1 | 2 | 3 | 4 | null;
}

export default function ColorBadge({ number }: ColorBadgeProps) {
  const getColor = (num: number) => {
    switch (num) {
      case 0:
        return "#d3d3d3";
      case 1:
        return "#00FFA3";
      case 2:
        return "#FFF738";
      case 3:
        return "#FF6636";
      case 4:
        return "#494949";
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
