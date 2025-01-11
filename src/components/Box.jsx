export default function Box({ children, className, onClick, style }) {
  return (
    <div className={`relative ${className}`} onClick={onClick} style={style}>
      {children}
    </div>
  );
}
