type Props = { title?: string };

export default function HeaderHero({ title = "Make the most of your Downtime" }: Props) {
  return (
    <header className="sticky top-0 z-30 bg-transparent">
      <div className="mx-auto max-w-5xl px-4 pt-5 pb-3">
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-amber-300">
          {title}
        </h1>
      </div>
    </header>
  );
}
