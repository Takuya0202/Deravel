interface props {
  children: React.ReactNode;
}
export default function ValidationError({ children }: props) {
  return <p className="text-red">{children}</p>;
}
