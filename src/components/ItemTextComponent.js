export default function ItemTextComponent(props) {
    const textToRender = props.text;
  
    return (
      <section className="item__text__section">
        <h3>{textToRender.tittle}</h3>
        {textToRender.text.map((e) => (
          <p>{e}</p>
        ))}
      </section>
    );
}