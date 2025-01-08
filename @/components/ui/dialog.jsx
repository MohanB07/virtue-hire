
// Dialog Component
const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        {/* Close Button */}
        <button style={styles.closeButton} onClick={() => onOpenChange(false)}>
          X
        </button>

        {/* Dialog Content */}
        {children}
      </div>
    </div>
  );
};

// Styles for Dialog
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(5px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  dialog: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "500px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    position: "relative",
    textAlign: "left", // Ensures the entire dialog is left-aligned
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#e5e5e5",
    border: "1px solid black",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "4px",
    fontWeight: "bold",
    fontSize: "1rem",
  },
};

export default Dialog;
