import packageConfig from "@/package.json";

export default function WebFooter() {
  return (
    <footer className="px-10 py-5 flex flex-col justify-center items-center gap-2">
      <span className="footer-text">Provided by Codeliners</span>
      <span className="footer-text">v{packageConfig.version}</span>
    </footer>
  );
}
