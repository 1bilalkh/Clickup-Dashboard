function BoxComponent({ showBox }) {
  if (!showBox) return null;

  return (
    <div style={{ width: 200, height: 100, background: "lightblue" }}>
      I am Box
    </div>
  );
}

export default BoxComponent;
