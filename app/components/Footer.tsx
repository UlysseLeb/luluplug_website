export default function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-brown-mid">
        <span className="font-bold text-brown">luluplug</span>
        <p>Honest audio plugins, crafted with care.</p>
        <p>© {new Date().getFullYear()} luluplug. All rights reserved.</p>
      </div>
    </footer>
  );
}
