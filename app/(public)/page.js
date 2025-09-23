import Image from "next/image";

export default function Home() {
  const imageSrc = "/logo.jpg";
  return (
    <div>
      <br/>
      <center> <Image
        src={imageSrc}
        alt="Picture of the author"
        width={150}
        height={150}
        style={{ borderRadius: "50%" }}
      /></center>
      <center> <h1>Welcome to our Vogexi Shop</h1>
        <p>At VOGEXI, fashion is more than just clothing — it is a reflection of identity, a canvas for expression, and a statement of elegance. Our philosophy centers on empowering individuals to express their unique personalities through premium apparel that blends timeless aesthetics with contemporary edge. We believe that confidence begins with how you present yourself to the world, and VOGEXI is here to ensure that every detail of your outfit speaks volumes about your style, strength, and sophistication</p></center>
    </div>
  );
}
