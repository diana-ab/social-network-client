import "./StatusBanner.css";

function StatusBanner({ text, variant = "info" }) {
    if (!text) {
        return null;
    }

    return (
        <div className={`status-banner status-banner--${variant}`}>
            {text}
        </div>
    );
}

export default StatusBanner;