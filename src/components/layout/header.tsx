export default function Header() {
  return (
    <header className="h-16 flex items-center justify-center bg-white shadow">
      <img
        src="/logo.png" // or use `import logo from "@/assets/logo.png"` and `src={logo}`
        alt="ProMedix EMS Logo"
        className="h-10"
      />
    </header>
  );
}
