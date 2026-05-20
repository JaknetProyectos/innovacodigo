interface PageHeroProps {
  title: string;
  backgroundImage?: string;
}

export default function PageHero({ title, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center pt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: backgroundImage
            ? `url('${backgroundImage}')`
            : `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
          {title}
        </h1>
      </div>
    </section>
  );
}
