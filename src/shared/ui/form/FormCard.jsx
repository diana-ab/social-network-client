import "./FormCard.css";

function FormCard({ title, children }) {
    return (
        <div className="form-card">
            {title && <h1 className="form-title">{title}</h1>}
            {children}
        </div>
    );
}
//הקומפוננטה הזאת היא המסגרת של כל קומפוננטה או קומפוננטות שהיא עוטפת
export default FormCard;