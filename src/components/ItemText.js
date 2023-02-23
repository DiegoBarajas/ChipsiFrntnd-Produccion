import "../Styles/item__text.scss";
import ItemTextComponent from "./ItemTextComponent";

export default function ItemText(props) {
  const textContent = props.text;

  return (
    <>
      <div className="item__text">
        <h2>{props.tittle}</h2>
        {textContent.map((e) => (
          <ItemTextComponent text={e} />
        ))}
      </div>
    </>
  );
}