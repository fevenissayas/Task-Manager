export default function Button({ children, href, onClick, className }) {
    return (
      <Link href={href}>
        <button
          onClick={onClick}
          className={`px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ${className}`}
        >
          {children}
        </button>
      </Link>
    );
  }