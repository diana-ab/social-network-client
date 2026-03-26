function FormMessage({ message }) {
    if (!message) {
        return null;
    }
    return <p className="form-message">{message}</p>;

}
export default FormMessage;