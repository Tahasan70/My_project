// import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md"
      >
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mb-4">
          We can't seem to find the page you're looking for.
        </p>
        <motion.img
          src="https://i.imgur.com/qIufhof.png"
          alt="Sticker Illustration"
          className="w-40 h-40 mx-auto mb-4"
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{ yoyo: Infinity, duration: 1.5 }}
        />
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
        >
          Go Home
        </button>
      </motion.div>
    </div>
  );
}
