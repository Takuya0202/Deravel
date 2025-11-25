import CreateForm from "@/app/components/feature/post-create/create-form";

export default function CreatePostPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-base w-full h-full flex flex-col space-y-8">
        <div className="w-full h-full">
          <CreateForm />
        </div>
      </div>
    </div>
  );
}
