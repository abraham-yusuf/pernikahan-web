import Link from "next/link";

export default function InvitationNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md text-center">
        <div className="mb-6 text-6xl">💌</div>
        <h1 className="text-2xl font-bold text-gray-900">
          Undangan Tidak Ditemukan
        </h1>
        <p className="mt-3 text-gray-500">
          Undangan yang Anda cari tidak tersedia atau belum dipublikasikan.
          Pastikan link yang Anda gunakan sudah benar.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
