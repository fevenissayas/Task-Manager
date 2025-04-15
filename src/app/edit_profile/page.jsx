import EditProfileForm from "@/components/EditProfileForm";

export default function EditProfilePage() {
  return (
    <div className="flex min-h-screen bg-gray-200">
      <div className="w-full bg-white p-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center mt-8">
          Edit Profile
        </h2>
        <EditProfileForm />
      </div>
    </div>
  );
}