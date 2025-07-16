// src/components/SiteFooter.jsx
const SiteFooter = () => {
  return (
    <footer className="text-center text-sm py-4 border-t text-muted-foreground bg-background">
      Made with 🍿 by Cinephiles – © {new Date().getFullYear()}
    </footer>
  );
};

export default SiteFooter;
