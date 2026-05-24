export default function Logo({ size = 38 }) {
  return (
    <img src="/favicon.svg" width={size} height={size} alt="OrientAT logo" style={{ objectFit: "contain" }} />
  );
}
