// "use client";
// import { useState } from "react";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Logged in with", email, password);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-black">Email</label>
//         <input
//           type="email"
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>

//       <div className="mb-6">
//         <label className="block text-sm font-medium text-black">Password</label>
//         <input
//           type="password"
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>

//       <button
//         type="submit"
//         className="w-auto px-5 block mx-auto bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
//       >
//         Log In
//       </button>
//     </form>
//   );
// }
