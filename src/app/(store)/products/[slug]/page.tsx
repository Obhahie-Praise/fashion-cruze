interface ProductDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { slug } = await params;

  return (
    <div className="py-8">
      <h1 className="text-3xl font-semibold tracking-tight">Product: {slug}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Product details view placeholder for slug: {slug}</p>
    </div>
  );
}
