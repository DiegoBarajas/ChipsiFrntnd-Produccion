import ItemText from "../components/ItemText";
import PrivacidadJson from "../texto-politicas/privacidad.json";

export default function Privacidad() {
    const text = PrivacidadJson;
    return (
        <>
            <ItemText tittle="Política de privacidad" text={text} />
        </>
    )
}   