import { redirect } from "next/navigation";

export default async function EditProductRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;
  redirect("/products");
}
