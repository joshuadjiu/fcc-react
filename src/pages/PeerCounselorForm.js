import React from "react";

export default function PeerCounselorForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 text-white">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-lg max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold mb-6">Peer Counselor Form</h2>

        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email BINUS"
              className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none"
            />
          </div>
          <div>
            <textarea
              placeholder="Alasan ingin menjadi Peer Counselor"
              className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none h-24"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-white text-purple-700 font-bold rounded-lg hover:bg-purple-100 transition"
          >
            Kirim Form
          </button>
        </form>
      </div>
    </div>
  );
}
