import "./FormCard.css";

function FormCard({ title, children }) {
    return (
        <div className="form-card">
            {title && <h1 className="form-title">{title}</h1>}
            {children}
        </div>
    );
}
export default FormCard;