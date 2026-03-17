function FormMessage({ message }) {
    if (!message) {
        return null;
    }// אולי

    return <p>{message}</p>;
}

export default FormMessage;