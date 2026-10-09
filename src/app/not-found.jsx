import Link from "lib/Link";
export default function NotFound() {
    return (<div className="min-h-screen flex items-center bg-white justify-center">
      <div className="text-center">
        <p className="font-body text-xs tracking-widest-2 text-stone mb-4">404</p>
        <h1 className="font-display text-5xl font-light italic mb-4">Page Not Found</h1>
        <p className="font-body text-sm text-stone mb-8">The page you are looking for doesn't exist.</p>
        <Link href="/" className="font-body text-xs tracking-editorial px-10 py-4 bg-pinked text-white">
          RETURN HOME
        </Link>
      </div>
    </div>);
}
