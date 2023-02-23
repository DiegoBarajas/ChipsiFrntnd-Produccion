import ItemText from "../components/ItemText";
import TerminosJson from "../texto-politicas/terminos.json";

export default function Terminos() {
    const text = TerminosJson;
    return (
        <>
            <ItemText tittle="Términos y condiciones" text={text} />
        </>
    )
}